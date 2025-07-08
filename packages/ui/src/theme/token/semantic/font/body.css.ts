import { createThemeContract } from '@vanilla-extract/css';

import { DefaultSize } from '../../default/size.css';

export const DefaultBody = {
  size: DefaultSize[0],
  lineHeight: 'normal',
  fontWeight: '400',
  letterSpacing: '0',
};

export const BodyToken = createThemeContract(DefaultBody);
