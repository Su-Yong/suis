import { createVar, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/token';
import { layered } from '@/theme/util';

import { component } from '../component.css';

const paddingX = createVar();
const paddingY = createVar();
export const baseButtonStyle = recipe({
  base: layered({
    width: 'fit-content',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: vars.size.space.xs,

    fontSize: '1.4rem',
    fontWeight: '500',
    cursor: 'pointer',

    border: 'none',

    ':focus-visible': {
      outlineStyle: 'solid',
      outlineOffset: component.button.focus.offset,
      outlineColor: component.button.focus.color,
      outlineWidth: component.button.focus.width,
    },
  }),

  variants: {
    disabled: {
      true: layered({
        cursor: 'not-allowed',
        opacity: component.button.disabled.opacity,
      }),
      false: {},
    },

    mode: {
      button: layered({
        padding: `${paddingX} ${paddingY}`,
      }),
      icon: layered({
        padding: paddingX,
      }),
    },

    size: {
      sm: {
        borderRadius: component.button.size.small.radius,

        vars: {
          [paddingX]: component.button.size.small.x,
          [paddingY]: component.button.size.small.y,
        },
      },
      md: {
        borderRadius: component.button.size.medium.radius,

        vars: {
          [paddingX]: component.button.size.medium.x,
          [paddingY]: component.button.size.medium.y,
        },
      },
      lg: {
        borderRadius: component.button.size.large.radius,

        vars: {
          [paddingX]: component.button.size.large.x,
          [paddingY]: component.button.size.large.y,
        },
      },
    },
  },
});

export const defaultButtonStyle = styleVariants({
  default: layered({
    background: component.button.variants.default.default.background,
    color: component.button.variants.default.default.color,

    borderStyle: 'solid',
    borderWidth: component.button.variants.default.default.borderWidth,
    borderColor: component.button.variants.default.default.borderColor,

    boxShadow: component.button.variants.default.default.boxShadow,
  }),
  primary: layered({
    background: component.button.variants.primary.default.background,
    color: component.button.variants.primary.default.color,

    borderStyle: 'solid',
    borderWidth: component.button.variants.primary.default.borderWidth,
    borderColor: component.button.variants.primary.default.borderColor,

    boxShadow: component.button.variants.primary.default.boxShadow,
  }),
  secondary: layered({
    background: component.button.variants.secondary.default.background,
    color: component.button.variants.secondary.default.color,

    borderStyle: 'solid',
    borderWidth: component.button.variants.secondary.default.borderWidth,
    borderColor: component.button.variants.secondary.default.borderColor,

    boxShadow: component.button.variants.secondary.default.boxShadow,
  }),
  ghost: layered({
    background: component.button.variants.ghost.default.background,
    color: component.button.variants.ghost.default.color,

    borderStyle: 'solid',
    borderWidth: component.button.variants.ghost.default.borderWidth,
    borderColor: component.button.variants.ghost.default.borderColor,

    boxShadow: component.button.variants.ghost.default.boxShadow,
  }),
});

export const hoverButtonStyle = styleVariants({
  default: layered({
    ':hover': {
      background: component.button.variants.default.hover.background,
      color: component.button.variants.default.hover.color,

      borderStyle: 'solid',
      borderWidth: component.button.variants.default.hover.borderWidth,
      borderColor: component.button.variants.default.hover.borderColor,

      boxShadow: component.button.variants.default.hover.boxShadow,
    },
    ':active': {
      background: component.button.variants.default.active.background,
      color: component.button.variants.default.active.color,

      borderStyle: 'solid',
      borderWidth: component.button.variants.default.active.borderWidth,
      borderColor: component.button.variants.default.active.borderColor,

      boxShadow: component.button.variants.default.active.boxShadow,
    },
  }),
  primary: layered({
    ':hover': {
      background: component.button.variants.primary.hover.background,
      color: component.button.variants.primary.hover.color,

      borderStyle: 'solid',
      borderWidth: component.button.variants.primary.hover.borderWidth,
      borderColor: component.button.variants.primary.hover.borderColor,

      boxShadow: component.button.variants.primary.hover.boxShadow,
    },
    ':active': {
      background: component.button.variants.primary.active.background,
      color: component.button.variants.primary.active.color,

      borderStyle: 'solid',
      borderWidth: component.button.variants.primary.active.borderWidth,
      borderColor: component.button.variants.primary.active.borderColor,

      boxShadow: component.button.variants.primary.active.boxShadow,
    },
  }),
  secondary: layered({
    ':hover': {
      background: component.button.variants.secondary.hover.background,
      color: component.button.variants.secondary.hover.color,

      borderStyle: 'solid',
      borderWidth: component.button.variants.secondary.hover.borderWidth,
      borderColor: component.button.variants.secondary.hover.borderColor,

      boxShadow: component.button.variants.secondary.hover.boxShadow,
    },
    ':active': {
      background: component.button.variants.secondary.active.background,
      color: component.button.variants.secondary.active.color,

      borderStyle: 'solid',
      borderWidth: component.button.variants.secondary.active.borderWidth,
      borderColor: component.button.variants.secondary.active.borderColor,

      boxShadow: component.button.variants.secondary.active.boxShadow,
    },
  }),
  ghost: layered({
    ':hover': {
      background: component.button.variants.ghost.hover.background,
      color: component.button.variants.ghost.hover.color,

      borderStyle: 'solid',
      borderWidth: component.button.variants.ghost.hover.borderWidth,
      borderColor: component.button.variants.ghost.hover.borderColor,

      boxShadow: component.button.variants.ghost.hover.boxShadow,
    },
    ':active': {
      background: component.button.variants.ghost.active.background,
      color: component.button.variants.ghost.active.color,

      borderStyle: 'solid',
      borderWidth: component.button.variants.ghost.active.borderWidth,
      borderColor: component.button.variants.ghost.active.borderColor,

      boxShadow: component.button.variants.ghost.active.boxShadow,
    },
  }),
});

export const activeButtonStyle = styleVariants({
  default: layered({
    background: component.button.variants.default.active.background,
    color: component.button.variants.default.active.color,

    borderStyle: 'solid',
    borderWidth: component.button.variants.default.active.borderWidth,
    borderColor: component.button.variants.default.active.borderColor,

    boxShadow: component.button.variants.default.active.boxShadow,
  }),
  primary: layered({
    background: component.button.variants.primary.active.background,
    color: component.button.variants.primary.active.color,

    borderStyle: 'solid',
    borderWidth: component.button.variants.primary.active.borderWidth,
    borderColor: component.button.variants.primary.active.borderColor,

    boxShadow: component.button.variants.primary.active.boxShadow,
  }),
  secondary: layered({
    background: component.button.variants.secondary.active.background,
    color: component.button.variants.secondary.active.color,

    borderStyle: 'solid',
    borderWidth: component.button.variants.secondary.active.borderWidth,
    borderColor: component.button.variants.secondary.active.borderColor,

    boxShadow: component.button.variants.secondary.active.boxShadow,
  }),
  ghost: layered({
    background: component.button.variants.ghost.active.background,
    color: component.button.variants.ghost.active.color,

    borderStyle: 'solid',
    borderWidth: component.button.variants.ghost.active.borderWidth,
    borderColor: component.button.variants.ghost.active.borderColor,

    boxShadow: component.button.variants.ghost.active.boxShadow,
  }),
});
