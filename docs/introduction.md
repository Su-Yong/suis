# Introduction

SUIS is a SolidJS UI library. The repository is organized as a pnpm workspace with two library packages:

- `@suis-ui/primitives` provides behavior-focused primitives.
- `@suis-ui/kit` provides styled components and theme APIs built on top of the primitives.

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

Wrap your app with `ThemeProvider` to mount the default token, component, and light theme classes on `document.body`:

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

`@suis-ui/kit` owns visual styling, vanilla-extract recipes, semantic tokens, component tokens, and styled wrappers around primitives.

Keep those roles separate when adding new features. A behavior change normally belongs in primitives first. A visual or token change belongs in kit.
