---
layout: home
title: SUIS
description: A SolidJS UI library with behavior primitives, styled components, and theme APIs.

hero:
  name: SUIS
  text: Solid UI System
  tagline: A SolidJS UI library with behavior primitives, styled components, and theme APIs.
  actions:
    - theme: brand
      text: Get Started
      link: ./introduction
    - theme: alt
      text: llms.txt
      link: ./llms.txt

features:
  - title: Behavior Primitives
    details: Compose accessible interactions with primitives for popups, selects, tooltips, checkboxes, focus management, and polymorphic elements.
  - title: Styled Kit
    details: Use ready-to-use Solid components backed by SUIS primitives, vanilla-extract styles, and component-level theme contracts.
  - title: Customizable Themes
    details: Customize through component tokens first, semantic vars second, and raw design tokens only when needed.
---

## Start Here

SUIS is split into two packages:

- `@suis-ui/kit` provides styled components, theme APIs, and the SUIS CSS entrypoint.
- `@suis-ui/primitives` provides behavior-focused primitives for custom component composition.

Read the [Introduction](./introduction.md), review the [Design Principles](./design-principles.md), or jump into [Customization](./customization.md).

## Packages

Use [Kit components](./kit/box.md) when you want ready-to-use UI. Use [Primitives](./primitives/polymorphic.md) when you want to own markup and styling while reusing SUIS behavior.

<llm-only>

This content is for LLMs and coding agents. Use it to understand how to consume SUIS, which package to choose, how the design system should be used, and how to work safely in this repository.

## What SUIS Is

SUIS is managed as a pnpm workspace with two public packages:

- `@suis-ui/primitives`: low-level Solid primitives for behavior, accessibility, state, focus, popup positioning, portals, and composition.
- `@suis-ui/kit`: styled UI components, theme APIs, vanilla-extract styles, and single-component APIs built on top of primitives.

Use source files and package manifests as the final source of truth. Generated `dist` files can help confirm public types, but do not treat generated output or `node_modules` as canonical.

## Quick Start

Use `@suis-ui/kit` for the styled component library:

```bash
pnpm add @suis-ui/kit solid-js
```

Import the kit stylesheet once:

```tsx
import '@suis-ui/kit/style.css';
```

Wrap the app with `ThemeProvider` before rendering kit components:

```tsx
import { ThemeProvider } from '@suis-ui/kit';

export const App = () => (
  <ThemeProvider>
    {/* app */}
  </ThemeProvider>
);
```

Use `@suis-ui/primitives` directly when building custom components around SUIS behavior:

```bash
pnpm add @suis-ui/primitives solid-js
```

## Which Package To Use

Use `@suis-ui/kit` when:

- You want ready-to-use styled UI.
- You want SUIS tokens, component styling, and default interactions.
- You are building app UI and only need documented `*Props`, `render*`, Box props, or theme overrides for customization.

Use `@suis-ui/primitives` when:

- You need to control the DOM structure directly.
- You need behavior without kit styling.
- You are building a new styled component that should compose behavior from primitives.

Do not put kit theme contracts into primitives. Do not duplicate primitive behavior in kit when a primitive already owns it.

## Design System Rules

When styling SUIS or building with SUIS, choose theme values in this order:

| Priority | Export | Use For |
| --- | --- | --- |
| 1 | `component` | Styling a specific SUIS component such as Button, Tooltip, Select, Input, Item, Popup, or CheckBox. |
| 2 | `vars` | Semantic app UI values such as color, font, shadow, spacing, line size, z-index, and motion. |
| 3 | `token` | Raw palette, size, text size, z-index, or motion values for exceptional details that `component` and `vars` cannot express. |

The public raw-token export is `token`, not `tokens`. Do not write code or docs that import a `tokens` variable from `@suis-ui/kit`.

```tsx
import { component, vars, token } from '@suis-ui/kit';
```

Use `createTheme` for partial theme overrides:

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

`useTheme` must be used inside `ThemeProvider`. Its setter accepts a class name string, a `createTheme` result, or `null`.

## Component Usage Patterns

Primitives expose compound components for direct composition. For example, primitive Select is assembled from subcomponents:

