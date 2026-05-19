# Popup

`Popup` is the styled popup component in `@suis-ui/kit`. It wraps the primitive Popup with animated presence and a content wrapper, while positioning is controlled by `@floating-ui/dom` props.

## Usage

```tsx
import { Popup, Button, Box } from '@suis-ui/kit';

<Popup
  placement="bottom-start"
  element={<Box p="md">Popup content</Box>}
>
  <Button>Open</Button>
</Popup>
```

The actual primitive structure can be read as a lightweight tree:

```text
Popup
├── PopupTrigger | PopupAnchor
└── PopupElement
    └── PopupPresence
        └── Element
```

When `open` is provided as a `boolean`, the child is rendered as an anchor instead of a trigger. In that mode, click toggling is not wired automatically; update the state from the child element yourself.

## Props

### Content And State Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `JSX.Element` | required | Anchor or trigger element. |
| `element` | `JSX.Element` | required | Element rendered inside the popup content. |
| `open` | `boolean` | - | Controls open state externally when provided. |
| `animation` | enter/exit class map | default scale/fade animation | Custom enter/exit animation classes. |

`children` is the positioning reference. `element` is the popup body. Without `open`, Popup uses an uncontrolled trigger. With `open`, Popup uses a controlled anchor.

### Positioning Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | Floating UI `Placement` | - | Preferred placement. |
| `strategy` | Floating UI `Strategy` | - | Positioning strategy. |
| `offset` | Floating UI `OffsetOptions` | - | Offset middleware config. |
| `shift` | `ShiftOptions` or `boolean` | - | Enables or configures shift middleware. |
| `flip` | `FlipOptions` or `boolean` | - | Enables or configures flip middleware. |
| `autoUpdate` | `AutoUpdateOptions` or `boolean` | `true` | Updates position on scroll, resize, and layout changes. |
| `middleware` | `Middleware[]` | - | Additional Floating UI middleware. |

Positioning props are passed through primitive [Popup](../primitives/popup.md) and Floating UI middleware. Combine `shift`, `flip`, and custom `middleware` for collision handling.

### Box Mixin Props

`Popup` accepts [Box](./box.md) props for the content wrapper. Visual surface styling such as `p`, `bg`, `r`, and `shadow` usually belongs on a `Box` inside `element`, or on Box props passed to `Popup`.

## Styling

Popup animation timing reads from the `component.popup` theme contract.

```ts
component.popup = {
  enter: {
    duration,
    easing,
  },
  exit: {
    duration,
    easing,
  },
}
```

The default popup animation uses opacity and scale. Transform origin is based on CSS variables resolved from the actual placement, so placements such as `top`, `bottom-start`, and `right` animate from the matching side.

Popup content background, padding, radius, and shadow are not separate Popup tokens. Set them through the provided `element` or Box props on the content wrapper.

### Enter

`enter.duration` and `enter.easing` control animation timing while the popup opens. The default animation uses opacity and scale, with transform origin calculated from placement.

### Exit

`exit.duration` and `exit.easing` control animation timing while the popup closes. During exit, pointer events are disabled to avoid interactions while the popup is leaving.

## Trigger Behavior

In uncontrolled mode, `children` is wrapped with `PrimitivePopup.Trigger` and click toggles the popup.

```tsx
<Popup element={<Box p="md">Menu</Box>}>
  <Button>Open menu</Button>
</Popup>
```

In controlled mode, `children` is wrapped with `PrimitivePopup.Anchor`. Only the `open` value is controlled, so write the trigger event yourself.

```tsx
import { createSignal } from 'solid-js';
import { Popup, Button, Box } from '@suis-ui/kit';

const [open, setOpen] = createSignal(false);

<Popup
  open={open()}
  placement="right"
  element={<Box p="md">Controlled content</Box>}
>
  <Button onClick={() => setOpen(!open())}>Toggle</Button>
</Popup>
```

## Examples

### Basic Popup

```tsx
<Popup
  element={
    <Box p="md" bg="surface.main" r="md" shadow="md">
      Popup content
    </Box>
  }
>
  <Button>Open</Button>
</Popup>
```

### Placement And Offset

```tsx
<Popup
  placement="bottom-start"
  offset={8}
  shift
  flip
  element={<Box p="md" bg="surface.main" r="md">Actions</Box>}
>
  <Button variant="secondary">More</Button>
</Popup>
```

### Styled Wrapper

```tsx
<Popup
  p="xs"
  bg="surface.main"
  r="lg"
  shadow="xl"
  element={
    <Box gap="xs">
      <Button variant="ghost">Rename</Button>
      <Button variant="ghost">Archive</Button>
    </Box>
  }
>
  <Button>Open menu</Button>
</Popup>
```

### Controlled Popup

```tsx
const [open, setOpen] = createSignal(false);

<Popup
  open={open()}
  placement="top"
  element={<Box p="md">Saved</Box>}
>
  <Button onClick={() => setOpen(!open())}>
    Toggle feedback
  </Button>
</Popup>
```
