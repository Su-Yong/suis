# Select Primitive

Primitive Select는 Popup과 FocusManager를 select 전용 value context와 조합합니다.

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

`Select`는 Popup props와 다음 props를 받습니다.

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string | null` | 현재 선택된 값입니다. |
| `onChangeValue` | `(value: string | null) => void` | Context value가 바뀔 때 호출됩니다. |

## Components

### `Select.Trigger`

기본값이 `button`인 polymorphic trigger를 렌더링하고 `role="combobox"`를 설정합니다. Popup trigger 동작을 사용합니다.

### `Select.Value`

Render function을 통해 현재 value를 받습니다.

```tsx
<Select.Value>
  {(value) => value ?? 'Placeholder'}
</Select.Value>
```

### `Select.Content`

Listbox를 popup portal에 렌더링합니다. 기본값은 `ul`이고, `role="listbox"`를 설정하며 popup이 열려 있는 동안 focus 동작을 설치합니다.

### `Select.Item`

기본값이 `li`인 option을 렌더링합니다.

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string` | Click 시 Select context에 쓰이는 값입니다. |

각 item은 `role="option"`, `data-value`, `aria-selected`, `tabindex={-1}`를 받습니다.

## Hook

`useSelect`는 Select와 Popup context 및 actions를 합쳐 반환합니다.

- `setValue(value)`
- `requestOpen(open)`

Select provider 내부에서만 호출하세요.
