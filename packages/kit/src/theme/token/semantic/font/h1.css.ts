import { createThemeContract } from '@vanilla-extract/css';

import { DefaultTextSize } from '../../default/text-size.css';

export const DefaultH1 = {
  fontSize: DefaultTextSize[9],
  lineHeight: '1.6',
  fontWeight: '700',
  letterSpacing: '-0.02rem',
};

export const H1Token = createThemeContract(DefaultH1);
