# Customization

`@suis-ui/kit` uses vanilla-extract theme contracts. The public theme APIs are exported from `@suis-ui/kit`.

## ThemeProvider

`ThemeProvider` mounts the default `token`, `component`, and light `vars` theme classes on `document.body`.

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

`createTheme` accepts partial `component`, `vars`, and `token` overrides and returns `[className, mount]`.

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

Use the exported contracts according to their scope and priority:

| Priority | Export | Scope |
| --- | --- | --- |
| 1 | `component` | Component-specific values for Button, CheckBox, Popup, Select, Input, Item, and Tooltip. |
| 2 | `vars` | Semantic aliases such as semantic colors, fonts, shadows, spaces, and line sizes. |
| 3 | `token` | Raw design values such as color palettes, space, and size. |

Prefer `component` when changing the look of a SUIS component. Prefer semantic `vars` in application-level customization. Use raw `token` values only when neither `component` nor `vars` expresses the needed value.

## Component Customization

Kit components often wrap multiple primitive components into a single styled API. For example, primitive Select is composed from `Select.Trigger`, `Select.Value`, `Select.Content`, and `Select.Item`, while kit Select exposes a single `Select` component.

When kit manages the internal structure, customize internal parts through `*Props` and `render*` props instead of rebuilding the primitive structure:

- `*Props` passes props to an internal part, such as `itemProps`.
- `render*` replaces an internal part, such as `renderItem`.

Only use props that are documented for the component. Pattern names such as `contentProps` or `renderContent` describe the convention, but they are not available unless that component explicitly documents them.
