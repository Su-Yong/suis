import { createThemeContract } from '@vanilla-extract/css';

export const DefaultPopupVars = {
  enter: {
    duration: '0.6s',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  exit: {
    duration: '0.6s',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

export const popupVars = createThemeContract(DefaultPopupVars);
