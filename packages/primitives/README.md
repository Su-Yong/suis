# @suis-ui/primitives

> Behavior-focused SUIS primitives for Solid.

`@suis-ui/primitives` provides low-level compound components, state wiring, DOM behavior, focus management, popup positioning, portals, and composition helpers.

## Installation

```bash
pnpm add @suis-ui/primitives solid-js
```

`solid-js` is a peer dependency. Primitives do not require a stylesheet.

## Quick Start

Primitive components are designed for composition:

```tsx
import { createSignal } from 'solid-js';
import { Select } from '@suis-ui/primitives';

const [value, setValue] = createSignal<string | null>(null);

export const SizeSelect = () => (
  <Select value={value()} onChangeValue={setValue} placement="bottom-start">
    <Select.Trigger>
      <Select.Value>
        {(value) => value ?? 'Choose a size'}
      </Select.Value>
    </Select.Trigger>

    <Select.Content>
      <Select.Item value="small">Small</Select.Item>
      <Select.Item value="medium">Medium</Select.Item>
      <Select.Item value="large">Large</Select.Item>
    </Select.Content>
  </Select>
);
```

## Documentation

See the full documentation at [su-yong.github.io/suis](https://su-yong.github.io/suis/).

## License

MIT
