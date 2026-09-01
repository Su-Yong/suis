# @suis-ui/kit

> Styled SUIS components for Solid.

`@suis-ui/kit` provides ready-to-use styled components, theme APIs, and separately opt-in core, reset, and global CSS entrypoints.

## Installation

```bash
pnpm add @suis-ui/kit solid-js
```

`solid-js` is a peer dependency.

## Quick Start

Import the core stylesheet once and wrap your app with `ThemeProvider`. Add the reset and global styles when your application wants SUIS defaults:

```tsx
import '@suis-ui/kit/style.css';
import '@suis-ui/kit/reset.css';
import '@suis-ui/kit/global.css';
import { ThemeProvider } from '@suis-ui/kit';

export const App = () => (
  <ThemeProvider>
    {/* app */}
  </ThemeProvider>
);
```

`style.css` is required for kit components. `reset.css` is a minimal reset, while `global.css` applies body typography and text color. The latter two are optional; keep `style.css` first, then import either or both. The relative order of `reset.css` and `global.css` does not change their cascade because they use named layers.

## CSS Layers

The public layer names and default order are available from `@suis-ui/kit/css` as `layers` and `defaultLayerOrder`. Declare a custom order before importing SUIS CSS if application layers need to sit between them. See the [customization guide](https://su-yong.github.io/suis/customization.html) for examples.

Use kit components directly:

```tsx
import { Button } from '@suis-ui/kit';

export const SaveButton = () => (
  <Button variant="primary" size="md">
    Save
  </Button>
);
```

## Documentation

See the full documentation at [su-yong.github.io/suis](https://su-yong.github.io/suis/).

## License

MIT
