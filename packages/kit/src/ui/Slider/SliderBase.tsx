import { JSX, mergeProps, Show, splitProps, ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  Slider as PrimitiveSlider,
  SliderProps as PrimitiveSliderProps,
  SliderRail,
  SliderRailProps as PrimitiveSliderRailProps,
  SliderThumb,
  SliderThumbProps as PrimitiveSliderThumbProps,
  SliderLabel as PrimitiveSliderLabel,
  SliderLabelRenderProps,
  SliderLabelSource,
  clx,
  sx,
  SliderDomain,
  SliderRange,
  SliderRailRange,
  useSlider,
} from '@suis-ui/primitives';

import { Box, BoxProps } from '../Box';

import {
  activeRailStyle,
  labelContainerStyle,
  labelPercent,
  labelStyle,
  markContainerStyle,
  markPercent,
  markStyle,
  railStyle,
  rangeOffset,
  rangeSize,
  rootInsetStyle,
  rootStyle,
  thumbStyle,
} from './Slider.css';

const SliderBaseOnlyPropList = [
  'variant',
  'values',
  'onChangeValues',
  'range',
  'startAt',
  'inverted',
  'labelAt',
  'labelStep',
  'marksAt',
  'marksStep',
  'thumbProps',
  'railProps',
  'activeRailProps',
  'labelProps',
  'markProps',
  'renderThumb',
  'renderRail',
  'renderActiveRail',
  'renderLabel',
  'renderMark',
] as const;

type SliderLabelOptions = { labelAt?: readonly number[]; labelStep?: never } | { labelAt?: never; labelStep?: number };
type SliderMarksOptions = { marksAt?: readonly number[]; marksStep?: never } | { marksAt?: never; marksStep?: number };

type SliderSharedProps = {
  variant?: 'default' | 'filled';

  thumbProps?: Partial<SliderThumbProps<ValidComponent>>;
  railProps?: Partial<SliderRailProps<ValidComponent>>;
  activeRailProps?: Partial<SliderActiveRailProps<ValidComponent>>;
  labelProps?: Partial<SliderLabelProps<ValidComponent>>;
  markProps?: Partial<SliderMarkProps<ValidComponent>>;

  renderThumb?: <T extends ValidComponent>(props: SliderThumbProps<T>) => JSX.Element;
  renderRail?: <T extends ValidComponent>(props: SliderRailProps<T>) => JSX.Element;
  renderActiveRail?: <T extends ValidComponent>(props: SliderActiveRailProps<T>) => JSX.Element;
  renderLabel?: <T extends ValidComponent>(props: SliderLabelProps<T>) => JSX.Element;
  renderMark?: <T extends ValidComponent>(props: SliderLabelProps<T>) => JSX.Element;
} & SliderLabelOptions & SliderMarksOptions;

export type SliderAdapterProps<T extends ValidComponent = 'div'> =
  Omit<PrimitiveSliderProps<T>, keyof SliderSharedProps | 'children' | 'values' | 'onChangeValues'>
  & SliderSharedProps;

type SliderBaseProps<T extends ValidComponent = 'div'> = SliderAdapterProps<T> & {
  values: number[];
  onChangeValues?: (values: number[]) => void;
  range?: boolean;
  startAt?: number;
  inverted?: boolean;
};

