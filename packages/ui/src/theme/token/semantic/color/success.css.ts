import { createThemeContract } from '@vanilla-extract/css';

import { DefaultColor } from '../../default/color.css';

export const DefaultSuccess = {
  main: DefaultColor.green[500],
  contrast: DefaultColor.gray[50],
  high: DefaultColor.green[600],
  higher: DefaultColor.green[700],

  container: DefaultColor.green[50],
  containerContrast: DefaultColor.gray[950],
  containerHigh: DefaultColor.green[100],
  containerHigher: DefaultColor.green[200],
};

export const SuccessToken = createThemeContract(DefaultSuccess);
