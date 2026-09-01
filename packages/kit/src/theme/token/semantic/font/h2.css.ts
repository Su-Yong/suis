import { createThemeContract } from '@vanilla-extract/css';

import { DefaultTextSize } from '../../default/text-size.css';

export const DefaultH2 = {
  fontSize: DefaultTextSize[7],
  lineHeight: '1.6',
  fontWeight: '600',
  letterSpacing: '-0.2px',
};

export const H2Token = createThemeContract(DefaultH2);
