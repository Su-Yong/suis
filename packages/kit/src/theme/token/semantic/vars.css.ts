import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultSemanticColor } from './color';
import { DefaultSemanticFont } from './font';
import { DefaultSemanticMotion } from './motion.css';
import { DefaultSemanticSize } from './size';
import { DefaultSemanticShadow } from './shadow';
import { DefaultSemanticZIndex } from './z-index.css';

export const DefaultSemanticToken = {
  color: DefaultSemanticColor,
  font: DefaultSemanticFont,
  motion: DefaultSemanticMotion,
  size: DefaultSemanticSize,
  shadow: DefaultSemanticShadow,
  zIndex: DefaultSemanticZIndex,
};

export const vars = createThemeContract(DefaultSemanticToken);
export const DefaultLightThemeClass = createTheme(vars, DefaultSemanticToken);
