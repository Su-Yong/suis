import { mergeProps, splitProps, type ValidComponent } from 'solid-js';

import { Box, type BoxProps } from '../Box';

import { defaultButtonStyle, hoverButtonStyle, activeButtonStyle, baseButtonStyle } from './Button.css';

type ButtonVariants = keyof typeof defaultButtonStyle;
type ButtonOnlyProps = {
  variant?: ButtonVariants;
  mode?: 'button' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
};
export type ButtonProps<T extends ValidComponent = 'button'> = Omit<BoxProps<T>, keyof ButtonOnlyProps> & ButtonOnlyProps;
export const Button = <T extends ValidComponent = 'button'>(props: ButtonProps<T> & { as?: T }) => {
  const [local, rest] = splitProps(
    mergeProps({
      variant: 'default',
      mode: 'button',
      size: 'md',
    }, props),
    ['variant', 'mode', 'size', 'active'],
  );

  return (
    <Box
      {...rest as BoxProps<T>}
      size={rest.size ?? '1.4rem'}
      as={rest.as ?? 'button'}
      direction={rest.direction ?? 'row'}
      classList={{
        [baseButtonStyle({
          size: local.size,
          mode: local.mode,
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