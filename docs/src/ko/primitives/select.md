# Select Primitive

Primitive Select는 Popup과 FocusManager를 select 전용 value context와 조합합니다.

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

권장 primitive 구조는 trigger, value, content, item을 compound component로 조합하는 형태입니다.

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

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `value` | <code>string &#124; null</code> | `null` | 현재 선택된 값입니다. |
| `onChangeValue` | <code>(value: string &#124; null) =&gt; void</code> | `-` | Context value가 바뀔 때 호출됩니다. |
| `children` | <code>JSX.Element</code> | 필수 | Select composition입니다. |

### Popup State And Positioning

`Select`는 Popup 위에 구성되므로 Popup의 state와 positioning props를 함께 받습니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `open` | <code>boolean</code> | `false` | Popup open request value입니다. |
| `placement` | <code>Placement</code> | Floating UI default | 선호 placement입니다. |
| `strategy` | <code>Strategy</code> | Floating UI default | CSS positioning strategy입니다. |
| `offset` | <code>OffsetOptions</code> | `-` | Offset middleware를 활성화합니다. |
| `shift` | <code>ShiftOptions &#124; boolean</code> | `-` | Shift middleware를 활성화합니다. |
| `flip` | <code>FlipOptions &#124; boolean</code> | `-` | Flip middleware를 활성화합니다. |
| `autoUpdate` | <code>AutoUpdateOptions &#124; boolean</code> | `true` | Layout이 바뀔 때 position을 다시 계산합니다. |
| `middleware` | <code>Middleware[]</code> | `-` | 추가 Floating UI middleware입니다. |

## Component

### `Select.Trigger`

기본값이 `button`인 polymorphic trigger를 렌더링하고 `role="combobox"`를 설정합니다. Popup trigger 동작을 사용합니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `as` | <code>T</code> | `button` | Trigger로 렌더링할 element 또는 component입니다. |
| `children` | <code>JSX.Element</code> | `-` | Trigger 안에 렌더링할 내용입니다. |
| 선택한 element props | <code>Omit&lt;ComponentProps&lt;T&gt;, 'children'&gt;</code> | `-` | Trigger element로 전달되는 props입니다. |

### `Select.Value`

Render function을 통해 현재 value를 받습니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `children` | <code>(value: string &#124; null) =&gt; JSX.Element</code> | 필수 | 현재 value를 받아 trigger 안에 표시할 내용을 반환합니다. |

```tsx
<Select.Value>
  {(value) => value ?? 'Placeholder'}
</Select.Value>
```

### `Select.Content`

Listbox를 popup portal에 렌더링합니다. 기본값은 `ul`이고, `role="listbox"`를 설정하며 popup이 열려 있는 동안 focus 동작을 설치합니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `as` | <code>T</code> | `ul` | Content로 렌더링할 element 또는 component입니다. |
| `children` | <code>JSX.Element</code> | `-` | Option item을 배치합니다. |
| 선택한 element props | <code>Omit&lt;ComponentProps&lt;T&gt;, 'children' &#124; 'style'&gt;</code> | `-` | Content element로 전달되는 props입니다. 계산된 popup style과 함께 merge됩니다. |

### `Select.Item`

기본값이 `li`인 option을 렌더링합니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `value` | <code>string</code> | 필수 | Click 시 Select context에 쓰이는 값입니다. |
| `as` | <code>T</code> | `li` | Item으로 렌더링할 element 또는 component입니다. |
| `children` | <code>JSX.Element</code> | `-` | Item label이나 custom content입니다. |
| 선택한 element props | <code>Omit&lt;ComponentProps&lt;T&gt;, 'value' &#124; 'children'&gt;</code> | `-` | Item element로 전달되는 props입니다. |

각 item은 `role="option"`, `data-value`, `aria-selected`, `tabindex={-1}`를 받습니다.

## Hooks

### `useSelect`

`useSelect`는 Select provider 아래에서 선택 value와 popup 상태를 함께 읽거나, custom item에서 value/open state를 직접 갱신할 때 사용합니다.

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

Select provider 밖에서 호출하면 context를 찾을 수 없어 error가 발생합니다.

#### Context

`context`는 Select value context와 Popup context를 merge한 값입니다.

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `context.value` | <code>string &#124; null</code> | 현재 선택된 value입니다. `value` prop이 바뀌거나 `setValue`가 호출되면 갱신됩니다. |
| `context.anchor` | <code>Element &#124; null</code> | Select trigger가 등록한 popup anchor입니다. |
| `context.element` | <code>HTMLElement &#124; null</code> | `Select.Content`가 portal에 렌더링한 listbox element입니다. |
| `context.position` | <code>ComputePositionReturn &#124; null</code> | Floating UI가 계산한 popup position입니다. |
| `context.open` | <code>boolean</code> | 가장 최근에 요청된 popup open state입니다. |
| `context.mount` | <code>boolean</code> | Content가 실제로 portal에 렌더링되는지 나타냅니다. |

Custom Select 구현에서는 위 표의 value와 popup 상태만 사용하세요.

#### Actions

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `actions.setValue` | <code>(value: string &#124; null) =&gt; void</code> | Select value를 갱신합니다. Root `Select`의 `onChangeValue`는 value 변경 effect를 통해 호출됩니다. |
| `actions.requestOpen` | <code>(open: boolean) =&gt; void</code> | Select popup의 open state를 요청합니다. |

#### Behavior

`setValue`는 value만 바꾸며 popup을 자동으로 닫지 않습니다. 선택과 동시에 content를 닫아야 하면 `setValue(value)` 다음에 `requestOpen(false)`를 함께 호출하세요.

Root `Select`에 `value` prop을 전달하면 effect가 context value를 prop 값으로 동기화합니다. Context value가 바뀌면 `onChangeValue`가 호출되므로 controlled usage에서는 외부 signal을 함께 갱신해야 합니다.

`requestOpen`은 Popup action을 그대로 사용합니다. 따라서 Select의 popup positioning, `open`, `mount`, async controller 동작은 Popup과 동일합니다.

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
