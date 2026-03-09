import { createThemeContract } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

export const DefaultSelectVars = {
  trigger: {
    default: {
      background: vars.color.surface.main,
      color: vars.color.surface.contrast,
      borderWidth: vars.size.line.md,
      borderColor: vars.color.surface.higher,
      borderRadius: vars.size.space.md,
      boxShadow: vars.shadow.xs,

      paddingX: vars.size.space.md,
      paddingY: vars.size.space.sm,
    },
    hover: {
      background: vars.color.surface.high,
      color: vars.color.surface.contrast,
      borderWidth: vars.size.line.md,
      borderColor: vars.color.surface.higher,
      borderRadius: vars.size.space.md,
      boxShadow: vars.shadow.xs,
    },
    active: {
      background: vars.color.surface.higher,
      color: vars.color.surface.contrast,
      borderWidth: vars.size.line.md,
      borderColor: vars.color.surface.higher,
      borderRadius: vars.size.space.md,
      boxShadow: vars.shadow.xs,
    },
  },
  indicator: {
    size: vars.size.space.lg,
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: 'rotate(180deg)',
  },
};

export const selectVars = createThemeContract(DefaultSelectVars);
