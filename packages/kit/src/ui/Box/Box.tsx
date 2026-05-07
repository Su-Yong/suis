import { splitProps, type ValidComponent } from 'solid-js';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Polymorphic, PolymorphicProps, cx, sx } from '@suis-ui/primitives';

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
  width,
  top,
  right,
  bottom,
  left,
  zIndex,
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

  // border
  'bc',
  'bd',
  'bdl',
  'bdr',
  'bdt',
  'bdb',
  'blc',
  'brc',
  'btc',
  'bbc',

  // others
  'text',
  'shadow',
  'overflow',
] as const;
export const BoxSizePropList = [
  'w',
  'h',
  'minW',
  'minH',
  'maxW',
  'maxH',
  'flex',
  't',
  'r',
  'b',
  'l',
  'z',
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
  t?: string;
  r?: string;
  b?: string;
  l?: string;
  z?: string | number;
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
      c: boxStyleProps.c ?? 'text.main',
      bg: boxStyleProps.bg,
      bc: boxStyleProps.bc,
      bd: boxStyleProps.bd,
      bdl: boxStyleProps.bdl,
      bdr: boxStyleProps.bdr,
      bdt: boxStyleProps.bdt,
      bdb: boxStyleProps.bdb,
      blc: boxStyleProps.blc,
      brc: boxStyleProps.brc,
      btc: boxStyleProps.btc,
      bbc: boxStyleProps.bbc,
      text: boxStyleProps.text,
      shadow: boxStyleProps.shadow,
      overflow: boxStyleProps.overflow,
    }),
    boxSizeStyle({
      width: boxSizeProps.w !== undefined,
      height: boxSizeProps.h !== undefined,
      minWidth: boxSizeProps.minW !== undefined,
      minHeight: boxSizeProps.minH !== undefined,
      maxWidth: boxSizeProps.maxW !== undefined,
      maxHeight: boxSizeProps.maxH !== undefined,
      flex: boxSizeProps.flex !== undefined,
      t: boxSizeProps.t !== undefined,
      r: boxSizeProps.r !== undefined,
      b: boxSizeProps.b !== undefined,
      l: boxSizeProps.l !== undefined,
      z: boxSizeProps.z !== undefined,
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
          [top]: boxSizeProps.t,
          [right]: boxSizeProps.r,
          [bottom]: boxSizeProps.b,
          [left]: boxSizeProps.l,
          [zIndex]: boxSizeProps.z,
        }),
        rest.style,
      )}
      {...passed.props}
    />
  );
};
