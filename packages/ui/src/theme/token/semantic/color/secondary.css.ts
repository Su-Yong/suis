import { createThemeContract } from '@vanilla-extract/css';

import { DefaultColor } from '../../default/color.css';

export const DefaultSecondary = {
  main: DefaultColor.gray[500],
  contrast: DefaultColor.gray[50],
  high: DefaultColor.gray[600],
  higher: DefaultColor.gray[700],

  container: DefaultColor.gray[50],
  containerContrast: DefaultColor.gray[950],
  containerHigh: DefaultColor.gray[100],
  containerHigher: DefaultColor.gray[200],
};

export const SecondaryToken = createThemeContract(DefaultSecondary);
