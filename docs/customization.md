# Customization

`@suis-ui/kit` uses vanilla-extract theme contracts. The public theme APIs are exported from `@suis-ui/kit`.

## ThemeProvider

`ThemeProvider` mounts the default token, component, and light theme classes on `document.body`.

```tsx
import '@suis-ui/kit/style.css';
import { ThemeProvider } from '@suis-ui/kit';

export const App = () => (
  <ThemeProvider>
    {/* app */}
  </ThemeProvider>
);
```

Use `ThemeProvider` before rendering kit components.

## Runtime Theme Selection

`useTheme` returns the current theme accessor and setter:

```tsx
import { useTheme } from '@suis-ui/kit';

const ThemeSwitcher = () => {
  const [, setTheme] = useTheme();

  const useCustomTheme = () => {
    setTheme('my-theme-class');
  };

  return <button onClick={useCustomTheme}>Use custom theme</button>;
};
```

The setter accepts:

- a class name string
- a `createTheme` result
- `null` to leave only the default theme classes active

## createTheme

`createTheme` accepts partial `token`, `vars`, and `component` overrides and returns `[className, mount]`.

```tsx
import { createTheme, useTheme } from '@suis-ui/kit';

const theme = createTheme({
  vars: {
    color: {
      primary: {
        main: '#2563eb',
      },
    },
  },
});

const ThemeSwitcher = () => {
  const [, setTheme] = useTheme();

  return (
    <button onClick={() => setTheme(theme)}>
      Use generated theme
    </button>
  );
};
```

The generated theme mounts a `<style>` element and adds the generated class to `document.body`. Cleanup removes both.

## Theme Layers

Use the exported contracts according to their scope:

- `token`: base design values such as color palettes, space, and size.
- `vars`: semantic aliases such as semantic colors, fonts, shadows, and sizes.
- `component`: component-specific values for Button, CheckBox, Popup, Select, Input, and Tooltip.

Prefer semantic `vars` in application-level customization. Override `component` values when a specific component needs different styling.
