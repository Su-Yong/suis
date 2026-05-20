# Popup Primitive

Primitive Popup provides popup state, anchor registration, trigger behavior, portal rendering, and Floating UI positioning.

## Usage

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

The recommended primitive structure combines an anchor or trigger with a popup element rendered in a portal.

```text
Popup
├── PopupAnchor | PopupTrigger
│   └── HTMLElement child
└── PopupElement
    └── Portal
        └── popup content
```

```tsx
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

## Props

### State And Content

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | <code>boolean</code> | `false` | Controlled open request value. Changes are reflected in popup open state. |
| `children` | <code>JSX.Element</code> | Required | Popup composition. |

### Positioning

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | <code>Placement</code> | Floating UI default | Preferred placement. |
| `strategy` | <code>Strategy</code> | Floating UI default | CSS positioning strategy. |
| `offset` | <code>OffsetOptions</code> | `-` | Enables offset middleware. |
| `shift` | <code>ShiftOptions &#124; boolean</code> | `-` | Enables shift middleware. `true` uses the default options. |
| `flip` | <code>FlipOptions &#124; boolean</code> | `-` | Enables flip middleware. `true` uses the default options. |
| `autoUpdate` | <code>AutoUpdateOptions &#124; boolean</code> | `true` | Recomputes position when layout changes. |
| `middleware` | <code>Middleware[]</code> | `-` | Additional Floating UI middleware. |

## Component

### `Popup.Anchor`

Registers a DOM child as the positioning anchor. Use it for controlled popups or custom trigger behavior.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | <code>JSX.Element</code> | Required | Single DOM element registered as the anchor. |

If the child is not a DOM `Element`, it logs a warning.

### `Popup.Trigger`

Wraps `Popup.Anchor` and toggles the popup when the anchor is clicked.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | <code>JSX.Element</code> | `-` | DOM element registered as the trigger anchor. |

### `Popup.Element`

Renders mounted popup content in a portal. The child is a render function that receives the computed style accessor.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | <code>(style: Accessor&lt;JSX.CSSProperties&gt;) =&gt; JSX.Element</code> | Required | Function that renders popup content. The first returned DOM element is registered as the popup element. |

```tsx
<Popup.Element>
  {(style) => <div style={style()}>Content</div>}
</Popup.Element>
```

## Hooks

### `usePopup`

Use `usePopup` under a Popup provider to read popup state and request open-state changes. It is intended for custom triggers, close buttons, or content components rendered inside `Popup`.

#### Signature

```ts
const [context, actions] = usePopup();
```

```ts
const [context, actions]: readonly [
  {
    anchor: Element | null;
    element: HTMLElement | null;
    position: ComputePositionReturn | null;
    open: boolean;
    mount: boolean;
  },
  {
    requestOpen: (open: boolean) => void;
  },
] = usePopup();
```

Calling it outside a Popup provider fails because there is no context to read.

#### Context

| Name | Type | Description |
| --- | --- | --- |
| `context.anchor` | <code>Element &#124; null</code> | Positioning reference element registered by `Popup.Anchor` or `Popup.Trigger`. |
| `context.element` | <code>HTMLElement &#124; null</code> | First DOM element rendered inside `Popup.Element`. |
| `context.position` | <code>ComputePositionReturn &#124; null</code> | Floating UI result with `x`, `y`, `placement`, `strategy`, and middleware data. It is `null` before position is computed. |
| `context.open` | <code>boolean</code> | Most recently requested open state. It updates immediately when `requestOpen` is called. |
| `context.mount` | <code>boolean</code> | Mount state that controls whether `Popup.Element` renders portal content. If a controller is registered, this updates from the controller result. |

Public customization code should depend only on the state fields listed above.

#### Actions

| Name | Type | Description |
| --- | --- | --- |
| `actions.requestOpen` | <code>(open: boolean) =&gt; void</code> | Requests popup open state. Each request increments an id so stale async controller results cannot overwrite newer requests. |

#### Behavior

`open` is the intended state, while `mount` is the actual rendering state. A controller can delay `mount` updates when a close request should keep the DOM mounted briefly for animation.

`position` is computed after `mount` is true and both anchor and popup element are registered. Custom content that reads position should handle `null`.

`requestOpen(false)` requests closing, but it does not install document click-away or hover-away listeners by itself. Wire outside click, hover away, or custom dismissal behavior by calling `requestOpen(false)` from `createClickAway`, `createHoverAway`, or your own event handler.

#### Example

```tsx
const CloseButton = () => {
  const [, { requestOpen }] = usePopup();

  return (
    <button type="button" onClick={() => requestOpen(false)}>
      Close
    </button>
  );
};
```

### `createPopupController`

Use `createPopupController` under a Popup provider to put an async controller between open requests and the actual mount state. It is useful for enter and exit animation where content should stay mounted briefly after a close request.

#### Signature

```ts
createPopupController(controller: (open: boolean) => Promise<boolean>): void;
```

#### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `controller` | <code>(open: boolean) =&gt; Promise&lt;boolean&gt;</code> | Runs when `requestOpen(open)` is called. The resolved boolean becomes the next `mount` state. |

#### Behavior

Call it under a Popup provider. Without a controller, `mount` follows the requested `open` value.

The controller receives the requested open state. Resolving `true` mounts `Popup.Element`; resolving `false` unmounts it.

If multiple open requests happen quickly, only the latest request is applied. Older Promises that resolve later cannot overwrite the latest `mount` state.

#### Example

```tsx
const AnimatedMount = () => {
  createPopupController(async (open) => {
    if (open) return true;

    await new Promise((resolve) => window.setTimeout(resolve, 150));
    return false;
  });

  return null;
};
```

### `createClickAway`

`createClickAway` runs a dismissal handler when a document click happens outside the target element.

#### Signature

```ts
const register = createClickAway(
  onClickAway: (cleanUp: () => void) => void,
);

