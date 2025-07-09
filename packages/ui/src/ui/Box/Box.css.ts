import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { createVar, style } from '@vanilla-extract/css';

import { colors, spaces } from '@/theme';
import { layered, map } from '@/theme/util';

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
  }),
);
export const boxStyle = recipe({
  base: {
    display: 'flex',
  },

  variants: {
    // layout
    pos: {
      relative: layered({ position: 'relative' }),
      absolute: layered({ position: 'absolute' }),
      fixed: layered({ position: 'fixed' }),
      sticky: layered({ position: 'sticky' }),
    },
    direction: {
      row: layered({ flexDirection: 'row' }),
      'row-reverse': layered({ flexDirection: 'row-reverse' }),
      column: layered({ flexDirection: 'column' }),
      'column-reverse': layered({ flexDirection: 'column-reverse' }),
    },
    justify: {
      'flex-start': layered({ justifyContent: 'flex-start' }),
      'flex-end': layered({ justifyContent: 'flex-end' }),
      center: layered({ justifyContent: 'center' }),
      'space-between': layered({ justifyContent: 'space-between' }),
      'space-around': layered({ justifyContent: 'space-around' }),
      'space-evenly': layered({ justifyContent: 'space-evenly' }),
    },
    align: {
      'flex-start': layered({ alignItems: 'flex-start' }),
      'flex-end': layered({ alignItems: 'flex-end' }),
      center: layered({ alignItems: 'center' }),
      baseline: layered({ alignItems: 'baseline' }),
      stretch: layered({ alignItems: 'stretch' }),
    },
    wrap: {
      nowrap: layered({ flexWrap: 'nowrap' }),
      wrap: layered({ flexWrap: 'wrap' }),
      'wrap-reverse': layered({ flexWrap: 'wrap-reverse' }),
    },
    gap: map(spaces, (gap) => layered({ gap })),

    // spacing
    p: map(spaces, (padding) => layered({ padding })),
    px: map(spaces, (paddingX) => layered({ paddingLeft: paddingX, paddingRight: paddingX })),
    py: map(spaces, (paddingY) => layered({ paddingTop: paddingY, paddingBottom: paddingY })),
    pt: map(spaces, (paddingTop) => layered({ paddingTop })),
    pb: map(spaces, (paddingBottom) => layered({ paddingBottom })),
    pl: map(spaces, (paddingLeft) => layered({ paddingLeft })),
    pr: map(spaces, (paddingRight) => layered({ paddingRight })),

    m: map(spaces, (margin) => layered({ margin })),
    mx: map(spaces, (marginX) => layered({ marginLeft: marginX, marginRight: marginX })),
    my: map(spaces, (marginY) => layered({ marginTop: marginY, marginBottom: marginY })),
    mt: map(spaces, (marginTop) => layered({ marginTop })),
    mb: map(spaces, (marginBottom) => layered({ marginBottom })),
    ml: map(spaces, (marginLeft) => layered({ marginLeft })),
    mr: map(spaces, (marginRight) => layered({ marginRight })),

    r: map(spaces, (borderRadius) => layered({ borderRadius })),

    // colors
    c: map(colors, (color) => layered({ color })),
    bg: map(colors, (background) => layered({ background })),
    bc: map(colors, (borderColor) => layered({ borderColor })),
  },

  defaultVariants: {
    direction: 'column',
  },
});

export type BoxStyleType = RecipeVariants<typeof boxStyle>;