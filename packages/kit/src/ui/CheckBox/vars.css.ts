import { createThemeContract } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

export const DefaultCheckBoxVars = {
  active: vars.color.primary.main,
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',

  indicator: {
    size: '2.4rem',
    borderWidth: vars.size.line.md,
    borderColor: vars.color.surface.higher,
    hover: vars.color.surface.high,
    active: vars.color.surface.higher,
  },

  check: {
    size: '1.6rem',
    color: vars.color.primary.contrast,
    hover: vars.color.primary.container,
    active: vars.color.primary.containerHigher,
  },
};

export const checkBoxVars = createThemeContract(DefaultCheckBoxVars);
