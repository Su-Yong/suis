import { Accessor, Index, JSX, onCleanup, splitProps, ValidComponent } from 'solid-js';

import { forwardRef, Polymorphic, PolymorphicProps } from '../Polymorphic';
import { useSliderContext } from './SliderContext';
import { useSliderParts } from './useSlider';
import type { SliderRange } from './useSlider';

export type SliderDomain = {
  min: number;
  max: number;
};

export type SliderRailRange = {
  start: number;
  end: number;
  startPercent: number;
  endPercent: number;
  offsetPercent: number;
  sizePercent: number;
};

type SliderRailOnlyProps = {
  actives: (
    values: number[],
    domain: SliderDomain,
  ) => SliderRange[];
  renderActive?: (range: Accessor<SliderRailRange>) => JSX.Element;
  children: (value: Accessor<number>, index: number) => JSX.Element;
  onPointerDown?: JSX.EventHandlerUnion<HTMLElement, PointerEvent>;
};

export type SliderRailProps<T extends ValidComponent> =
  Omit<PolymorphicProps<T>, keyof SliderRailOnlyProps>
  & SliderRailOnlyProps;

const callHandler = <E extends Event>(
  handler: JSX.EventHandlerUnion<HTMLElement, E> | undefined,
  event: E,
) => {
  if (!handler) return;
  const solidEvent = event as E & { currentTarget: HTMLElement; target: Element };
  if (typeof handler === 'function') handler(solidEvent);
  else handler[0](handler[1], solidEvent);
};

export const SliderRail = <T extends ValidComponent = 'div'>(props: SliderRailProps<T>) => {
  const [local, rest] = splitProps(props, ['actives', 'renderActive', 'children', 'onPointerDown']);
  const [context] = useSliderContext();
  const [state, actions] = useSliderParts();

  const ranges: Accessor<SliderRailRange[]> = () =>
    actions.normalizeRanges(local.actives(state.values, {
      min: state.min,
      max: state.max,
    })).map(([start, end]) => {
      const startPercent = actions.valueToPercent(start);
      const endPercent = actions.valueToPercent(end);
      return {
        start,
        end,
        startPercent,
        endPercent,
        offsetPercent: Math.min(startPercent, endPercent),
        sizePercent: Math.abs(endPercent - startPercent),
      };
    });

  const onSetup = (element: HTMLElement) => {
    const unregister = actions.registerRail(element);
    const handlePointerDown = (event: PointerEvent) => {
      callHandler(local.onPointerDown, event);
      if (event.defaultPrevented || !event.isPrimary || event.button !== 0) return;

      const target = event.target;
      const thumb = target instanceof Element ? target.closest('[data-slider-thumb]') : null;
      if (thumb && element.contains(thumb)) return;

      const value = actions.pointerToValue(event.clientX, event.clientY);
      if (value === null) return;
      const index = actions.requestNearestValue(value);
      if (index >= 0) actions.focusThumb(index);
    };

    element.addEventListener('pointerdown', handlePointerDown);
    onCleanup(() => {
      element.removeEventListener('pointerdown', handlePointerDown);
      unregister();
    });
  };

  return (
    <Polymorphic
      {...rest as PolymorphicProps<T>}
      as={rest.as ?? 'div'}
      data-orientation={state.orientation}
      data-to={state.to}
      ref={forwardRef(onSetup, rest.ref)}
    >
      <Index each={ranges()}>{(range) => local.renderActive?.(range)}</Index>
      <Index each={context.values}>{(value, index) => local.children(value, index)}</Index>
    </Polymorphic>
  );
};
