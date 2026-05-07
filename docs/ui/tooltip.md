# Tooltip

`Tooltip` is the styled tooltip component in `@suis-ui/kit`. It wraps the primitive Tooltip with styled content, animated presence, and an optional arrow.

```tsx
import { Tooltip, Button } from '@suis-ui/kit';

<Tooltip content="Delete item" withArrow>
  <Button aria-label="Delete">Delete</Button>
</Tooltip>
```

## Import

```tsx
import { Tooltip } from '@suis-ui/kit';
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `content` | `JSX.Element` | Tooltip content. Required. |
| `withArrow` | `boolean` | Renders the default arrow when true. |
| `renderArrow` | `(props) => JSX.Element` | Custom arrow renderer. |
| `openDelay` | `number` | Delay before opening on pointer enter. |
| `closeDelay` | `number` | Delay before closing after pointer leave. |
| `placement` | Floating UI `Placement` | Preferred placement. |
| `strategy` | Floating UI `Strategy` | Positioning strategy. |
| `offset` | Floating UI `OffsetOptions` | Offset middleware config. |
| `shift` | `ShiftOptions | boolean` | Enables or configures shift middleware. |
| `flip` | `FlipOptions | boolean` | Enables or configures flip middleware. |
| `autoUpdate` | `AutoUpdateOptions | boolean` | Enables or configures automatic positioning updates. |
| `middleware` | `Middleware[]` | Additional Floating UI middleware. |

`Tooltip` also accepts Box props for the content element.

## Defaults

- `flip` defaults to `true`.
- `offset` defaults to `4`.
- `openDelay` and `closeDelay` default to `0`.

The trigger receives `aria-describedby` while the tooltip behavior is active.
