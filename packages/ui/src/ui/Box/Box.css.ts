import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { createVar, style } from '@vanilla-extract/css';

import { colors, spaces } from '@/theme';
import { layered, map } from '@/theme/util';
import { l2Layer } from '@/theme/layer.css';

export const width = createVar();
export const height = createVar();
export const minWidth = createVar();
export const minHeight = createVar();
export const maxWidth = createVar();
export const maxHeight = createVar();
export const flex = createVar();
export const boxSizeStyle = style(
  layered({
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    flex,

    vars: {
      [width]: '',
      [height]: '',
      [minWidth]: '',
      [minHeight]: '',
      [maxWidth]: '',
      [maxHeight]: '',
      [flex]: '',
    },
  }, l2Layer),
);
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

    // spacing
    p: map(spaces, (padding) => layered({ padding }, l2Layer)),
    px: map(spaces, (paddingX) => layered({ paddingLeft: paddingX, paddingRight: paddingX }, l2Layer)),
    py: map(spaces, (paddingY) => layered({ paddingTop: paddingY, paddingBottom: paddingY }, l2Layer)),
    pt: map(spaces, (paddingTop) => layered({ paddingTop }, l2Layer)),
    pb: map(spaces, (paddingBottom) => layered({ paddingBottom }, l2Layer)),
    pl: map(spaces, (paddingLeft) => layered({ paddingLeft }, l2Layer)),
    pr: map(spaces, (paddingRight) => layered({ paddingRight }, l2Layer)),

    m: map(spaces, (margin) => layered({ margin }, l2Layer)),
    mx: map(spaces, (marginX) => layered({ marginLeft: marginX, marginRight: marginX }, l2Layer)),
    my: map(spaces, (marginY) => layered({ marginTop: marginY, marginBottom: marginY }, l2Layer)),
    mt: map(spaces, (marginTop) => layered({ marginTop }, l2Layer)),
    mb: map(spaces, (marginBottom) => layered({ marginBottom }, l2Layer)),
    ml: map(spaces, (marginLeft) => layered({ marginLeft }, l2Layer)),
    mr: map(spaces, (marginRight) => layered({ marginRight }, l2Layer)),

    r: map(spaces, (borderRadius) => layered({ borderRadius }, l2Layer)),

    // colors
    c: map(colors, (color) => layered({ color }, l2Layer)),
    bg: map(colors, (background) => layered({ background }, l2Layer)),
    bc: map(colors, (borderColor) => layered({ borderColor }, l2Layer)),
  },

  defaultVariants: {
    direction: 'column',
  },
});

export type BoxStyleType = RecipeVariants<typeof boxStyle>;