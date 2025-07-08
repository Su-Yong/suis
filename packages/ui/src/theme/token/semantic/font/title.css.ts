import { createThemeContract } from '@vanilla-extract/css';

import { DefaultSize } from '../../default/size.css';

export const DefaultTitle = {
  size: DefaultSize[2],
  lineHeight: 'normal',
  fontWeight: '500',
  letterSpacing: '0',
};

export const TitleToken = createThemeContract(DefaultTitle);
