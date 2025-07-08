import { splitProps, type ValidComponent } from 'solid-js';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Polymorphic, PolymorphicProps } from '@suis/primitives';

import { sx } from '@/theme';

import {
  boxSizeStyle,
  boxStyle,
  type BoxStyleType,
  flex,
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  width
} from './Box.css';

export const BoxStylePropList = [
  // layout
  'pos',
  'direction',
  'justify',
  'align',
  'wrap',
  'gap',

  // spacing
  'p',
  'px',
  'py',
  'pt',
  'pb',
  'pl',
  'pr',

  'm',
  'mx',
  'my',
  'mt',
  'mb',
  'ml',
  'mr',

  'r',

  // colors
  'c',
  'bg',
  'bc',

  // text
  'size'
] as const;
export const BoxSizePropList = [
  'w',
  'h',
  'minW',
  'minH',
  'maxW',
  'maxH',
  'flex'
] as const;
export const BoxPropList = [...BoxStylePropList, ...BoxSizePropList] as const;

export type BoxSizeProps = {
  w?: string;
  h?: string;
  minW?: string;
  minH?: string;
  maxW?: string;
  maxH?: string;
  flex?: string | number | boolean;
};
export type BoxOverrideProps = {
  props?: Record<string, unknown>;
};
export type BoxOnlyProps = BoxStyleType & BoxSizeProps & BoxOverrideProps;
export type BoxProps<T extends ValidComponent> = BoxOnlyProps & PolymorphicProps<T>;
export const Box = <T extends ValidComponent = 'div'>(props: BoxProps<T>) => {
  const [boxStyleProps, boxSizeProps, passed, rest] = splitProps(props, BoxStylePropList, BoxSizePropList, ['props']);

  const boxClass = () => boxStyle({
    pos: boxStyleProps.pos,
    direction: boxStyleProps.direction,
    justify: boxStyleProps.justify,
    align: boxStyleProps.align,
    wrap: boxStyleProps.wrap,
    gap: boxStyleProps.gap,
    p: boxStyleProps.p,
    px: boxStyleProps.px,
    py: boxStyleProps.py,
    pt: boxStyleProps.pt,
    pb: boxStyleProps.pb,
    pl: boxStyleProps.pl,
    pr: boxStyleProps.pr,
    m: boxStyleProps.m,
    mx: boxStyleProps.mx,
    my: boxStyleProps.my,
    mt: boxStyleProps.mt,
    mb: boxStyleProps.mb,
    ml: boxStyleProps.ml,
    r: boxStyleProps.r,
    c: boxStyleProps.c,
    bg: boxStyleProps.bg,
    bc: boxStyleProps.bc,
  });

  return (
    <Polymorphic
      {...rest}
      as={rest.as ?? 'div'}
      classList={{
        [boxClass()]: true,
        [boxSizeStyle]: true,
        [rest.class]: true,
        ...rest.classList,
      }}
      style={sx(
        assignInlineVars({
          [width]: boxSizeProps.w,
          [height]: boxSizeProps.h,
          [minWidth]: boxSizeProps.minW,
          [minHeight]: boxSizeProps.minH,
          [maxWidth]: boxSizeProps.maxW,
          [maxHeight]: boxSizeProps.maxH,
          [flex]: typeof boxSizeProps.flex === 'boolean' ? '1' : boxSizeProps.flex,
        }),
        rest.style,
      )}
      {...passed.props}
    />
  );
};
