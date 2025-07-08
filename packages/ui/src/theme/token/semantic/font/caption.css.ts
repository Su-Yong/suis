import { createThemeContract } from '@vanilla-extract/css';

import { DefaultSize } from '../../default/size.css';

export const DefaultCaption = {
  size: DefaultSize[-1],
  lineHeight: 'normal',
  fontWeight: '400',
  letterSpacing: '0',
};

export const CaptionToken = createThemeContract(DefaultCaption);
