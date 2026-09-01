import { createTheme } from '@vanilla-extract/css';

import { DefaultToken, token } from './default.css';

export const DefaultTokenClass = createTheme(token, DefaultToken);
