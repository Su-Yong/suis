import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultButtonVars } from './Button/vars.css';
import { DefaultCheckBoxVars } from './CheckBox/vars.css';

export const DefaultComponent = {
  button: DefaultButtonVars,
  checkbox: DefaultCheckBoxVars,
};
export const component = createThemeContract(DefaultComponent);
export const DefaultComponentClass = createTheme(component, DefaultComponent);
