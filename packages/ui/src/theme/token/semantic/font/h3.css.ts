import { createThemeContract } from '@vanilla-extract/css';

import { DefaultSize } from '../../default/size.css';

export const DefaultH3 = {
  size: DefaultSize[4],
  lineHeight: '1.6',
  fontWeight: '600',
  letterSpacing: '-0.02rem',
};

export const H3Token = createThemeContract(DefaultH3);
