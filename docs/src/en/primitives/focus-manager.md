# FocusManager

`FocusManager` installs keyboard focus behavior around a single DOM child.

```tsx
import { FocusManager } from '@suis-ui/primitives';

<FocusManager enable trap>
  <div role="dialog">
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</FocusManager>
```

## Import

```tsx
import { FocusManager } from '@suis-ui/primitives';
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `enable` | `boolean` | Enables focus behavior when true. |
| `trap` | `boolean` | Traps `Tab` navigation inside the child element. |
| `floating` | `HTMLElement[]` | Ordered floating targets for arrow-key style movement. |
| `floatingMapper` | `(move, enter, escape) => Record<string, () => void>` | Maps keyboard keys to focus actions. |
| `children` | `JSX.Element` | A single DOM element child. |

If `children` does not resolve to a DOM `Element`, `FocusManager` logs a warning and skips setup.

## Focus Trap

When `trap` is true, `Tab` and `Shift+Tab` cycle through tabbable descendants of the child element.

## Floating Focus

`floating` and `floatingMapper` work together. `floating` provides the focus targets, and `floatingMapper` maps keyboard keys to movement or activation behavior.

```tsx
const mapper = (move, enter, escape) => ({
  ArrowDown: () => move((index, max) => Math.min(index + 1, max - 1)),
  ArrowUp: () => move((index) => Math.max(index - 1, 0)),
  Enter: enter,
  Escape: escape,
});
```

The setup focuses the first target initially. Cleanup removes the document-level keydown listener.
