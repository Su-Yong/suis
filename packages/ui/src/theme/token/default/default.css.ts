import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultColor } from './color.css';
import { DefaultSpace } from './space.css';
import { DefaultSize } from './size.css';

export const DefaultToken = {
  color: DefaultColor,
  space: DefaultSpace,
  size: DefaultSize,
};

export const token = createThemeContract(DefaultToken);
export const DefaultTokenClass = createTheme(token, DefaultToken);
