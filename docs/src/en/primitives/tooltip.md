# Tooltip Primitive

Primitive Tooltip combines Popup with pointer-enter and hover-away behavior.

## Usage

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  useTooltip,
} from '@suis-ui/primitives';
```

The recommended primitive structure combines a trigger anchor with tooltip content rendered in a portal.

```text
Tooltip
├── TooltipTrigger
│   └── HTMLElement child
└── TooltipContent
    └── Portal
        └── tooltip content
```

```tsx
<Tooltip openDelay={300} closeDelay={100} placement="top">
  <Tooltip.Trigger>
    <button type="button">Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Tooltip content
  </Tooltip.Content>
</Tooltip>
```

## Props

### Delay

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `openDelay` | <code>number</code> | `0` | Delay before opening after pointer enter. |
| `closeDelay` | <code>number</code> | `0` | Delay before closing after pointer leave. |
| `children` | <code>JSX.Element</code> | Required | Tooltip composition. |

### Popup State And Positioning

`Tooltip` is built on Popup, so it also accepts Popup state and positioning props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | <code>boolean</code> | `false` | Popup open request value. |
| `placement` | <code>Placement</code> | Floating UI default | Preferred placement. |
| `strategy` | <code>Strategy</code> | Floating UI default | CSS positioning strategy. |
| `offset` | <code>OffsetOptions</code> | `-` | Enables offset middleware. |
| `shift` | <code>ShiftOptions &#124; boolean</code> | `-` | Enables shift middleware. |
| `flip` | <code>FlipOptions &#124; boolean</code> | `-` | Enables flip middleware. |
| `autoUpdate` | <code>AutoUpdateOptions &#124; boolean</code> | `true` | Recomputes position when layout changes. |
| `middleware` | <code>Middleware[]</code> | `-` | Additional Floating UI middleware. |

## Component

### `Tooltip.Trigger`

Registers a DOM child as the popup anchor, opens after `openDelay` on pointer enter, and closes after `closeDelay` on hover away.

When the trigger registers an anchor, the anchor receives `aria-describedby` pointing to the tooltip content id.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | <code>JSX.Element</code> | `-` | DOM element registered as the trigger anchor. |

### `Tooltip.Content`

Renders popup content in a portal, applies `role="tooltip"`, and receives the generated `id`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | <code>T</code> | `div` | Element or component rendered as the content. |
| `children` | <code>JSX.Element</code> | `-` | Content rendered inside the tooltip. |
| Selected element props | <code>Omit&lt;ComponentProps&lt;T&gt;, 'children' &#124; 'style'&gt;</code> | `-` | Props forwarded to the content element. They are merged with computed popup style. |

## Hooks

### `useTooltip`

Use `useTooltip` under a Tooltip provider to read tooltip metadata, popup state, and the popup open action.

#### Signature

```ts
const [context, actions] = useTooltip();
```

```ts
const [context, actions]: readonly [
  {
    id: string;
    openDelay?: number;
    closeDelay?: number;
    anchor: Element | null;
    element: HTMLElement | null;
    position: ComputePositionReturn | null;
    open: boolean;
    mount: boolean;
  },
  {
    requestOpen: (open: boolean) => void;
  },
] = useTooltip();
```

Calling it outside a Tooltip provider fails because there is no context to read.

#### Context

`context` merges Tooltip context and Popup context.

| Name | Type | Description |
| --- | --- | --- |
| `context.id` | <code>string</code> | Unique id applied to tooltip content and referenced by the trigger's `aria-describedby`. |
| `context.openDelay` | <code>number</code> | Delay before opening after pointer enter. |
| `context.closeDelay` | <code>number</code> | Delay before closing after pointer leave. |
| `context.anchor` | <code>Element &#124; null</code> | Popup anchor registered by `Tooltip.Trigger`. |
| `context.element` | <code>HTMLElement &#124; null</code> | Tooltip element rendered by `Tooltip.Content` in the portal. |
| `context.position` | <code>ComputePositionReturn &#124; null</code> | Tooltip position computed by Floating UI. |
| `context.open` | <code>boolean</code> | Most recently requested tooltip open state. |
| `context.mount` | <code>boolean</code> | Whether tooltip content is actually rendered in the portal. |

Tooltip extensions should use only the id, delay, and popup state fields listed above.

#### Actions

| Name | Type | Description |
| --- | --- | --- |
| `actions.requestOpen` | <code>(open: boolean) =&gt; void</code> | Requests the tooltip popup open state. |

#### Behavior

The default `Tooltip.Trigger` already handles pointer enter and hover-away behavior. Use `useTooltip` when a custom trigger or content component needs to read state or directly request open state while staying inside the same tooltip context.

`openDelay` and `closeDelay` are used by the default `Tooltip.Trigger` pointer behavior. Calling `requestOpen(true)` or `requestOpen(false)` directly sends an open request immediately, without applying those delays.

`id` is applied to `Tooltip.Content` and connected from the trigger through `aria-describedby`. Custom content should keep that id to preserve the screen reader relationship.

#### Example

```tsx
const TooltipStateLabel = () => {
  const [context] = useTooltip();

  return (
    <span data-open={context.open}>
      {context.open ? 'Open' : 'Closed'}
    </span>
  );
};
```

## Examples

### Basic Tooltip

```tsx
<Tooltip placement="top" offset={6}>
  <Tooltip.Trigger>
    <button type="button">Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Tooltip content
  </Tooltip.Content>
</Tooltip>
```

### Delayed Tooltip

```tsx
<Tooltip openDelay={300} closeDelay={100} placement="right">
  <Tooltip.Trigger>
    <button type="button">Help</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Opens after a short delay.
  </Tooltip.Content>
</Tooltip>
```

### Custom Content Element

```tsx
<Tooltip placement="bottom" shift flip>
  <Tooltip.Trigger>
    <button type="button">Status</button>
  </Tooltip.Trigger>
  <Tooltip.Content as="section" aria-label="Status details">
    The job is running.
  </Tooltip.Content>
</Tooltip>
```
