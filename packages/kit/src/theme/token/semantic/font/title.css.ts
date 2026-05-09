import { createThemeContract } from '@vanilla-extract/css';

import { DefaultTextSize } from '../../default/text-size.css';

export const DefaultTitle = {
  fontSize: DefaultTextSize[2],
  lineHeight: 'normal',
  fontWeight: '500',
  letterSpacing: '0',
};

export const TitleToken = createThemeContract(DefaultTitle);
