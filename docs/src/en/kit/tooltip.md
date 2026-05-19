# Tooltip

`Tooltip` is the styled tooltip component in `@suis-ui/kit`. It wraps the primitive Tooltip with styled content, animated presence, and an optional arrow.

## Usage

```tsx
import { Tooltip, Button } from '@suis-ui/kit';

<Tooltip content="Delete item" withArrow>
  <Button aria-label="Delete">Delete</Button>
</Tooltip>
```

The actual primitive structure can be read as a lightweight tree:

```text
Tooltip
├── TooltipTrigger
└── TooltipContent
    └── PopupPresence
        ├── TooltipArrow
        └── Content
```

The primitive tooltip behavior opens on hover/focus. While open, the trigger receives `aria-describedby`.

## Props

### Content And Delay Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `JSX.Element` | required | Tooltip trigger element. |
| `content` | `JSX.Element` | required | Tooltip content. |
| `withArrow` | `boolean` or `number` | - | Renders an arrow. A number is passed as Floating UI arrow padding. |
| `openDelay` | `number` | `0` | Delay before opening after pointer/focus enter. |
| `closeDelay` | `number` | `0` | Delay before closing after pointer/focus leave. |

`children` is the tooltip trigger, and `content` is the floating content. Delay props are passed to primitive Tooltip trigger behavior.

### Positioning Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | Floating UI `Placement` | - | Preferred placement. |
| `strategy` | Floating UI `Strategy` | - | Positioning strategy. |
| `offset` | Floating UI `OffsetOptions` | `4` | Gap between trigger and tooltip. |
| `shift` | `ShiftOptions` or `boolean` | - | Tooltip shift middleware. |
| `flip` | `FlipOptions` or `boolean` | `true` | Tooltip flip middleware. |
| `autoUpdate` | `AutoUpdateOptions` or `boolean` | `true` | Automatic tooltip position updates. |
| `middleware` | `Middleware[]` | - | Additional Floating UI middleware. |

`Tooltip` does not expose controlled `open` as a public usage path. Open and close behavior is managed by the primitive tooltip trigger.

### Box Mixin Props

`Tooltip` accepts [Box](./box.md) props for the content wrapper. Use props such as `bg`, `c`, `r`, `shadow`, and `p` to adjust a single tooltip surface.

## Styling

Tooltip styles read from the `component.tooltip` theme contract.

```ts
component.tooltip = {
  content: {
    font,
    background,
    color,
    boxShadow,
    borderRadius,
    paddingX,
    paddingY,
  },
  arrow: {
    size,
  },
}
```

`content` controls tooltip typography, background, text color, shadow, radius, and padding. `arrow.size` controls the default arrow width and height. The arrow background matches the tooltip content background.

Animation timing uses `component.popup.enter` and `component.popup.exit`.

### Content

`content.font` controls tooltip text typography. `content.background`, `content.color`, `content.boxShadow`, `content.borderRadius`, `content.paddingX`, and `content.paddingY` make up the tooltip surface.

### Arrow

`arrow.size` applies to the default arrow width and height. The arrow background follows the tooltip content background, so changing content background keeps the arrow visually attached to the same surface.

### Animation

Tooltip animation uses `component.popup.enter` and `component.popup.exit` timing rather than a separate `component.tooltip` timing token. Placement-based transforms make the tooltip appear from the trigger direction.

## Rendering

| Name | Default | Description |
| --- | --- | --- |
| `renderArrow` | `TooltipArrow` | Replaces the arrow element. |

### renderArrow

Use `renderArrow` to replace the default rotated-square arrow element.

## Arrow

When `withArrow` is truthy, Tooltip adds Floating UI `arrow` middleware. If `withArrow` is a number, that number becomes arrow padding. If it is `true`, padding `4` is used.

## Examples

### Basic Tooltip

```tsx
<Tooltip content="Delete item">
  <Button>Delete</Button>
</Tooltip>
```

### With Arrow

```tsx
<Tooltip content="Saved automatically" withArrow>
  <Button variant="secondary">Status</Button>
</Tooltip>
```

### Delayed Tooltip

```tsx
<Tooltip
  content="This action cannot be undone"
  openDelay={300}
  closeDelay={100}
  placement="top"
>
  <Button variant="ghost">Archive</Button>
</Tooltip>
```

### Styled Content

```tsx
<Tooltip
  content="Keyboard shortcut: Cmd+K"
  withArrow
  bg="surface.higher"
  c="surface.contrast"
  r="md"
  shadow="lg"
>
  <Button>Command menu</Button>
</Tooltip>
```

### Custom Arrow

```tsx
<Tooltip
  content="Custom arrow"
  withArrow={8}
  renderArrow={(props) => (
    <span {...props} class="my-tooltip-arrow" />
  )}
>
  <Button>Hover</Button>
</Tooltip>
```
