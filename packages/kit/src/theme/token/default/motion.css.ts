import { createThemeContract } from '@vanilla-extract/css';

export const DefaultMotion = {
  duration: {
    0: '0s',
    1: '120ms',
    2: '200ms',
    3: '300ms',
    4: '400ms',
    5: '500ms',
    6: '600ms',
  },
};

export const MotionToken = createThemeContract(DefaultMotion);
