import { splitProps, ValidComponent } from 'solid-js';

import { SliderAdapterProps, SliderBase } from './SliderBase';

export type RangeBarValue = readonly [number, number];

type RangeBarOnlyProps = {
  value: RangeBarValue;
  onChangeValue?: (value: RangeBarValue) => void;
  inverted?: boolean;
};

export type RangeBarProps<T extends ValidComponent = 'div'> = Omit<SliderAdapterProps<T>, keyof RangeBarOnlyProps>
  & RangeBarOnlyProps;

export const RangeBar = <T extends ValidComponent = 'div'>(props: RangeBarProps<T>) => {
  const [local, rest] = splitProps(props, ['value', 'onChangeValue', 'inverted']);

  return (
    <SliderBase
      {...rest}
      range
      inverted={local.inverted}
      values={[...local.value]}
      onChangeValues={(values: number[]) => local.onChangeValue?.([values[0], values[1]])}
    />
  );
};
