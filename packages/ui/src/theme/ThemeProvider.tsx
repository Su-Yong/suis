import { JSX } from 'solid-js/jsx-runtime';

import { DefaultLightThemeClass, DefaultTokenClass } from '@/theme/token';
import { DefaultComponentClass } from '@/ui/component.css';

export type ThemeProviderProps = {
  children: JSX.Element;
};
export const ThemeProvider = (props: ThemeProviderProps) => {
  document.body.classList.add(DefaultTokenClass);
  document.body.classList.add(DefaultLightThemeClass);
  document.body.classList.add(DefaultComponentClass);

  return props.children;
};
