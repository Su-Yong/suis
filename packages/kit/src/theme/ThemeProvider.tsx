import { Accessor, createContext, createEffect, createSignal, onCleanup, onMount, useContext } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import { DefaultLightThemeClass, DefaultTokenClass, vars, token } from '@/theme/token';

import { DefaultComponentClass, component } from '@/ui/component.css';

type ThemeType<T extends Record<string, unknown>> = {
  [Key in keyof T]?: T[Key] extends Record<string, unknown> ? ThemeType<T[Key]> : string;
};
export type SUISTheme = {
  token?: ThemeType<typeof token>;
  vars?: ThemeType<typeof vars>;
  component?: ThemeType<typeof component>;
}
export type SUISThemeResult = [className: string, mount: () => (() => void)];
export const createTheme = (theme: SUISTheme): SUISThemeResult => {
  const run = (
    variableRecords: Record<string, unknown>,
    valueRecords: Record<string, unknown>,
    prev: [string, string][] = [],
  ): [string, string][] => Object.entries(variableRecords)
    .flatMap(([path, variableKey]): [string, string][] => {
      if (!variableKey) return [];

      const variableValue = valueRecords[path];
      if (typeof variableKey === 'string' && typeof variableValue === 'string') {
        const [, key] = variableKey.match(/var\(([^)]+)\)/) ?? [];
        if (!key) return [];

        return [[key, variableValue]];
      } else if (typeof variableKey === 'object' && typeof variableValue === 'object') {
        return run(variableKey as Record<string, unknown>, valueRecords[path] as Record<string, unknown>, prev);
      }

      return [];
    });

  const tokenList = run(token, theme?.token ?? {});
  const varsList = run(vars, theme?.vars ?? {});
  const componentList = run(component, theme?.component ?? {});

  const className = `suis-theme-${Math.random().toString(36).substring(2, 15)}`;
  const mount = () => {
    const style = document.createElement('style');
    style.textContent = `
.${className} {
  ${tokenList.map(([key, value]) => `${key}: ${value};`).join('\n')}
  ${varsList.map(([key, value]) => `${key}: ${value};`).join('\n')}
  ${componentList.map(([key, value]) => `${key}: ${value};`).join('\n')}
}
      `.trim();
    document.body.appendChild(style);


    return () => document.body.removeChild(style);
  };

  return [className, mount];
};

type ThemeContextType = {
  theme: [Accessor<string | SUISThemeResult | null>, (theme: string | SUISThemeResult | null) => void];
}
const ThemeContext = createContext<ThemeContextType>();

export type ThemeProviderProps = {
  children: JSX.Element;
};
export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = createSignal<string | SUISThemeResult | null>(null);
  
  onMount(() => {
    document.body.classList.add(DefaultTokenClass);
    document.body.classList.add(DefaultComponentClass);
    document.body.classList.add(DefaultLightThemeClass);
  });

  createEffect(() => {
    const currentTheme = theme();
    if (!currentTheme) return;

    if (typeof currentTheme === 'string') {
      const themeClass = currentTheme;
      document.body.classList.add(themeClass);

      onCleanup(() => {
        document.body.classList.remove(themeClass);
      });
    } else {
      const [themeClass, mount] = currentTheme;

      const cleanUp = mount();
      document.body.classList.add(themeClass);

      onCleanup(() => {
        document.body.classList.remove(themeClass);
        cleanUp();
      });
    }
  });

  return (
    <ThemeContext.Provider value={{ theme: [theme, setTheme] }}>
      {props.children};
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('`useTheme` must be used within a `ThemeProvider`');
  }

  return context.theme;
};
