import {
  Accessor,
  createEffect,
  Index,
  JSX,
  mergeProps,
  splitProps,
  ValidComponent,
} from 'solid-js';
import { createStore } from 'solid-js/store';

import { SliderContext } from './SliderContext';
import type { SliderContextType, SliderTo } from './SliderContext';

import { Polymorphic, PolymorphicProps } from '../Polymorphic';

type SliderOnlyProps = {
  values: number[];
  onChangeValues?: (values: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  to?: SliderTo;
  disabled?: boolean;
  children: JSX.Element;
  renderValue: (value: Accessor<number>, index: number) => JSX.Element;
};

export type SliderProps<T extends ValidComponent = 'div'> =
  Omit<PolymorphicProps<T>, keyof SliderOnlyProps>
  & SliderOnlyProps;

export const Slider = <T extends ValidComponent = 'div'>(props: SliderProps<T>) => {
  const [local, rest] = splitProps(
    mergeProps({
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
    }, props),
    [
      'values',
      'onChangeValues',
      'min',
      'max',
      'step',
      'to',
      'disabled',
      'children',
      'renderValue',
    ],
  );
  const rootProps = rest as PolymorphicProps<T>;

  const [context, setContext] = createStore<SliderContextType>({
    values: [...local.values],
    min: local.min,
    max: local.max,
    step: local.step,
    to: local.to,
    disabled: local.disabled,
    rail: null,
    thumbs: [],
    focusHistory: [],
    onChangeValues: values => local.onChangeValues?.(values),
  });

  createEffect(() => setContext('values', [...local.values]));
  createEffect(() => setContext('min', local.min));
  createEffect(() => setContext('max', local.max));
  createEffect(() => setContext('step', local.step));
  createEffect(() => setContext('to', local.to));
  createEffect(() => setContext('disabled', local.disabled));

  return (
    <SliderContext.Provider value={[context, setContext]}>
      <Polymorphic
        {...rootProps}
        as={rootProps.as ?? 'div'}
        role={'group'}
      >
        {local.children}
        <Index each={context.values}>
          {(value, index) => local.renderValue(value, index)}
        </Index>
      </Polymorphic>
    </SliderContext.Provider>
  );
};
