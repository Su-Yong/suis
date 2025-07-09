import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultSemanticColor } from './color';
import { DefaultSemanticFont } from './font';
import { DefaultSemanticSize } from './size';
import { DefaultSemanticShadow } from './shadow';

export const DefaultSemanticToken = {
  color: DefaultSemanticColor,
  font: DefaultSemanticFont,
  size: DefaultSemanticSize,
  shadow: DefaultSemanticShadow,
};

export const vars = createThemeContract(DefaultSemanticToken);
export const DefaultLightThemeClass = createTheme(vars, DefaultSemanticToken);