export const SliderBase = <T extends ValidComponent = 'div'>(props: SliderBaseProps<T>) => {
  const [local, rest] = splitProps(
    mergeProps(
      {
        variant: 'default',
        min: 0,
        max: 100,
        to: 'right',
      },
      props,
    ),
    SliderBaseOnlyPropList,
  );

  const orientation = () => rest.to === 'top' || rest.to === 'bottom' ? 'vertical' : 'horizontal';
  const hasExplicitThumbName = () => local.thumbProps?.['aria-label'] !== undefined
    || local.thumbProps?.['aria-labelledby'] !== undefined;
  const labelSource = (): SliderLabelSource | undefined => (
    local.labelStep !== undefined ? { step: local.labelStep } :
      local.labelAt !== undefined ? { labelAt: local.labelAt } : undefined
  );
  const markSource = (): SliderLabelSource | undefined => (
    local.marksStep !== undefined ? { step: local.marksStep } :
      local.marksAt !== undefined ? { labelAt: local.marksAt } : undefined
  );
  const getRanges = (values: number[], domain: SliderDomain): SliderRange[] => {
    if (!local.range) return [[local.startAt ?? domain.min, values[0]]];

    const start = Math.min(values[0], values[1]);
    const end = Math.max(values[0], values[1]);
    return local.inverted ? [[domain.min, start], [end, domain.max]] : [[start, end]];
  };
  const isMarkActive = (value: number, values: number[], domain: SliderDomain) =>
    getRanges(values, domain).some(([start, end]) => Number.isFinite(start) && Number.isFinite(end)
      && Math.min(start, end) <= value && value <= Math.max(start, end));

  const SliderThumb = () => (local.variant === 'filled' ? FilledSliderThumb : DefaultSliderThumb);
  const SliderRail = () => (local.variant === 'filled' ? FilledSliderRail : DefaultSliderRail);
  const SliderActiveRail = () => (local.variant === 'filled' ? FilledActiveRail : DefaultActiveRail);
  const SliderMarks = () => (local.variant === 'filled' ? FilledSliderMarks : DefaultSliderMarks);
  const SliderMark = (mark: SliderLabelRenderProps) => {
    const [state] = useSlider();

    return (
      <Dynamic<SliderMarkComponent>
        {...local.markProps}
        component={local.renderMark ?? SliderMarks()}
        index={mark.index}
        value={mark.value}
        percent={mark.percent}
        active={isMarkActive(mark.value, state.values, { min: state.min, max: state.max })}
      />
    );
  };

  return (
    <Box
      {...rest as unknown as Omit<PrimitiveSliderProps<'div'>, 'children' | 'values' | 'onChangeValues'>}
      as={PrimitiveSlider}
      values={local.values}
      onChangeValues={local.onChangeValues}
      data-disabled={rest.disabled ? '' : undefined}
      data-orientation={orientation()}
      data-is-min={!local.range && local.values[0] === rest.min ? '' : undefined}
      data-is-max={!local.range && local.values[0] === rest.max ? '' : undefined}
      data-range-bar={local.range ? '' : undefined}
      data-to={rest.to}
      class={clx(rootStyle, rootInsetStyle[local.variant], rest.class, rest.classList)}
    >
      <Dynamic<SliderRailComponent>
        {...local.railProps}
        component={local.renderRail ?? SliderRail()}
        actives={getRanges}
        renderActive={(range) => (
          <Dynamic<SliderActiveRailComponent>
            {...local.activeRailProps}
            component={local.renderActiveRail ?? SliderActiveRail()}
            range={range()}
          />
        )}
      >
        {(value) => (
          <Dynamic<SliderThumbComponent>
            {...local.thumbProps}
            component={local.renderThumb ?? SliderThumb()}
            aria-label={hasExplicitThumbName() ? local.thumbProps?.['aria-label'] : rest['aria-label']}
            aria-labelledby={hasExplicitThumbName() ? local.thumbProps?.['aria-labelledby'] : rest['aria-labelledby']}
            data-is-min={value() === rest.min ? '' : undefined}
            data-is-max={value() === rest.max ? '' : undefined}
          />
        )}
      </Dynamic>

      <Show when={labelSource()}>
        {(source) => (
          <PrimitiveSliderLabel
            {...source()}
            data-orientation={orientation()}
            data-to={rest.to}
            class={labelContainerStyle}
          >
            {(label) => (
              <Dynamic<SliderLabelComponent>
                {...local.labelProps}
                component={local.renderLabel ?? DefaultSliderLabel}
                index={label.index}
                value={label.value}
                percent={label.percent}
              >
                {label.value}
              </Dynamic>
            )}
          </PrimitiveSliderLabel>
        )}
      </Show>

      <Show when={markSource()}>
        {(source) => (
          <PrimitiveSliderLabel
            {...source()}
            data-orientation={orientation()}
            data-to={rest.to}
            class={markContainerStyle[local.variant]}
          >
            {(label) => <SliderMark {...label} />}
          </PrimitiveSliderLabel>
        )}
      </Show>
    </Box>
  );
};

type SliderThumbComponent = (props: SliderThumbProps<'div'>) => JSX.Element;
export type SliderThumbProps<T extends ValidComponent = 'div'> = PrimitiveSliderThumbProps<T>;
export const DefaultSliderThumb = <T extends ValidComponent = 'div'>(props: SliderThumbProps<T>) => (
  <SliderThumb
    {...props}
    class={clx(thumbStyle.default, props?.class, props?.classList)}
  />
);
export const FilledSliderThumb = <T extends ValidComponent = 'div'>(props: SliderThumbProps<T>) => (
  <SliderThumb
    {...props}
    class={clx(thumbStyle.filled, props?.class, props?.classList)}
  />
);