```tsx
import { createSignal } from 'solid-js';
import { Select } from '@suis-ui/primitives';

const [value, setValue] = createSignal<string | null>(null);

<Select value={value()} onChangeValue={setValue} placement="bottom-start">
  <Select.Trigger>
    <Select.Value>
      {(value) => value ?? 'Choose an option'}
    </Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="small">Small</Select.Item>
    <Select.Item value="large">Large</Select.Item>
  </Select.Content>
</Select>;
```

Kit wraps the same kind of interaction behind a single styled component when the common structure should be managed for the user:

```tsx
import { createSignal } from 'solid-js';
import { Select } from '@suis-ui/kit';

const [value, setValue] = createSignal<string | null>(null);

<Select
  data={['Small', 'Medium', 'Large']}
  value={value()}
  onChangeValue={setValue}
  placeholder="Choose a size"
/>;
```

When kit manages internal structure, customize internal parts through documented `*Props` and `render*` props:

- `*Props` passes props to an internal part.
- `render*` replaces an internal part.

For kit `Select`, the current documented customization props are:

- `indicatorProps`
- `contentProps`
- `groupProps`
- `itemProps`
- `checkIndicatorProps`
- `renderValue`
- `renderIndicator`
- `renderContent`
- `renderGroup`
- `renderItem`
- `renderCheckIndicator`

Use `contentProps` and `renderContent` for kit `Select` content customization. For other components, only use `*Props` and `render*` props that the component explicitly documents.

## Public API Map

`@suis-ui/kit` exports:

- UI components: `Box`, `Button`, `CheckBox`, `Input`, `Item`, `Popup`, `Select`, `Tooltip`
- Theme APIs: `ThemeProvider`, `useTheme`, `createTheme`
- Theme contracts and maps: `component`, `vars`, `token`, `colors`, `spaces`, `rounds`
- CSS entrypoint: `@suis-ui/kit/style.css`

`@suis-ui/primitives` exports:

- Primitives: `Polymorphic`, `CheckBox`, `Popup`, `Select`, `FocusManager`, `Tooltip`
- Helpers: `cx`, `cl`, `clx`, `sx`, `forwardRef`

## Documentation Map

Start with `docs/table-of-contents.md`.

Important guide docs:

- `docs/introduction.md`: package roles, installation, and basic setup.
- `docs/design-principles.md`: design system priority and primitives-vs-kit component model.
- `docs/customization.md`: `ThemeProvider`, `useTheme`, `createTheme`, and theme layers.

Kit component docs:

- `docs/kit/box.md`
- `docs/kit/button.md`
- `docs/kit/checkbox.md`
- `docs/kit/input.md`
- `docs/kit/item.md`
- `docs/kit/popup.md`
- `docs/kit/select.md`
- `docs/kit/tooltip.md`

Primitive docs:

- `docs/primitives/polymorphic.md`
- `docs/primitives/checkbox.md`
- `docs/primitives/focus-manager.md`
- `docs/primitives/popup.md`
- `docs/primitives/select.md`
- `docs/primitives/tooltip.md`
- `docs/primitives/helper.md`

Docs can lag behind source. If documentation and source disagree, inspect `packages/*/src` and package manifests before changing code or writing new docs.

## Repository Work Rules

Use pnpm from the repository root:

```bash
pnpm install
pnpm build
pnpm build:primitives
pnpm build:kit
```

There is no dedicated root test script.

When editing this repository:

- Preserve the separation between primitives and kit.
- Keep changes narrowly scoped to the requested behavior or documentation.
- Do not rewrite unrelated formatting, imports, or generated output.
- Do not edit `dist`, `node_modules`, example app files, or unrelated dirty files unless explicitly asked.
- Do not revert user changes in the worktree.
- For docs, keep examples aligned with actual public exports and source props.

## Verification

For documentation-only changes:

```bash
git diff --check
```

Also verify that referenced docs paths exist and that public API names match `packages/*/src` exports.

Do not run `pnpm build` for docs-only changes unless needed, because builds may update generated `dist` output.

For code changes, run the narrowest relevant build command first, then broaden verification when the change affects shared behavior or public APIs.

</llm-only>
