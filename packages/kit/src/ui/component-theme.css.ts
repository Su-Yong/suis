import { createTheme } from '@vanilla-extract/css';

import { component } from './component.css';
import { DefaultComponent } from './component-vars.css';

export const DefaultComponentClass = createTheme(component, DefaultComponent);
