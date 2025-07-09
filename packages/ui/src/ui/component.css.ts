import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultButtonVars } from './Button/vars.css';
import { DefaultCheckBoxVars } from './CheckBox/vars.css';

export const DefaultComponent = {
  button: DefaultButtonVars,
  checkBox: DefaultCheckBoxVars,
};
export const component = createThemeContract(DefaultComponent);
export const DefaultComponentClass = createTheme(component, DefaultComponent);
