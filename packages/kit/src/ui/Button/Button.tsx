import { mergeProps, splitProps, type ValidComponent } from 'solid-js';

import { Box, type BoxProps } from '../Box';

import { defaultButtonStyle, hoverButtonStyle, activeButtonStyle, baseButtonStyle } from './Button.css';

type ButtonVariants = keyof typeof defaultButtonStyle;
type ButtonOnlyProps = {
  variant?: ButtonVariants;
  type?: 'button' | 'icon';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  active?: boolean;
};
export type ButtonProps<T extends ValidComponent = 'button'> = Omit<BoxProps<T>, keyof ButtonOnlyProps> & ButtonOnlyProps;
export const Button = <T extends ValidComponent = 'button'>(props: ButtonProps<T> & { as?: T }) => {
  const [local, rest] = splitProps(
    mergeProps({
      variant: 'default',
      type: 'button',
      size: 'md',
    }, props),
    ['variant', 'type', 'size', 'active'],
  );

  return (
    <Box
      {...rest as BoxProps<T>}
      as={rest.as ?? 'button'}
      classList={{
        [baseButtonStyle({
          size: local.size,
          type: local.type,
          disabled: rest.disabled,
        })]: true,
        [defaultButtonStyle[local.variant]]: true,
        [hoverButtonStyle[local.variant]]: !rest.disabled,
        [activeButtonStyle[local.variant]]: local.active,
        [rest.class]: !!rest.class,
        ...rest.classList,
      }}
    />
  );
};