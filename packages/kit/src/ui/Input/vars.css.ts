import { createThemeContract } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

export const DefaultInputVars = {
  focus: {
    offset: vars.size.space.none,
    color: vars.color.surface.higher,
    width: vars.size.line.thick,
  },
  default: {
    background: vars.color.surface.main,
    color: vars.color.surface.contrast,
    borderWidth: vars.size.line.md,
    borderColor: vars.color.surface.higher,
    borderRadius: vars.size.round.md,

    paddingX: vars.size.space.md,
    paddingY: vars.size.space.sm,
  },
  hover: {
    background: vars.color.surface.high,
    color: vars.color.surface.contrast,
    borderWidth: vars.size.line.md,
    borderColor: vars.color.surface.higher,
    borderRadius: vars.size.round.md,
  },
  active: {
    background: vars.color.surface.higher,
    color: vars.color.surface.contrast,
    borderWidth: vars.size.line.md,
    borderColor: vars.color.surface.higher,
    borderRadius: vars.size.round.md,
  },
  disabled: {
    background: vars.color.surface.higher,
    color: vars.color.text.disabled,
    borderWidth: vars.size.line.md,
    borderColor: vars.color.surface.higher,
    borderRadius: vars.size.round.md,
    opacity: '0.5',
  },

  placeholder: {
    color: vars.color.text.caption,
  },
  file: {
    background: vars.color.surface.main,
    color: vars.color.surface.contrast,
    borderWidth: vars.size.line.md,
    borderColor: vars.color.surface.higher,
    borderRadius: vars.size.round.sm,

    paddingX: vars.size.space.sm,
    paddingY: vars.size.space.xs,
  },
};

export const inputVars = createThemeContract(DefaultInputVars);
