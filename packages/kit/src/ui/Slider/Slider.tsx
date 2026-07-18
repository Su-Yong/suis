import { splitProps, ValidComponent } from 'solid-js';

import { SliderAdapterProps, SliderBase } from './SliderBase';

type SliderOnlyProps = {
  value: number;
  onChangeValue?: (value: number) => void;
};

export type SliderProps<T extends ValidComponent = 'div'> =
  Omit<SliderAdapterProps<T>, keyof SliderOnlyProps>
  & SliderOnlyProps;

export const Slider = <T extends ValidComponent = 'div'>(props: SliderProps<T>) => {
  const [local, rest] = splitProps(props, ['value', 'onChangeValue']);

  return (
    <SliderBase
      {...rest}
      values={[local.value]}
      onChangeValues={(values: number[]) => local.onChangeValue?.(values[0])}
    />
  );
};

export {
  DefaultActiveRail,
  DefaultSliderLabel,
  DefaultSliderMarks,
  DefaultSliderRail,
  DefaultSliderThumb,
  FilledActiveRail,
  FilledSliderMarks,
  FilledSliderRail,
  FilledSliderThumb,
} from './SliderBase';
export type {
  SliderActiveRailProps,
  SliderLabelProps,
  SliderMarkProps,
  SliderRailProps,
  SliderThumbProps,
} from './SliderBase';
