import { createThemeContract } from '@vanilla-extract/css';

import { DefaultTextSize } from '../../default/text-size.css';

export const DefaultH3 = {
  fontSize: DefaultTextSize[4],
  lineHeight: '1.6',
  fontWeight: '600',
  letterSpacing: '-0.02rem',
};

export const H3Token = createThemeContract(DefaultH3);
