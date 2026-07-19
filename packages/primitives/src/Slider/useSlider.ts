import { useSliderContext } from './SliderContext';
import type {
  SliderOrientation,
  SliderThumbRegistration,
  SliderTo,
} from './SliderContext';

export type { SliderOrientation, SliderTo } from './SliderContext';
export type SliderRange = [start: number, end: number];

export type SliderState = {
  values: number[];
  min: number;
  max: number;
  step: number;
  to: SliderTo;
  orientation: SliderOrientation;
  disabled: boolean;
};

export type SliderActions = {
  valueToPercent: (value: number) => number;
  normalizeRanges: (ranges: SliderRange[]) => SliderRange[];
  requestValue: (index: number, value: number) => void;
};

const isValidDomain = (min: number, max: number, step: number) =>
  Number.isFinite(min) && Number.isFinite(max) && Number.isFinite(step)
  && min < max && step > 0;

const decimalPlaces = (value: number) => {
  const [, fraction = '', exponent = '0'] = value.toString().match(/^[+-]?\d*\.?([\d]*)(?:e(-?\d+))?$/i) ?? [];
  return Math.max(0, fraction.length - Number(exponent));
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const normalizeValue = (value: number, min: number, max: number, step: number) => {
  const bounded = clamp(value, min, max);
  if (bounded === min || bounded === max) return bounded;
  const stepped = min + Math.round((bounded - min) / step) * step;
  const precision = Math.max(decimalPlaces(min), decimalPlaces(max), decimalPlaces(step));
  const cleaned = precision <= 100 ? Number(stepped.toFixed(precision)) : stepped;
  return clamp(cleaned, min, max);
};

const getOrientation = (to: SliderTo): SliderOrientation =>
  to === 'left' || to === 'right' ? 'horizontal' : 'vertical';

const getPositionRatio = (value: number, min: number, max: number, to: SliderTo) => {
  const ratio = (clamp(value, min, max) - min) / (max - min);
  return to === 'left' || to === 'top' ? 1 - ratio : ratio;
};

const normalizeRangeList = (
  ranges: SliderRange[],
  min: number,
  max: number,
): SliderRange[] => ranges.flatMap(([rawStart, rawEnd]) => {
  if (!Number.isFinite(rawStart) || !Number.isFinite(rawEnd)) return [];
  const start = clamp(Math.min(rawStart, rawEnd), min, max);
  const end = clamp(Math.max(rawStart, rawEnd), min, max);
  return [[start, end] as SliderRange];
});

const getStepPosition = (value: number, min: number, step: number) => {
  const position = (value - min) / step;
  const gridPosition = Math.round(position);
  const tolerance = Number.EPSILON * Math.max(1, Math.abs(position));
  return Math.abs(position - gridPosition) <= tolerance ? gridPosition : position;
};

const getNearestThumbIndex = (
  value: number,
  values: number[],
  thumbs: SliderThumbRegistration[],
  focusHistory: symbol[],
  min: number,
  step: number,
) => {
  let nearest = -1;
  let distance = Infinity;
  const valuePosition = getStepPosition(value, min, step);

  for (let index = 0; index < thumbs.length; index += 1) {
    if (thumbs[index].disabled()) continue;
    const nextDistance = Math.abs(getStepPosition(values[index], min, step) - valuePosition);
    const focusRank = focusHistory.lastIndexOf(thumbs[index].id);
    const nearestFocusRank = nearest < 0 ? -1 : focusHistory.lastIndexOf(thumbs[nearest].id);
    const tied = nearest >= 0 && nextDistance === distance;
    if (nearest < 0 || (!tied && nextDistance < distance) || (tied && focusRank > nearestFocusRank)) {
      nearest = index;
      distance = nextDistance;
    }
  }

  return nearest;
};

const getKeyValue = (
  key: string,
  value: number,
  to: SliderTo,
  min: number,
  max: number,
  step: number,
) => {
  if (key === 'Home') return min;
  if (key === 'End') return max;
  if (key === 'PageUp') return value + step * 10;
  if (key === 'PageDown') return value - step * 10;
  if (key === 'ArrowRight' && getOrientation(to) === 'horizontal') {
    return value + (to === 'right' ? step : -step);
  }
  if (key === 'ArrowLeft' && getOrientation(to) === 'horizontal') {
    return value + (to === 'left' ? step : -step);
  }
  if (key === 'ArrowDown' && getOrientation(to) === 'vertical') {
    return value + (to === 'bottom' ? step : -step);
  }
  if (key === 'ArrowUp' && getOrientation(to) === 'vertical') {
    return value + (to === 'top' ? step : -step);
  }
  return null;
};

export const useSlider = (): [SliderState, SliderActions] => {
  const [context] = useSliderContext();

  const effectiveTo = (): SliderTo => context.to ?? 'right';
  const validDomain = () => isValidDomain(context.min, context.max, context.step);
  const validSlider = () => validDomain()
    && context.thumbs.length > 0
    && context.values.length === context.thumbs.length
    && context.values.every(Number.isFinite);
  const effectiveValues = () => validDomain() && context.values.every(Number.isFinite)
    ? context.values.map(value => normalizeValue(value, context.min, context.max, context.step))
    : context.values;
  const interactive = (index?: number) => validSlider()
    && !context.disabled
    && (index === undefined || (
      Number.isInteger(index)
      && index >= 0
      && index < context.thumbs.length
      && !context.thumbs[index].disabled()
    ));

  const state: SliderState = {
    get values() { return effectiveValues(); },
    get min() { return context.min; },
    get max() { return context.max; },
    get step() { return context.step; },
    get to() { return effectiveTo(); },
    get orientation() { return getOrientation(effectiveTo()); },
    get disabled() { return context.disabled; },
  };

  const requestValue = (index: number, value: number) => {
    if (!interactive(index) || !Number.isFinite(value)) return;
    const nextValue = normalizeValue(value, context.min, context.max, context.step);
    if (context.values[index] === nextValue) return;
    const nextValues = context.values.slice();
    nextValues[index] = nextValue;
    context.onChangeValues(nextValues);
  };

  const actions: SliderActions = {
    valueToPercent: value => validSlider() && Number.isFinite(value)
      ? getPositionRatio(value, context.min, context.max, effectiveTo()) * 100
      : 0,
    normalizeRanges: ranges => validSlider()
      ? normalizeRangeList(ranges, context.min, context.max)
      : [],
    requestValue,
  };

  return [state, actions] as const;
};

export const useSliderParts = () => {
  const [context, setContext] = useSliderContext();
  const [state, actions] = useSlider();

  const isInteractive = (index?: number) => context.thumbs.length > 0
    && context.values.length === context.thumbs.length
    && isValidDomain(context.min, context.max, context.step)
    && context.values.every(Number.isFinite)
    && !context.disabled
    && (index === undefined || !!context.thumbs[index] && !context.thumbs[index].disabled());

  return [state, {
    ...actions,
    isInteractive,
    registerRail: (element: HTMLElement) => {
      setContext('rail', element);
      return () => setContext('rail', current => current === element ? null : current);
    },
    registerThumb: (thumb: SliderThumbRegistration) => {
      setContext('thumbs', thumbs => thumbs.some(item => item.id === thumb.id) ? thumbs : [...thumbs, thumb]);
      return () => {
        setContext('thumbs', thumbs => thumbs.filter(item => item.id !== thumb.id));
        setContext('focusHistory', history => history.filter(id => id !== thumb.id));
      };
    },
    getThumbIndex: (id: symbol) => context.thumbs.findIndex(thumb => thumb.id === id),
    setFocusedThumb: (id: symbol) => setContext('focusHistory', history => [
      ...history.filter(item => item !== id),
      id,
    ]),
    focusThumb: (index: number) => {
      const thumb = context.thumbs[index];
      if (!thumb || thumb.disabled()) return;
      setContext('focusHistory', history => [...history.filter(id => id !== thumb.id), thumb.id]);
      thumb.element()?.focus();
    },
    pointerToValue: (clientX: number, clientY: number) => {
      if (!isInteractive() || !context.rail) return null;
      const rect = context.rail.getBoundingClientRect();
      const ratio = state.orientation === 'horizontal'
        ? (clientX - rect.left) / rect.width
        : (clientY - rect.top) / rect.height;
      if (!Number.isFinite(ratio)) return null;
      const valueRatio = state.to === 'left' || state.to === 'top' ? 1 - ratio : ratio;
      return normalizeValue(context.min + clamp(valueRatio, 0, 1) * (context.max - context.min), context.min, context.max, context.step);
    },
    requestNearestValue: (value: number) => {
      if (!isInteractive() || !Number.isFinite(value)) return -1;
      const nextValue = normalizeValue(value, context.min, context.max, context.step);
      const index = getNearestThumbIndex(
        nextValue,
        state.values,
        context.thumbs,
        context.focusHistory,
        context.min,
        context.step,
      );
      if (index >= 0) actions.requestValue(index, nextValue);
      return index;
    },
    requestKey: (index: number, key: string) => {
      if (!isInteractive(index)) return false;
      const value = getKeyValue(key, state.values[index], state.to, context.min, context.max, context.step);
      if (value === null) return false;
      actions.requestValue(index, value);
      return true;
    },
  }] as const;
};
