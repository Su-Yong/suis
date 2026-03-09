import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { DefaultButtonVars } from './Button/vars.css';
import { DefaultCheckBoxVars } from './CheckBox/vars.css';
import { DefaultPopupVars } from './Popup/vars.css';
import { DefaultSelectVars } from './Select/vars.css';

export const DefaultComponent = {
  button: DefaultButtonVars,
  checkbox: DefaultCheckBoxVars,
  popup: DefaultPopupVars,
  select: DefaultSelectVars,
};
export const component = createThemeContract(DefaultComponent);
export const DefaultComponentClass = createTheme(component, DefaultComponent);
