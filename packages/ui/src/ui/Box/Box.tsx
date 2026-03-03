import { splitProps, type ValidComponent } from 'solid-js';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Polymorphic, PolymorphicProps } from '@suis/primitives';

import { cx, sx } from '@/theme/util';

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

  // padding
  'p',
  'px',
  'py',
  'pt',
  'pb',
  'pl',
  'pr',

  // margin
  'm',
  'mx',
  'my',
  'mt',
  'mb',
  'ml',
  'mr',

  // radius
  'r',
  'tlr',
  'trr',
  'blr',
  'brr',

  // colors
  'c',
  'bg',
  'bc',

  // text
  'text',
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

  const boxClass = () => cx(
    boxStyle({
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
      tlr: boxStyleProps.tlr,
      trr: boxStyleProps.trr,
      blr: boxStyleProps.blr,
      brr: boxStyleProps.brr,
      c: boxStyleProps.c,
      bg: boxStyleProps.bg,
      bc: boxStyleProps.bc,
      text: boxStyleProps.text,
    }),
    boxSizeStyle({
      width: boxSizeProps.w !== undefined,
      height: boxSizeProps.h !== undefined,
      minWidth: boxSizeProps.minW !== undefined,
      minHeight: boxSizeProps.minH !== undefined,
      maxWidth: boxSizeProps.maxW !== undefined,
      maxHeight: boxSizeProps.maxH !== undefined,
      flex: boxSizeProps.flex !== undefined,
    }),
  );

  return (
    <Polymorphic
      {...rest}
      as={rest.as ?? 'div'}
      classList={{
        [boxClass()]: true,
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
