# Select Primitive

The primitive Select composes Popup and FocusManager with select-specific value context.

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

## Import

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

## Select Props

`Select` accepts Popup props plus:

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string | null` | Current selected value. |
| `onChangeValue` | `(value: string | null) => void` | Called when the context value changes. |

## Components

### `Select.Trigger`

Renders a polymorphic trigger, defaulting to `button`, with `role="combobox"`. It uses Popup trigger behavior.

### `Select.Value`

Receives the current value through a render function:

```tsx
<Select.Value>
  {(value) => value ?? 'Placeholder'}
</Select.Value>
```

### `Select.Content`

Renders the listbox in a popup portal. It defaults to `ul`, sets `role="listbox"`, and installs focus behavior while the popup is open.

### `Select.Item`

Renders an option, defaulting to `li`.

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string` | Value written to Select context on click. |

Each item receives `role="option"`, `data-value`, `aria-selected`, and `tabindex={-1}`.

## Hook

`useSelect` returns merged Select and Popup context plus actions:

- `setValue(value)`
- `requestOpen(open)`

Call it only inside a Select provider.