const cleanUp = register(
  element: Element | null | undefined | Accessor<Element | null | undefined>,
);
```

#### Parameters And Return

| Name | Type | Description |
| --- | --- | --- |
| `onClickAway` | <code>(cleanUp: () =&gt; void) =&gt; void</code> | Called when a click happens outside the target. Receives `cleanUp` so the listener can be removed. |
| `element` | <code>Element &#124; null &#124; undefined &#124; Accessor&lt;Element &#124; null &#124; undefined&gt;</code> | Target used for click-away detection. If an accessor is passed, the latest target is resolved for each click event. |
| `cleanUp` | <code>() =&gt; void</code> | Removes the registered document click listener. Returns a no-op cleanup if there is no target. |

#### Behavior

If there is no target at registration time, no listener is installed and a no-op cleanup is returned. If there is a target, a document click listener is installed. `onClickAway(cleanUp)` runs when the click event's composed path does not include the target.

Call cleanup when the owner component is disposed. If a single outside click should close the popup and remove the listener, call the provided `cleanUp` inside `onClickAway`.

#### Example

```tsx
const ClickAwayCloser = () => {
  const [context, { requestOpen }] = usePopup();
  const register = createClickAway((cleanUp) => {
    requestOpen(false);
    cleanUp();
  });

  createEffect(() => {
    if (!context.element) return;

    const cleanUp = register(() => context.element);
    onCleanup(cleanUp);
  });

  return null;
};
```

### `createHoverAway`

`createHoverAway` runs a dismissal handler after the pointer leaves the target and does not re-enter.

#### Signature

```ts
const register = createHoverAway(
  onHoverAway: (cleanUp: () => void) => void,
);

const cleanUp = register(
  element: Element | null | undefined | Accessor<Element | null | undefined>,
  options?: { delay?: number },
);
```

#### Parameters And Return

| Name | Type | Description |
| --- | --- | --- |
| `onHoverAway` | <code>(cleanUp: () =&gt; void) =&gt; void</code> | Called when the pointer leaves the target and does not re-enter before the delay ends. Receives `cleanUp` so listeners can be removed. |
| `element` | <code>Element &#124; null &#124; undefined &#124; Accessor&lt;Element &#124; null &#124; undefined&gt;</code> | Target used for hover-away detection. |
| `options.delay` | <code>number</code> | Time to wait after `pointerleave` before running the handler. Default is `0`. |
| `cleanUp` | <code>() =&gt; void</code> | Removes the `pointerleave` and `pointerenter` listeners registered on the target. Returns a no-op cleanup if there is no target. |

#### Behavior

If there is no target at registration time, no listener is installed and a no-op cleanup is returned. If there is a target, `pointerleave` starts a delay timer, and `pointerenter` before the delay ends cancels the timer.

`onHoverAway(cleanUp)` runs after the delay. For tooltip-like dismissal, call both `requestOpen(false)` and `cleanUp()` inside the handler.

#### Example

```tsx
const HoverAwayCloser = () => {
  const [context, { requestOpen }] = usePopup();
  const register = createHoverAway((cleanUp) => {
    requestOpen(false);
    cleanUp();
  });

  createEffect(() => {
    if (!context.anchor) return;

    const cleanUp = register(() => context.anchor, { delay: 120 });
    onCleanup(cleanUp);
  });

  return null;
};
```

## Examples

### Basic Trigger

```tsx
<Popup placement="bottom-start" offset={4}>
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

### Custom Anchor

```tsx
const ManualTrigger = () => {
  const [, { requestOpen }] = usePopup();

  return (
    <Popup.Anchor>
      <button type="button" onClick={() => requestOpen(true)}>
        Open manually
      </button>
    </Popup.Anchor>
  );
};

<Popup placement="right" shift>
  <ManualTrigger />
  <Popup.Element>
    {(style) => <div style={style()}>Manual popup</div>}
  </Popup.Element>
</Popup>
```

### Positioning Middleware

```tsx
<Popup
  placement="top-start"
  offset={8}
  shift
  flip
  autoUpdate={{ animationFrame: true }}
>
  <Popup.Trigger>
    <button type="button">Open</button>
  </Popup.Trigger>
  <Popup.Element>
    {(style) => <div style={style()}>Positioned popup</div>}
  </Popup.Element>
</Popup>
```
