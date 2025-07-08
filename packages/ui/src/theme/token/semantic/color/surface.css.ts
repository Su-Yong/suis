import { createThemeContract } from '@vanilla-extract/css';

import { DefaultColor } from '../../default/color.css';

export const DefaultSurface = {
  main: DefaultColor.gray[50],
  contrast: DefaultColor.gray[950],
  high: DefaultColor.gray[100],
  higher: DefaultColor.gray[200],
};

export const SurfaceToken = createThemeContract(DefaultSurface);