type SliderRailComponent = (props: SliderRailProps<'div'>) => JSX.Element;
export type SliderRailProps<T extends ValidComponent = 'div'> = PrimitiveSliderRailProps<T>;
export const DefaultSliderRail = <T extends ValidComponent = 'div'>(props: SliderRailProps<T>) => (
  <SliderRail
    {...props}
    class={clx(railStyle.default, props?.class, props?.classList)}
  />
);
export const FilledSliderRail = <T extends ValidComponent = 'div'>(props: SliderRailProps<T>) => (
  <SliderRail
    {...props}
    class={clx(railStyle.filled, props?.class, props?.classList)}
  />
);

type SliderActiveRailComponent = (props: SliderActiveRailProps<'div'>) => JSX.Element;
type SliderActiveRailOnlyProps = { range: SliderRailRange };
export type SliderActiveRailProps<T extends ValidComponent = 'div'> = Omit<BoxProps<T>, keyof SliderActiveRailOnlyProps> & SliderActiveRailOnlyProps;
export const DefaultActiveRail = <T extends ValidComponent = 'div'>(props: SliderActiveRailProps<T>) => (
  <Box
    {...props as BoxProps<T>}
    data-range-start={props.range.start}
    data-range-end={props.range.end}
    class={clx(activeRailStyle.default, props?.class, props?.classList)}
    style={sx(props?.style, assignInlineVars({
      [rangeOffset]: `${props.range.offsetPercent}%`,
      [rangeSize]: `${props.range.sizePercent}%`,
    }))}
  />
);
export const FilledActiveRail = <T extends ValidComponent = 'div'>(props: SliderActiveRailProps<T>) => (
  <Box
    {...props as BoxProps<T>}
    data-range-start={props.range.start}
    data-range-end={props.range.end}
    class={clx(activeRailStyle.filled, props?.class, props?.classList)}
    style={sx(props?.style, assignInlineVars({
      [rangeOffset]: `${props.range.offsetPercent}%`,
      [rangeSize]: `${props.range.sizePercent}%`,
    }))}
  />
);

type SliderLabelComponent = (props: SliderLabelProps<'div'>) => JSX.Element;
type SliderLabelOnlyProps = { value: number; index: number; percent: number };
export type SliderLabelProps<T extends ValidComponent = 'div'> = Omit<BoxProps<T>, keyof SliderLabelOnlyProps> & SliderLabelOnlyProps;
export const DefaultSliderLabel = <T extends ValidComponent = 'div'>(props: SliderLabelProps<T>) => (
  <Box
    {...props as BoxProps<T>}
    data-mark-index={props.index}
    data-value={props.value}
    class={clx(labelStyle, props?.class, props?.classList)}
    style={sx(props?.style, assignInlineVars({ [labelPercent]: `${props.percent}%` }))}
  />
);

type SliderMarkComponent = (props: SliderMarkProps<'div'>) => JSX.Element;
type SliderMarkOnlyProps = { value: number; index: number; percent: number; active: boolean };
export type SliderMarkProps<T extends ValidComponent = 'div'> = Omit<BoxProps<T>, keyof SliderMarkOnlyProps> & SliderMarkOnlyProps;
export const DefaultSliderMarks = <T extends ValidComponent = 'div'>(props: SliderMarkProps<T>) => (
  <Box
    {...props as BoxProps<T>}
    data-label-index={props.index}
    data-value={props.value}
    data-active={props.active}
    class={clx(markStyle.default, props?.class, props?.classList)}
    style={sx(props?.style, assignInlineVars({ [markPercent]: `${props.percent}%` }))}
  />
);
export const FilledSliderMarks = <T extends ValidComponent = 'div'>(props: SliderMarkProps<T>) => (
  <Box
    {...props as BoxProps<T>}
    data-label-index={props.index}
    data-value={props.value}
    data-active={props.active}
    class={clx(markStyle.filled, props?.class, props?.classList)}
    style={sx(props?.style, assignInlineVars({ [markPercent]: `${props.percent}%` }))}
  />
);
