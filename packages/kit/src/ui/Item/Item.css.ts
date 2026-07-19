import { recipe } from '@vanilla-extract/recipes';

import { layered } from '@/theme/util';

import { component } from '../component.css';

export const itemStyle = recipe({
  base: layered({
    width: '100%',
    minWidth: 0,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    background: component.item.background,
    color: component.item.color,
    borderWidth: component.item.borderWidth,
    borderColor: component.item.borderColor,
    boxShadow: component.item.boxShadow,
    gap: component.item.gap,

    selectors: {
      '&:focus-visible': {
        outlineStyle: 'solid',
        outlineOffset: component.item.focus.offset,
        outlineColor: component.item.focus.color,
        outlineWidth: component.item.focus.width,
      },
    },
  }),

  variants: {
    size: {
      xs: layered({
        borderRadius: component.item.size.xSmall.radius,
        padding: `${component.item.size.xSmall.y} ${component.item.size.xSmall.x}`,
      }),
      sm: layered({
        borderRadius: component.item.size.small.radius,
        padding: `${component.item.size.small.y} ${component.item.size.small.x}`,
      }),
      md: layered({
        borderRadius: component.item.size.medium.radius,
        padding: `${component.item.size.medium.y} ${component.item.size.medium.x}`,
      }),
      lg: layered({
        borderRadius: component.item.size.large.radius,
        padding: `${component.item.size.large.y} ${component.item.size.large.x}`,
      }),
      xl: layered({
        borderRadius: component.item.size.xLarge.radius,
        padding: `${component.item.size.xLarge.y} ${component.item.size.xLarge.x}`,
      }),
    },
  },
});
