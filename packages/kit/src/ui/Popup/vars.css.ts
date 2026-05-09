import { createThemeContract } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

export const DefaultPopupVars = {
  enter: {
    duration: vars.motion.duration.normal,
    easing: vars.motion.easing.emphasized,
  },
  exit: {
    duration: vars.motion.duration.normal,
    easing: vars.motion.easing.emphasized,
  },
};

export const popupVars = createThemeContract(DefaultPopupVars);
