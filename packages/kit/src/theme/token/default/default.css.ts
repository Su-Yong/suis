import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultColor } from './color.css';
import { DefaultMotion } from './motion.css';
import { DefaultSize } from './size.css';
import { DefaultTextSize } from './text-size.css';
import { DefaultZIndex } from './z-index.css';

export const DefaultToken = {
  color: DefaultColor,
  motion: DefaultMotion,
  size: DefaultSize,
  textSize: DefaultTextSize,
  zIndex: DefaultZIndex,
};

export const token = createThemeContract(DefaultToken);
export const DefaultTokenClass = createTheme(token, DefaultToken);
