import { createThemeContract } from '@vanilla-extract/css';

import { DefaultTextSize } from '../../default/text-size.css';

export const DefaultBody = {
  fontSize: DefaultTextSize[0],
  lineHeight: 'normal',
  fontWeight: '400',
  letterSpacing: '0',
};

export const BodyToken = createThemeContract(DefaultBody);
