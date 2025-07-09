import { createThemeContract } from '@vanilla-extract/css';

import { token, vars } from '@/theme/token';
import { alpha } from '@/theme/util';

export const DefaultButtonVars = {
  focus: {
    offset: vars.size.space.xxs,
    color: token.color.gray[950],
    width: vars.size.line.thick,
  },
  disabled: {
    opacity: '0.5',
  },
  size: {
    small: {
      x: vars.size.space.xs,
      y: vars.size.space.sm,
    },
    medium: {
      x: vars.size.space.sm,
      y: vars.size.space.md,
    },
    large: {
      x: vars.size.space.md,
      y: vars.size.space.lg,
    },
  },
  variants: {
    default: {
      default: {
        background: vars.color.surface.main,
        color: vars.color.surface.contrast,
        borderWidth: vars.size.line.md,
        borderColor: vars.color.surface.higher,
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.xs,
      },
      hover: {
        background: vars.color.surface.high,
        color: vars.color.surface.contrast,
        borderWidth: vars.size.line.md,
        borderColor: vars.color.surface.higher,
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.xs,
      },
      active: {
        background: vars.color.surface.higher,
        color: vars.color.surface.contrast,
        borderWidth: vars.size.line.md,
        borderColor: vars.color.surface.higher,
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.xs,
      },
    },
    primary: {
      default: {
        background: vars.color.primary.main,
        color: vars.color.primary.contrast,
        borderWidth: vars.size.space.none,
        borderColor: vars.color.primary.higher,
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.sm,
      },
      hover: {
        background: vars.color.primary.high,
        color: vars.color.primary.contrast,
        borderWidth: vars.size.space.none,
        borderColor: vars.color.primary.higher,
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.md,
      },
      active: {
        background: vars.color.primary.higher,
        color: vars.color.primary.contrast,
        borderWidth: vars.size.space.none,
        borderColor: vars.color.primary.higher,
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.md,
      },
    },
    secondary: {
      default: {
        background: vars.color.secondary.main,
        color: vars.color.secondary.contrast,
        borderWidth: vars.size.space.none,
        borderColor: vars.color.secondary.higher,
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.sm,
      },
      hover: {
        background: vars.color.secondary.high,
        color: vars.color.secondary.contrast,
        borderWidth: vars.size.space.none,
        borderColor: vars.color.secondary.higher,
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.md,
      },
      active: {
        background: vars.color.secondary.higher,
        color: vars.color.secondary.contrast,
        borderWidth: vars.size.space.none,
        borderColor: vars.color.secondary.higher,
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.md,
      },
    },
    ghost: {
      default: {
        background: alpha(vars.color.surface.contrast, 0),
        color: vars.color.surface.contrast,
        borderWidth: vars.size.space.none,
        borderColor: alpha(vars.color.surface.contrast, 0),
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.none,
      },
      hover: {
        background: alpha(vars.color.surface.contrast, 0.05),
        color: vars.color.surface.contrast,
        borderWidth: vars.size.space.none,
        borderColor: alpha(vars.color.surface.contrast, 0.05),
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.none,
      },
      active: {
        background: alpha(vars.color.surface.contrast, 0.1),
        color: vars.color.surface.contrast,
        borderWidth: vars.size.space.none,
        borderColor: alpha(vars.color.surface.contrast, 0.1),
        borderRadius: vars.size.space.sm,
        boxShadow: vars.shadow.none,
      },
    },
  },
};

export const buttonVars = createThemeContract(DefaultButtonVars);
