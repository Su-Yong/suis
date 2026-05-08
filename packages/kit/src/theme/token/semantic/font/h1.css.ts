import { createThemeContract } from '@vanilla-extract/css';

import { DefaultSize } from '../../default/size.css';

export const DefaultH1 = {
  fontSize: DefaultSize[9],
  lineHeight: '1.6',
  fontWeight: '700',
  letterSpacing: '-0.02rem',
};

export const H1Token = createThemeContract(DefaultH1);
