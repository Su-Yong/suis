# FocusManager

`FocusManager` installs keyboard focus behavior around a single DOM child.

## Usage

```tsx
import { FocusManager } from '@suis-ui/primitives';
```

`FocusManager` connects focus trap or floating focus behavior to a single DOM element child.

```text
FocusManager
└── DOM element child
    └── focusable descendants
```

```tsx
<FocusManager enable trap>
  <div role="dialog">
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</FocusManager>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `enable` | <code>boolean</code> | `false` | Enables focus behavior when `true`. |
| `trap` | <code>boolean</code> | `false` | Traps `Tab` navigation inside the child element. |
| `floating` | <code>HTMLElement[]</code> | `-` | Ordered focus targets for arrow-key style movement. |
| `floatingMapper` | <code>FloatingFocusMapper</code> | `-` | Maps keyboard keys to focus actions. |
| `children` | <code>JSX.Element</code> | `-` | Single DOM element child where focus behavior is installed. |

If `children` does not resolve to a DOM `Element`, `FocusManager` logs a warning and skips setup.

## Focus Trap

When `trap` is true, `Tab` and `Shift+Tab` cycle through tabbable descendants of the child element.

Focus trap registers a document-level `keydown` listener and removes it when `FocusManager` is disposed.

## Floating Focus

`floating` and `floatingMapper` work together. `floating` provides focus targets, and `floatingMapper` maps keyboard keys to movement or activation behavior.

```tsx
const mapper = (move, enter, escape) => ({
  ArrowDown: () => move((index, max) => Math.min(index + 1, max - 1)),
  ArrowUp: () => move((index) => Math.max(index - 1, 0)),
  Enter: enter,
  Escape: escape,
});
```

Setup focuses the first target. The `Escape` action blurs the active element and restores focus to the element that was active before setup.

## Examples

### Focus Trap

```tsx
<FocusManager enable trap>
  <div role="dialog" aria-modal="true">
    <button type="button">Cancel</button>
    <button type="button">Confirm</button>
  </div>
</FocusManager>
```

### Floating List

```tsx
let first!: HTMLButtonElement;
let second!: HTMLButtonElement;

const mapper = (move, enter, escape) => ({
  ArrowDown: () => move((index, max) => Math.min(index + 1, max - 1)),
  ArrowUp: () => move((index) => Math.max(index - 1, 0)),
  Home: () => move(() => 0),
  End: () => move((_, max) => max - 1),
  Enter: enter,
  Escape: escape,
});

<FocusManager enable floating={[first, second]} floatingMapper={mapper}>
  <div role="menu">
    <button ref={first} type="button" role="menuitem">Edit</button>
    <button ref={second} type="button" role="menuitem">Delete</button>
  </div>
</FocusManager>
```
