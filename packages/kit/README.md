# @suis-ui/kit

> Styled SUIS components for Solid.

`@suis-ui/kit` provides ready-to-use styled components, theme APIs, and the SUIS CSS entrypoint.

## Installation

```bash
pnpm add @suis-ui/kit solid-js
```

`solid-js` is a peer dependency.

## Quick Start

Import the stylesheet once and wrap your app with `ThemeProvider`:

```tsx
import '@suis-ui/kit/style.css';
import { ThemeProvider } from '@suis-ui/kit';

export const App = () => (
  <ThemeProvider>
    {/* app */}
  </ThemeProvider>
);
```

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
