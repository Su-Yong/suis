# Select Primitive

Primitive Select combines Popup and FocusManager with select-specific value context.

## Usage

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  useSelect,
} from '@suis-ui/primitives';
```

The recommended primitive structure composes trigger, value, content, and item as compound components.

```text
Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    └── SelectItem
```

```tsx
import { createSignal } from 'solid-js';
import { Select } from '@suis-ui/primitives';

const [value, setValue] = createSignal<string | null>(null);

<Select value={value()} onChangeValue={setValue} placement="bottom-start">
  <Select.Trigger>
    <Select.Value>
      {(value) => value ?? 'Choose an option'}
    </Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="small">Small</Select.Item>
    <Select.Item value="large">Large</Select.Item>
  </Select.Content>
</Select>
```

## Props

### Value

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | <code>string &#124; null</code> | `null` | Current selected value. |
| `onChangeValue` | <code>(value: string &#124; null) =&gt; void</code> | `-` | Called when the context value changes. |
| `children` | <code>JSX.Element</code> | Required | Select composition. |

### Popup State And Positioning

`Select` is built on Popup, so it also accepts Popup state and positioning props.

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

### `Select.Trigger`

Renders a polymorphic trigger with default `button` and sets `role="combobox"`. It uses Popup trigger behavior.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | <code>T</code> | `button` | Element or component rendered as the trigger. |
| `children` | <code>JSX.Element</code> | `-` | Content rendered inside the trigger. |
| Selected element props | <code>Omit&lt;ComponentProps&lt;T&gt;, 'children'&gt;</code> | `-` | Props forwarded to the trigger element. |

### `Select.Value`

Receives the current value through a render function.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | <code>(value: string &#124; null) =&gt; JSX.Element</code> | Required | Receives the current value and returns content displayed inside the trigger. |

```tsx
<Select.Value>
  {(value) => value ?? 'Placeholder'}
</Select.Value>
```

### `Select.Content`

Renders the listbox in a popup portal. The default element is `ul`, it sets `role="listbox"`, and it installs focus behavior while the popup is open.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | <code>T</code> | `ul` | Element or component rendered as the content. |
| `children` | <code>JSX.Element</code> | `-` | Option items. |
| Selected element props | <code>Omit&lt;ComponentProps&lt;T&gt;, 'children' &#124; 'style'&gt;</code> | `-` | Props forwarded to the content element. They are merged with computed popup style. |

### `Select.Item`

Renders an option with default `li`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | <code>string</code> | Required | Value written to Select context when clicked. |
| `as` | <code>T</code> | `li` | Element or component rendered as the item. |
| `children` | <code>JSX.Element</code> | `-` | Item label or custom content. |
| Selected element props | <code>Omit&lt;ComponentProps&lt;T&gt;, 'value' &#124; 'children'&gt;</code> | `-` | Props forwarded to the item element. |

Each item receives `role="option"`, `data-value`, `aria-selected`, and `tabindex={-1}`.

## Hooks

### `useSelect`

Use `useSelect` under a Select provider to read the selected value and popup state, or to update value/open state from custom items and supporting controls.

#### Signature

```ts
const [context, actions] = useSelect();
```

```ts
const [context, actions]: readonly [
  {
    value: string | null;
    anchor: Element | null;
    element: HTMLElement | null;
    position: ComputePositionReturn | null;
    open: boolean;
    mount: boolean;
  },
  {
    setValue: (value: string | null) => void;
    requestOpen: (open: boolean) => void;
  },
] = useSelect();
```

Calling it outside a Select provider fails because there is no context to read.

#### Context

`context` merges Select value context and Popup context.

| Name | Type | Description |
| --- | --- | --- |
| `context.value` | <code>string &#124; null</code> | Current selected value. It updates when the `value` prop changes or when `setValue` is called. |
| `context.anchor` | <code>Element &#124; null</code> | Popup anchor registered by the Select trigger. |
| `context.element` | <code>HTMLElement &#124; null</code> | Listbox element rendered by `Select.Content` in the portal. |
| `context.position` | <code>ComputePositionReturn &#124; null</code> | Popup position computed by Floating UI. |
| `context.open` | <code>boolean</code> | Most recently requested popup open state. |
| `context.mount` | <code>boolean</code> | Whether content is actually rendered in the portal. |

Custom Select code should use only the value and popup state fields listed above.

#### Actions

| Name | Type | Description |
| --- | --- | --- |
| `actions.setValue` | <code>(value: string &#124; null) =&gt; void</code> | Updates the Select value. Root `Select` calls `onChangeValue` through its value-change effect. |
| `actions.requestOpen` | <code>(open: boolean) =&gt; void</code> | Requests the Select popup open state. |

#### Behavior

`setValue` only updates the value; it does not close the popup automatically. If selection should also close the content, call `requestOpen(false)` after `setValue(value)`.

When root `Select` receives a `value` prop, an effect syncs context value from that prop. When context value changes, `onChangeValue` is called, so controlled usage must update the external signal as well.

`requestOpen` is the Popup action. Select popup positioning, `open`, `mount`, and async controller behavior are the same as Popup.

#### Example

```tsx
const CustomItem = (props: { value: string; children: JSX.Element }) => {
  const [, { setValue, requestOpen }] = useSelect();

  return (
    <button
      type="button"
      onClick={() => {
        setValue(props.value);
        requestOpen(false);
      }}
    >
      {props.children}
    </button>
  );
};
```

## Examples

### Basic Select

```tsx
<Select placement="bottom-start">
  <Select.Trigger>
    <Select.Value>
      {(value) => value ?? 'Choose size'}
    </Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="small">Small</Select.Item>
    <Select.Item value="medium">Medium</Select.Item>
    <Select.Item value="large">Large</Select.Item>
  </Select.Content>
</Select>
```

### Controlled Value

```tsx
import { createSignal } from 'solid-js';

const [value, setValue] = createSignal<string | null>('medium');

<Select value={value()} onChangeValue={setValue}>
  <Select.Trigger>
    <Select.Value>
      {(value) => value ?? 'Choose size'}
    </Select.Value>
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="small">Small</Select.Item>
    <Select.Item value="medium">Medium</Select.Item>
    <Select.Item value="large">Large</Select.Item>
  </Select.Content>
</Select>
```

### Polymorphic Parts

```tsx
<Select offset={6} shift flip>
  <Select.Trigger as="button" type="button">
    <Select.Value>
      {(value) => value ?? 'Choose status'}
    </Select.Value>
  </Select.Trigger>
  <Select.Content as="div">
    <Select.Item as="button" type="button" value="open">
      Open
    </Select.Item>
    <Select.Item as="button" type="button" value="closed">
      Closed
    </Select.Item>
  </Select.Content>
</Select>
```
