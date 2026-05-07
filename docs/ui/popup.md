# Popup

`Popup` is the styled popup component in `@suis-ui/kit`. It wraps the primitive Popup with animated presence and styled content placement.

```tsx
import { Popup, Button, Box } from '@suis-ui/kit';

<Popup
  placement="bottom-start"
  element={<Box p="md">Popup content</Box>}
>
  <Button>Open</Button>
</Popup>
```

## Import

```tsx
import { Popup } from '@suis-ui/kit';
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `JSX.Element` | Anchor or trigger element. |
| `element` | `JSX.Element` | Popup content rendered in a portal. |
| `open` | `boolean` | When provided, controls open state externally. |
| `placement` | Floating UI `Placement` | Preferred placement. |
| `strategy` | Floating UI `Strategy` | Positioning strategy. |
| `offset` | Floating UI `OffsetOptions` | Offset middleware config. |
| `shift` | `ShiftOptions | boolean` | Enables or configures shift middleware. |
| `flip` | `FlipOptions | boolean` | Enables or configures flip middleware. |
| `autoUpdate` | `AutoUpdateOptions | boolean` | Enables or configures automatic positioning updates. |
| `middleware` | `Middleware[]` | Additional Floating UI middleware. |
| `animation` | `PopupAnimation` | Custom enter and exit animation classes. |

`Popup` also accepts Box props for the popup content wrapper.

## Trigger Behavior

If `open` is not provided, the child is used as a click trigger and toggles the popup.

If `open` is provided, the child is used as an anchor only. Update the `open` value from your own state.

```tsx
<Popup
  open={isOpen()}
  placement="right"
  element={<Box p="md">Controlled content</Box>}
>
  <Button onClick={() => setIsOpen(!isOpen())}>Toggle</Button>
</Popup>
```

## Positioning

Positioning is handled by `@floating-ui/dom`. The default `autoUpdate` behavior comes from the primitive Popup. Pass `offset`, `shift`, `flip`, and `middleware` when the popup needs collision handling or custom sizing.
