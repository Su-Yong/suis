import { splitProps } from 'solid-js';
import { clx } from '@suis-ui/primitives';

import { Box, BoxProps } from '../Box';

import { inputStyle } from './Input.css';

type InputOnlyProps = {
  as?: 'input' | 'textarea';
};
export type InputProps = Omit<BoxProps<'input'>, keyof InputOnlyProps> & InputOnlyProps;
export const Input = (props: InputProps) => {
  const [local, rest] = splitProps(props, ['as']);

  return (
    <Box
      {...rest}
      as={local.as ?? 'input'}
      class={clx(
        local.as !== 'textarea'&& inputStyle.default,
        local.as === 'textarea' && inputStyle.textarea,
        rest.class,
        rest.classList,
      )}
    />
  );
};
