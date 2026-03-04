import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultButtonVars } from './Button/vars.css';
import { DefaultCheckBoxVars } from './CheckBox/vars.css';
import { DefaultPopupVars } from './Popup/var.css';

export const DefaultComponent = {
  button: DefaultButtonVars,
  checkbox: DefaultCheckBoxVars,
  popup: DefaultPopupVars,
};
export const component = createThemeContract(DefaultComponent);
export const DefaultComponentClass = createTheme(component, DefaultComponent);
