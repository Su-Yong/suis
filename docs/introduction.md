# Introduction

SUIS is a SolidJS UI library. The repository is organized as a pnpm workspace with two library packages:

- `@suis-ui/primitives` provides behavior-focused primitives.
- `@suis-ui/kit` provides styled components, theme APIs, and the SUIS CSS entrypoint built on top of the primitives.

Use `@suis-ui/kit` when you want ready-to-use styled components. Use `@suis-ui/primitives` when you want to compose behavior and accessibility yourself.

## Installation

Install the kit package for the styled component library:

```bash
pnpm add @suis-ui/kit solid-js
```

Install primitives directly when building custom components:

```bash
pnpm add @suis-ui/primitives solid-js
```

## Basic Setup

Import the kit CSS entrypoint once in your application:

```tsx
import '@suis-ui/kit/style.css';
```

Wrap your app with `ThemeProvider` to mount the default `token`, `component`, and light `vars` theme classes on `document.body`:

```tsx
import { ThemeProvider } from '@suis-ui/kit';

export const App = () => (
  <ThemeProvider>
    {/* app */}
  </ThemeProvider>
);
```

## Package Roles

`@suis-ui/primitives` owns state wiring, DOM behavior, focus handling, portals, popup positioning, and composition helpers.

`@suis-ui/kit` owns visual styling, vanilla-extract recipes, `component`, `vars`, `token`, color and space maps, and styled wrappers around primitives.

Keep those roles separate when adding new features. A behavior change normally belongs in primitives first. A visual or token change belongs in kit.

## Customization Model

Some interactions exist in both packages. Primitives expose compound components such as `Select.Trigger`, `Select.Content`, and `Select.Item` for direct composition. Kit usually exposes a single styled component for the same interaction, such as `Select`.

Kit components expose sub-element customization through `*Props` and `render*` props when the internal structure needs to stay managed by the kit component. For example, `Select` provides `itemProps`, `renderItem`, and related props for customizing generated parts without rebuilding the primitive composition yourself.

When choosing design values, prefer `component` first, then `vars`, then `token`. See [Design Principles](./design-principles.md) for the full rule.
