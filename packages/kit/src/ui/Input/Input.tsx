import { clx } from '@suis-ui/primitives';

import { Box, BoxProps } from '../Box';

import { inputStyle } from './Input.css';

type InputOnlyProps = {};
export type InputProps = Omit<BoxProps<'input'>, keyof InputOnlyProps | 'as'> & InputOnlyProps;
export const Input = (props: InputProps) => (
  <Box
    {...props}
    as={'input'}
    class={clx(inputStyle, props.class, props.classList)}
  />
);
