import { For, JSX, splitProps, ValidComponent } from 'solid-js';

import { Polymorphic, PolymorphicProps } from '../Polymorphic';
import { useSlider } from './useSlider';

export type SliderLabelRenderProps = {
  value: number;
  index: number;
  percent: number;
};

export type SliderLabelSource =
  | { step: number; labelAt?: never }
  | { step?: never; labelAt: readonly number[] };

type SliderLabelOnlyProps = SliderLabelSource & {
  children: (label: SliderLabelRenderProps) => JSX.Element;
};

export type SliderLabelProps<T extends ValidComponent = 'div'> =
  Omit<PolymorphicProps<T>, 'children' | 'labelAt' | 'step'>
  & SliderLabelOnlyProps;

const isValidDomain = (min: number, max: number) =>
  Number.isFinite(min) && Number.isFinite(max) && min < max;

const decimalPlaces = (value: number) => {
  const [, fraction = '', exponent = '0'] = value.toString().match(/^[+-]?\d*\.?([\d]*)(?:e(-?\d+))?$/i) ?? [];
  return Math.max(0, fraction.length - Number(exponent));
};

const automaticValues = (min: number, max: number, step: number) => {
  if (!isValidDomain(min, max) || !Number.isFinite(step) || step <= 0) return [];

  const precision = Math.max(decimalPlaces(min), decimalPlaces(max), decimalPlaces(step));
  const clean = (value: number) => precision <= 100 ? Number(value.toFixed(precision)) : value;
  const values = [min];

  for (let index = 1; ; index += 1) {
    const value = clean(min + index * step);
    if (!Number.isFinite(value) || value >= max) break;
    if (value <= values[values.length - 1]) break;
    values.push(value);
  }

  values.push(max);
  return values;
};

export const SliderLabel = <T extends ValidComponent = 'div'>(props: SliderLabelProps<T>) => {
  const [local, rest] = splitProps(props, ['children', 'labelAt', 'step']);
  const [state] = useSlider();

  const labels = (): SliderLabelRenderProps[] => {
    if (!isValidDomain(state.min, state.max)) return [];

    const labelAt = local.labelAt as readonly number[] | undefined;
    const values = labelAt !== undefined
      ? labelAt.filter(value => Number.isFinite(value) && value >= state.min && value <= state.max)
      : automaticValues(state.min, state.max, local.step as number);

    return values.map((value, index) => {
      const ratio = (value - state.min) / (state.max - state.min);
      const percent = (state.to === 'left' || state.to === 'top' ? 1 - ratio : ratio) * 100;
      return { value, index, percent };
    });
  };

  return (
    <Polymorphic
      {...rest as PolymorphicProps<T>}
      as={rest.as ?? 'div'}
    >
      <For each={labels()}>{label => local.children(label)}</For>
    </Polymorphic>
  );
};
