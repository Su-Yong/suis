# Popup Primitive

The primitive Popup provides popup state, anchor registration, trigger behavior, portal rendering, and Floating UI positioning.

```tsx
import { Popup } from '@suis-ui/primitives';

<Popup placement="bottom-start" offset={4} flip>
  <Popup.Trigger>
    <button type="button">Open</button>
  </Popup.Trigger>
  <Popup.Element>
    {(style) => (
      <div style={style()}>
        Popup content
      </div>
    )}
  </Popup.Element>
</Popup>
```

## Import

```tsx
import {
  Popup,
  PopupAnchor,
  PopupTrigger,
  PopupElement,
  usePopup,
  createPopupController,
  createClickAway,
  createHoverAway,
} from '@suis-ui/primitives';
```

## Popup Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Controlled open request value. |
| `placement` | Floating UI `Placement` | Floating UI default | Preferred placement. |
| `strategy` | Floating UI `Strategy` | Floating UI default | CSS positioning strategy. |
| `offset` | `OffsetOptions` | none | Enables offset middleware. |
| `shift` | `ShiftOptions | boolean` | none | Enables shift middleware. |
| `flip` | `FlipOptions | boolean` | none | Enables flip middleware. |
| `autoUpdate` | `AutoUpdateOptions | boolean` | `true` | Recomputes position when layout changes. |
| `middleware` | `Middleware[]` | none | Additional Floating UI middleware. |
| `children` | `JSX.Element` | required | Popup composition. |

## Components

### `Popup.Anchor`

Registers its DOM child as the positioning anchor. Use it for controlled popups or custom trigger behavior.

### `Popup.Trigger`

Wraps `Popup.Anchor` and toggles the popup when the anchor is clicked.

### `Popup.Element`

Renders mounted popup content in a portal. Its child is a render function that receives an accessor for the computed style:

```tsx
<Popup.Element>
  {(style) => <div style={style()}>Content</div>}
</Popup.Element>
```

## State Hooks

`usePopup` returns `[context, actions]`.

The context includes `anchor`, `element`, `position`, `open`, and `mount`. The action object includes `requestOpen(open)`.

`createPopupController(controller)` registers an async controller. The controller receives the requested open state and returns whether the popup should be mounted. Kit uses this for enter and exit animations.

## Away Helpers

`createClickAway(onClickAway)` registers a document click listener and calls `onClickAway(cleanUp)` when a click happens outside the target.

`createHoverAway(onHoverAway)` registers `pointerleave` and `pointerenter` listeners on a target. It calls `onHoverAway(cleanUp)` after the optional delay unless pointer enters again.

Both helpers return cleanup functions. Always call cleanup when the owning component is disposed.
