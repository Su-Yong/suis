import { createThemeContract } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

export const DefaultInputVars = {
  default: {
    background: vars.color.surface.main,
    color: vars.color.surface.contrast,
    borderWidth: vars.size.line.md,
    borderColor: vars.color.surface.higher,
    borderRadius: vars.size.space.md,

    paddingX: vars.size.space.md,
    paddingY: vars.size.space.sm,
  },
  hover: {
    background: vars.color.surface.high,
    color: vars.color.surface.contrast,
    borderWidth: vars.size.line.md,
    borderColor: vars.color.surface.higher,
    borderRadius: vars.size.space.md,
  },
  active: {
    background: vars.color.surface.higher,
    color: vars.color.surface.contrast,
    borderWidth: vars.size.line.md,
    borderColor: vars.color.surface.higher,
    borderRadius: vars.size.space.md,
  },

  placeholder: {
    color: vars.color.text.caption,
  },
  file: {
    background: vars.color.surface.main,
    color: vars.color.surface.contrast,
    borderWidth: vars.size.line.md,
    borderColor: vars.color.surface.higher,
    borderRadius: vars.size.space.sm,

    paddingX: vars.size.space.sm,
    paddingY: vars.size.space.xs,
  },
};

export const inputVars = createThemeContract(DefaultInputVars);
