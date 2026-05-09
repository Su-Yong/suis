import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultColor } from './color.css';
import { DefaultSize } from './size.css';
import { DefaultTextSize } from './text-size.css';

export const DefaultToken = {
  color: DefaultColor,
  size: DefaultSize,
  textSize: DefaultTextSize,
};

export const token = createThemeContract(DefaultToken);
export const DefaultTokenClass = createTheme(token, DefaultToken);
