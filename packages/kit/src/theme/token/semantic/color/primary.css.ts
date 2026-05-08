import { createThemeContract } from '@vanilla-extract/css';

import { DefaultColor } from '../../default/color.css';

export const DefaultPrimary = {
  main: DefaultColor.blue[500],
  contrast: DefaultColor.gray[50],
  high: DefaultColor.blue[600],
  higher: DefaultColor.blue[700],

  container: DefaultColor.blue[50],
  containerContrast: DefaultColor.gray[950],
  containerHigh: DefaultColor.blue[100],
  containerHigher: DefaultColor.blue[200],
};

export const PrimaryToken = createThemeContract(DefaultPrimary);
