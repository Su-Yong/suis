import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultSemanticColor } from './color';
import { DefaultSemanticFont } from './font';
import { DefaultSemanticSize } from './size';

export const DefaultSemanticToken = {
  color: DefaultSemanticColor,
  font: DefaultSemanticFont,
  size: DefaultSemanticSize,
};

export const vars = createThemeContract(DefaultSemanticToken);
export const DefaultLightThemeClass = createTheme(vars, DefaultSemanticToken);
