import { createThemeContract } from '@vanilla-extract/css';

import { DefaultTextSize } from '../../default/text-size.css';

export const DefaultCaption = {
  fontSize: DefaultTextSize[-1],
  lineHeight: 'normal',
  fontWeight: '400',
  letterSpacing: '0',
};

export const CaptionToken = createThemeContract(DefaultCaption);
