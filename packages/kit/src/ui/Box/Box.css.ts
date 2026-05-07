import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { createVar } from '@vanilla-extract/css';

import { colors, spaces } from '@/theme';
import { vars } from '@/theme/token';
import { layered, map } from '@/theme/util';
import { l2Layer } from '@/theme/layer.css';

export const width = createVar();
export const height = createVar();
export const minWidth = createVar();
export const minHeight = createVar();
export const maxWidth = createVar();
export const maxHeight = createVar();
export const flex = createVar();
export const top = createVar();
export const right = createVar();
export const bottom = createVar();
export const left = createVar();
export const zIndex = createVar();
export const boxSizeStyle = recipe({
  variants: {
    width: { true: layered({ width } , l2Layer)},
    height: { true: layered({ height } , l2Layer)},
    minWidth: { true: layered({ minWidth } , l2Layer)},
    minHeight: { true: layered({ minHeight } , l2Layer)},
    maxWidth: { true: layered({ maxWidth } , l2Layer)},
    maxHeight: { true: layered({ maxHeight } , l2Layer)},
    flex: { true: layered({ flex } , l2Layer)},
    top: { true: layered({ top }, l2Layer) },
    right: { true: layered({ right }, l2Layer) },
    bottom: { true: layered({ bottom }, l2Layer) },
    left: { true: layered({ left }, l2Layer) },
    z: { true: layered({ zIndex }, l2Layer) },
  },
});

