# Tooltip Primitive

The primitive Tooltip composes Popup with pointer-enter and hover-away behavior.

```tsx
import { Tooltip } from '@suis-ui/primitives';

<Tooltip openDelay={300} closeDelay={100} placement="top">
  <Tooltip.Trigger>
    <button type="button">Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Tooltip content
  </Tooltip.Content>
</Tooltip>
```

## Import

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  useTooltip,
} from '@suis-ui/primitives';
```

## Tooltip Props

`Tooltip` accepts Popup props plus:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `openDelay` | `number` | `0` | Delay before opening after pointer enter. |
| `closeDelay` | `number` | `0` | Delay before closing after pointer leave. |

## Components

### `Tooltip.Trigger`

Registers its DOM child as the popup anchor, opens after `openDelay` on pointer enter, and closes after `closeDelay` on hover away.

While active, the anchor receives `aria-describedby` pointing to the tooltip content id.

### `Tooltip.Content`

Renders popup content in a portal, applies `role="tooltip"`, and receives a generated `id`.

## Hook

`useTooltip` returns merged Tooltip and Popup context plus Popup actions. Call it only inside a Tooltip provider.
