import { createThemeContract } from '@vanilla-extract/css';

import { DefaultColor } from '../../default/color.css';

export const DefaultWarn = {
  main: DefaultColor.yellow[500],
  contrast: DefaultColor.gray[50],
  high: DefaultColor.yellow[600],
  higher: DefaultColor.yellow[700],

  container: DefaultColor.yellow[50],
  containerContrast: DefaultColor.gray[950],
  containerHigh: DefaultColor.yellow[100],
  containerHigher: DefaultColor.yellow[200],
};

export const WarnToken = createThemeContract(DefaultWarn);
