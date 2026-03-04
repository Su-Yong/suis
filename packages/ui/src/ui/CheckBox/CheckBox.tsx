import { JSX, mergeProps, splitProps, ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  CheckBox as BaseCheckBox,
  CheckBoxLabel as BaseCheckBoxLabel,
  CheckBoxIndicator as BaseCheckBoxIndicator,
  CheckBoxProps as BaseCheckBoxProps,
  CheckBoxLabelProps as BaseCheckBoxLabelProps,
  CheckBoxIndicatorProps as BaseCheckBoxIndicatorProps,
} from '@suis/primitives';

import { checkStyle, containerStyle, indicatorStyle, inputStyle } from './CheckBox.css';

type CheckBoxOnlyProps = {
  checked?: boolean;
  onChecked?: (checked: boolean) => void;

  inputProps?: BaseCheckBoxIndicatorProps;
  labelProps?: BaseCheckBoxLabelProps;

  renderIndicator?: (props: CheckBoxIndicatorProps) => JSX.Element;
}
export type CheckBoxProps<T extends ValidComponent = 'input'> =
  Omit<BaseCheckBoxProps<T>, keyof CheckBoxOnlyProps>
  & CheckBoxOnlyProps;
export const CheckBox = <T extends ValidComponent = 'input'>(props: CheckBoxProps<T>) => {
  const [local, elementProps, renderer, rest] = splitProps(
    mergeProps(
      {
        renderIndicator: DefaultCheckBoxIndicator,
      },
      props,
    ),
    ['checked', 'onChecked'],
    ['inputProps', 'labelProps'],
    ['renderIndicator'],
  );

  return (
    <BaseCheckBox {...rest as CheckBoxOnlyProps}>
      <BaseCheckBoxLabel
        {...elementProps.labelProps}
        classList={{
          [containerStyle]: true,
          [elementProps.labelProps?.class]: !!elementProps.labelProps?.class,
          ...elementProps.labelProps?.classList
        }}
      >
        <BaseCheckBoxIndicator
          {...elementProps.inputProps}
          checked={local.checked}
          onChange={(e) => {
            if (local.onChecked) local.onChecked(e.currentTarget.checked);
          }}
          classList={{
            [inputStyle]: true,
            [elementProps.inputProps?.class]: !!elementProps.inputProps?.class,
            ...elementProps.inputProps?.classList
          }}
        >
          <Dynamic<(props: CheckBoxIndicatorProps) => JSX.Element>
            checked={local.checked}
            component={renderer.renderIndicator}
          />
        </BaseCheckBoxIndicator>
        {props.name}
      </BaseCheckBoxLabel>
    </BaseCheckBox>
  );
};

export type CheckBoxIndicatorProps = {
  checked?: boolean;
};
const DefaultCheckBoxIndicator = (_: CheckBoxIndicatorProps) => (
  <div class={indicatorStyle}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={checkStyle}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </div>
);
