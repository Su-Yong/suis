import { createThemeContract } from '@vanilla-extract/css';

import { vars } from '@/theme/token';
import { alpha } from '@/theme/util';

export const DefaultItemVars = {
  background: alpha(vars.color.surface.main, 0),
  color: vars.color.surface.contrast,
  borderWidth: vars.size.space.none,
  borderColor: vars.color.surface.higher,
  boxShadow: vars.shadow.none,
  gap: vars.size.space.sm,
  focus: {
    offset: vars.size.space.xxs,
    color: vars.color.text.main,
    width: vars.size.line.thick,
  },
  size: {
    xSmall: {
      x: vars.size.space.xs,
      y: vars.size.space.xxs,
      radius: vars.size.round.xs,
    },
    small: {
      x: vars.size.space.sm,
      y: vars.size.space.xs,
      radius: vars.size.round.sm,
    },
    medium: {
      x: vars.size.space.md,
      y: vars.size.space.sm,
      radius: vars.size.round.md,
    },
    large: {
      x: vars.size.space.lg,
      y: vars.size.space.md,
      radius: vars.size.round.lg,
    },
    xLarge: {
      x: vars.size.space.xl,
      y: vars.size.space.lg,
      radius: vars.size.round.xl,
    },
  },
};

export const itemVars = createThemeContract(DefaultItemVars);
