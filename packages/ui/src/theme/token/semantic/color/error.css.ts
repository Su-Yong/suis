import { createThemeContract } from '@vanilla-extract/css';

import { DefaultColor } from '../../default/color.css';

export const DefaultError = {
  main: DefaultColor.red[500],
  contrast: DefaultColor.gray[50],
  high: DefaultColor.red[600],
  higher: DefaultColor.red[700],

  container: DefaultColor.red[50],
  containerContrast: DefaultColor.gray[950],
  containerHigh: DefaultColor.red[100],
  containerHigher: DefaultColor.red[200],
};

export const ErrorToken = createThemeContract(DefaultError);