export type BoxStyleType = RecipeVariants<typeof boxStyle>;
export const boxStyle = recipe({
  base: {
    display: 'flex',
  },

  variants: {
    // layout
    pos: {
      relative: layered({ position: 'relative' }, l2Layer),
      absolute: layered({ position: 'absolute' }, l2Layer),
      fixed: layered({ position: 'fixed' }, l2Layer),
      sticky: layered({ position: 'sticky' }, l2Layer),
    },
    direction: {
      row: layered({ flexDirection: 'row' }, l2Layer),
      'row-reverse': layered({ flexDirection: 'row-reverse' }, l2Layer),
      column: layered({ flexDirection: 'column' }, l2Layer),
      'column-reverse': layered({ flexDirection: 'column-reverse' }, l2Layer),
    },
    justify: {
      'flex-start': layered({ justifyContent: 'flex-start' }, l2Layer),
      'flex-end': layered({ justifyContent: 'flex-end' }, l2Layer),
      center: layered({ justifyContent: 'center' }, l2Layer),
      'space-between': layered({ justifyContent: 'space-between' }, l2Layer),
      'space-around': layered({ justifyContent: 'space-around' }, l2Layer),
      'space-evenly': layered({ justifyContent: 'space-evenly' }, l2Layer),
    },
    align: {
      'flex-start': layered({ alignItems: 'flex-start' }, l2Layer),
      'flex-end': layered({ alignItems: 'flex-end' }, l2Layer),
      center: layered({ alignItems: 'center' }, l2Layer),
      baseline: layered({ alignItems: 'baseline' }, l2Layer),
      stretch: layered({ alignItems: 'stretch' }, l2Layer),
    },
    wrap: {
      nowrap: layered({ flexWrap: 'nowrap' }, l2Layer),
      wrap: layered({ flexWrap: 'wrap' }, l2Layer),
      'wrap-reverse': layered({ flexWrap: 'wrap-reverse' }, l2Layer),
    },
    gap: map(spaces, (gap) => layered({ gap }, l2Layer)),

    // padding
    p: map(spaces, (padding) => layered({ padding }, l2Layer)),
    px: map(spaces, (paddingX) => layered({ paddingLeft: paddingX, paddingRight: paddingX }, l2Layer)),
    py: map(spaces, (paddingY) => layered({ paddingTop: paddingY, paddingBottom: paddingY }, l2Layer)),
    pt: map(spaces, (paddingTop) => layered({ paddingTop }, l2Layer)),
    pb: map(spaces, (paddingBottom) => layered({ paddingBottom }, l2Layer)),
    pl: map(spaces, (paddingLeft) => layered({ paddingLeft }, l2Layer)),
    pr: map(spaces, (paddingRight) => layered({ paddingRight }, l2Layer)),

    // margin
    m: map(spaces, (margin) => layered({ margin }, l2Layer)),
    mx: map(spaces, (marginX) => layered({ marginLeft: marginX, marginRight: marginX }, l2Layer)),
    my: map(spaces, (marginY) => layered({ marginTop: marginY, marginBottom: marginY }, l2Layer)),
    mt: map(spaces, (marginTop) => layered({ marginTop }, l2Layer)),
    mb: map(spaces, (marginBottom) => layered({ marginBottom }, l2Layer)),
    ml: map(spaces, (marginLeft) => layered({ marginLeft }, l2Layer)),
    mr: map(spaces, (marginRight) => layered({ marginRight }, l2Layer)),

    // radius
    r: map(spaces, (borderRadius) => layered({ borderRadius }, l2Layer)),
    tlr: map(spaces, (borderRadius) => layered({ borderTopLeftRadius: borderRadius }, l2Layer)),
    trr: map(spaces, (borderRadius) => layered({ borderTopRightRadius: borderRadius }, l2Layer)),
    blr: map(spaces, (borderRadius) => layered({ borderBottomLeftRadius: borderRadius }, l2Layer)),
    brr: map(spaces, (borderRadius) => layered({ borderBottomRightRadius: borderRadius }, l2Layer)),

    // colors
    c: map(colors, (color) => layered({ color }, l2Layer)),
    bg: map(colors, (background) => layered({ background }, l2Layer)),

    // border
    bc: map(colors, (borderColor) => layered({ borderColor }, l2Layer)),
    bd: map(vars.size.line, (borderWidth) => layered({ borderStyle: 'solid', borderWidth }, l2Layer)),
    bdl: map(vars.size.line, (borderWidth) => layered({ borderLeftStyle: 'solid', borderLeftWidth: borderWidth }, l2Layer)),
    bdr: map(vars.size.line, (borderWidth) => layered({ borderRightStyle: 'solid', borderRightWidth: borderWidth }, l2Layer)),
    bdt: map(vars.size.line, (borderWidth) => layered({ borderTopStyle: 'solid', borderTopWidth: borderWidth }, l2Layer)),
    bdb: map(vars.size.line, (borderWidth) => layered({ borderBottomStyle: 'solid', borderBottomWidth: borderWidth }, l2Layer)),
    blc: map(colors, (borderColor) => layered({ borderLeftColor: borderColor }, l2Layer)),
    brc: map(colors, (borderColor) => layered({ borderRightColor: borderColor }, l2Layer)),
    btc: map(colors, (borderColor) => layered({ borderTopColor: borderColor }, l2Layer)),
    bbc: map(colors, (borderColor) => layered({ borderBottomColor: borderColor }, l2Layer)),

    // others
    text: vars.font,
    shadow: map(vars.shadow, (boxShadow) => layered({ boxShadow }, l2Layer)),
    overflow: {
      auto: layered({ overflow: 'auto' }, l2Layer),
      hidden: layered({ overflow: 'hidden' }, l2Layer),
      visible: layered({ overflow: 'visible' }, l2Layer),
      scroll: layered({ overflow: 'scroll' }, l2Layer),

      xAuto: layered({ overflowX: 'auto' }, l2Layer),
      xHidden: layered({ overflowX: 'hidden' }, l2Layer),
      xVisible: layered({ overflowX: 'visible' }, l2Layer),
      xScroll: layered({ overflowX: 'scroll' }, l2Layer),

      yAuto: layered({ overflowY: 'auto' }, l2Layer),
      yHidden: layered({ overflowY: 'hidden' }, l2Layer),
      yVisible: layered({ overflowY: 'visible' }, l2Layer),
      yScroll: layered({ overflowY: 'scroll' }, l2Layer),
    },
  },

  defaultVariants: {
    direction: 'column',
    text: 'body',
  },
});
