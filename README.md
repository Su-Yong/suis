# SUIS

> SUIS: Solid UI System

SUIS is a SolidJS UI library split into two packages:

- `@suis-ui/kit`: styled components, theme APIs, and the SUIS CSS entrypoint.
- `@suis-ui/primitives`: behavior-focused primitives for custom component composition.

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

## Quick Start

Import the kit stylesheet once and wrap your app with `ThemeProvider`:

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
