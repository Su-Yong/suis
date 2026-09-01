import { createTheme } from '@vanilla-extract/css';

import { DefaultSemanticToken, vars } from './vars.css';

export const DefaultLightThemeClass = createTheme(vars, DefaultSemanticToken);
