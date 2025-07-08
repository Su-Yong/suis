import { createThemeContract } from '@vanilla-extract/css';

import { DefaultSize } from '../../default/size.css';

export const DefaultH2 = {
  size: DefaultSize[7],
  lineHeight: '1.6',
  fontWeight: '600',
  letterSpacing: '-0.02rem',
};

export const H2Token = createThemeContract(DefaultH2);
