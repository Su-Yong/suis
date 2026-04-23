import { createThemeContract } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

export const DefaultTooltipVars = {
  content: {
    font: vars.font.caption,

    background: vars.color.surface.main,
    color: vars.color.surface.contrast,
    boxShadow: vars.shadow.xl,
    borderRadius: vars.size.space.sm,

    paddingX: vars.size.space.sm,
    paddingY: vars.size.space.xs,
  },
  arrow: {
    size: vars.size.space.md,
  },
};

export const tooltipVars = createThemeContract(DefaultTooltipVars);
