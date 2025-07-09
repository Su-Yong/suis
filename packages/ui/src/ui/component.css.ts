import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultButtonVars } from './Button/vars.css';

export const DefaultComponent = {
  button: DefaultButtonVars,
};
export const component = createThemeContract(DefaultComponent);
export const DefaultComponentClass = createTheme(component, DefaultComponent);
