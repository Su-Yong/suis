import { JSX } from 'solid-js/jsx-runtime';

import { DefaultLightThemeClass, DefaultTokenClass } from '@/theme/token';

export type ThemeProviderProps = {
  children: JSX.Element;
};
export const ThemeProvider = (props: ThemeProviderProps) => {
  document.body.classList.add(DefaultTokenClass);
  document.body.classList.add(DefaultLightThemeClass);

  return props.children;
};
