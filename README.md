# SUIS
> SUIS: Solid UI System

SUIS split into two packages:

- `@suis-ui/kit` provides styled components, theme APIs, and the SUIS CSS entrypoint.
- `@suis-ui/primitives` provides behavior-focused primitives for custom component composition.

Use the kit when you want ready-to-use UI components. Use primitives when you want to own the markup and styling while reusing SUIS behavior, focus handling, popup behavior, and accessibility wiring.

## Installation

Install the styled component kit:

```bash
pnpm add @suis-ui/kit solid-js
```

Install primitives directly when building custom components:

```bash
pnpm add @suis-ui/primitives solid-js
```

`solid-js` is a peer dependency of both packages.

> SUIS is built with vanilla-extract. When you build application styles or custom components around SUIS, we recommend using vanilla-extract together so you can consume exported `component`, `vars`, and `token` values from `.css.ts` files.
> 
> ```bash
> pnpm add @vanilla-extract/css
> pnpm add -D @vanilla-extract/vite-plugin
> ```

## Quick Start

**Import the kit stylesheet** once in your application and wrap your app with `ThemeProvider`:

```tsx
import '@suis-ui/kit/style.css';
import { ThemeProvider } from '@suis-ui/kit';

export const App = () => (
  <ThemeProvider>
    {/* app */}
  </ThemeProvider>
);
```

Then use kit components directly:

```tsx
import { createSignal } from 'solid-js';
import { Button, Select } from '@suis-ui/kit';

const [size, setSize] = createSignal<string | null>(null);

export const Form = () => (
  <>
    <Select
      data={['Small', 'Medium', 'Large']}
      value={size()}
      onChangeValue={setSize}
      placeholder="Choose a size"
    />

    <Button variant="primary" size="md">
      Save
    </Button>
  </>
);
```

## Packages

| Package | Use it for |
| --- | --- |
| `@suis-ui/kit` | Styled components, theme APIs, vanilla-extract styles, semantic tokens, component tokens, and the CSS entrypoint. |
| `@suis-ui/primitives` | Compound components, state wiring, DOM behavior, focus management, popup positioning, portals, and composition helpers. |

## Docs

- [Introduction](./docs/introduction.md)
- [Design Principles](./docs/design-principles.md)
- [Customization](./docs/customization.md)
- [Full table of contents](./docs/table-of-contents.md)

### Customization

`@suis-ui/kit` exports theme values in three layers. Prefer the most specific layer that fits the job:

| Priority | Export | Purpose |
| --- | --- | --- |
| 1 | `component` | Component-specific values for SUIS components. |
| 2 | `vars` | Semantic tokens for app surfaces, colors, fonts, shadows, spacing, and line sizes. |
| 3 | `token` | Raw design values for exceptional details. |

```tsx
import { component, vars, token } from '@suis-ui/kit';
```

Use those exports from vanilla-extract styles when building app-specific surfaces:

```ts
import { style } from '@vanilla-extract/css';
import { vars } from '@suis-ui/kit';

export const panel = style({
  background: vars.color.surface.main,
  color: vars.color.text.main,
  padding: vars.space.md,
});
```

Kit components that manage internal primitive structure expose customization through documented `*Props` and `render*` props. For example, kit `Select` supports `itemProps`, `renderItem`, `renderValue`, and related props so you can customize internal parts without rebuilding the primitive composition.

See [Customization](./docs/customization.md) and [Design Principles](./docs/design-principles.md) for the full model.

### `@suis-ui/kit`

- [Box](./docs/ui/box.md)
- [Button](./docs/ui/button.md)
- [CheckBox](./docs/ui/checkbox.md)
- [Input](./docs/ui/input.md)
- [Item](./docs/ui/item.md)
- [Popup](./docs/ui/popup.md)
- [Select](./docs/ui/select.md)
- [Tooltip](./docs/ui/tooltip.md)

### `@suis-ui/primitives`

- [Polymorphic](./docs/primitives/polymorphic.md)
- [CheckBox](./docs/primitives/checkbox.md)
- [FocusManager](./docs/primitives/focus-manager.md)
- [Popup](./docs/primitives/popup.md)
- [Select](./docs/primitives/select.md)
- [Tooltip](./docs/primitives/tooltip.md)
- [Helpers](./docs/primitives/helper.md)

## Development

This repository is a pnpm workspace.

```bash
pnpm install
pnpm build
```

Run the example apps:

```bash
pnpm example:kit
pnpm example:primitives
```

Build individual packages:

```bash
pnpm build:kit
pnpm build:primitives
```

## License

MIT
