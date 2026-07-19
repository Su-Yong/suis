# Select

`Select`는 `@suis-ui/kit`의 스타일 select 컴포넌트입니다. Primitive Select, Popup, FocusManager, kit style을 하나의 컴포넌트 API 뒤에서 조합합니다.

## Usage

```tsx
import { createSignal } from 'solid-js';
import { Select } from '@suis-ui/kit';

const [value, setValue] = createSignal<string | null>(null);

<Select
  data={['Small', 'Medium', 'Large']}
  value={value()}
  onChangeValue={setValue}
  placeholder="Choose a size"
/>;
```

실제 primitive 구조는 다음처럼 볼 수 있습니다.

```text
Select
├── SelectTrigger
│   ├── SelectValue
│   └── SelectIndicator
└── SelectContent
    └── PopupPresence
        └── SelectGroup
            └── SelectItem
                └── SelectCheckIndicator
```

Kit Select는 primitive part를 직접 노출하지 않고 `data`, `*Props`, `render*` props로 커스터마이징합니다.

## Props

### Value And Data Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `data` | `SelectData[]` | 필수 | 렌더링할 option data입니다. |
| `value` | `string` 또는 `null` | `null` | 현재 선택된 option value입니다. `required`가 literal `true`이면 `null`을 허용하지 않습니다. |
| `onChangeValue` | `(value: string 또는 null) => void` | - | 선택 값이 바뀔 때 raw value를 받습니다. `required`가 literal `true`이면 callback 타입에서 `null`이 제거됩니다. |
| `onChange` | `(value: ResolvedSelectData 또는 null) => void` | - | 선택 값이 바뀔 때 resolved option을 받습니다. `required`가 literal `true`이면 callback 타입에서 `null`이 제거됩니다. |
| `required` | `boolean` | `false` | 선택된 option을 다시 눌러 해제하지 못하게 하고 trigger/listbox를 required로 표시합니다. |
| `placeholder` | `string` | - | 선택된 값이 없을 때 trigger에 표시됩니다. |
| `open` | `boolean` | - | 제공되면 popup visibility를 외부에서 제어합니다. |

`data`는 option list의 source입니다. `value`와 `onChangeValue`는 raw value 기준의 controlled 상태를 구성합니다. Resolved option object가 필요하면 `onChange`를 사용합니다. `ResolvedSelectData`는 `{ value: string; label: string; group?: string }`입니다. `required`를 literal `true`로 전달하면 `value`, `onChangeValue`, `onChange` 타입에서 `null`이 제거됩니다. `required={someBoolean}`처럼 동적 boolean을 전달하면 안전하게 nullable 타입을 유지합니다.

`open`을 boolean으로 넘기면 popup visibility가 외부 상태를 따릅니다. 이 모드에서는 trigger click이나 click-away가 open 값을 자동으로 바꾸지 않으므로 caller가 직접 상태를 갱신해야 합니다.
현재 선택된 option을 다시 선택하면 `required`가 true가 아닌 한 값이 해제됩니다. Option을 선택하면 popup은 닫힙니다.

### Positioning Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `placement` | Floating UI `Placement` | - | Popup placement입니다. |
| `strategy` | Floating UI `Strategy` | - | Popup positioning strategy입니다. |
| `offset` | Floating UI `OffsetOptions` | `4` | Trigger와 content 사이의 간격입니다. |
| `shift` | `ShiftOptions` 또는 `boolean` | - | Popup shift middleware입니다. |
| `flip` | `FlipOptions` 또는 `boolean` | `true` | Popup flip middleware입니다. |
| `autoUpdate` | `AutoUpdateOptions` 또는 `boolean` | `true` | Popup 위치 자동 갱신입니다. |
| `middleware` | `Middleware[]` | - | 추가 Floating UI middleware입니다. |

Popup positioning props는 [Popup](./popup.md)의 동작을 따릅니다. `flip`과 `offset`은 kit Select에서 기본값을 제공합니다.

### Trigger Box Mixin Props

Trigger에는 [Box](./box.md) props와 native button props를 전달할 수 있습니다. 예를 들어 `w`, `maxW`, `as`, `disabled`, `aria-*` 같은 props로 trigger element를 조정합니다.

## Styling

Select 스타일은 `component.select` theme contract에서 가져옵니다.

```ts
component.select = {
  focus: { offset, color, width },
  trigger: {
    default: { background, color, borderWidth, borderColor, borderRadius, boxShadow, paddingX, paddingY },
    hover: { background, color, borderWidth, borderColor, borderRadius, boxShadow },
    active: { background, color, borderWidth, borderColor, borderRadius, boxShadow },
  },
  indicator: {
    size,
    transition,
    transform,
  },
  content: {
    background,
    borderWidth,
    borderColor,
    borderRadius,
    boxShadow,
    padding,
  },
  group: {
    title: { font, color, paddingX, paddingY },
  },
  check: {
    size,
    color,
  },
  placeholder: {
    color,
  },
}
```

`trigger`는 닫힌 trigger button의 surface state를 제어합니다. `indicator.transform`은 open 상태에서 indicator에 적용됩니다. `content`는 popup listbox의 surface입니다. `group.title`은 grouped data의 group label에 적용됩니다. `check`는 선택된 item 오른쪽 check icon에 사용됩니다.

### Focus

`focus`는 trigger의 `:focus-visible` outline을 제어합니다. Keyboard로 select trigger에 접근했을 때 offset, color, width가 적용됩니다.

### Trigger

`trigger.default`, `trigger.hover`, `trigger.active`는 trigger button의 surface state입니다. 각 state는 background, color, border, radius, shadow, padding을 통해 trigger의 기본 모양과 상호작용 feedback을 바꿉니다.

### Indicator

`indicator.size`는 chevron 영역의 크기를 제어합니다. `indicator.transition`은 open/close 전환에 사용되고, `indicator.transform`은 open 상태에서 적용됩니다.

### Content

`content`는 popup listbox surface입니다. Background, border, radius, shadow, padding을 제어하며, 실제 높이 제한은 Floating UI `size` middleware가 계산한 available height를 사용합니다.

### Group, Check, Placeholder

`group.title`은 grouped data의 label typography, color, padding을 제어합니다. `check`는 선택된 option 오른쪽 check indicator의 size와 color를 제어합니다. `placeholder.color`는 선택 값이 없을 때 trigger text color로 적용됩니다.

## Rendering

| 이름 | 기본값 | 설명 |
| --- | --- | --- |
| `renderValue` | `(value) => value.label` | 선택된 resolved option을 trigger 안에서 렌더링합니다. |
| `renderIndicator` | `SelectIndicator` | Trigger 오른쪽 indicator를 렌더링합니다. |
| `renderContent` | `Box` | Popup content wrapper를 교체합니다. |
| `renderGroup` | `SelectGroup` | Group wrapper를 교체합니다. |
| `renderItem` | `SelectItem` | 각 option item을 교체합니다. |
| `renderCheckIndicator` | `SelectCheckIndicator` | 선택된 item의 check indicator를 교체합니다. |
| `indicatorProps` | - | API에는 있지만 현재 기본 indicator에는 forward되지 않습니다. indicator 변경은 `renderIndicator`를 사용하세요. |
| `popupProps` | - | `PopupPresence` wrapper에 전달할 props입니다. |
| `contentProps` | - | Popup content wrapper에 전달할 props입니다. |
| `groupProps` | - | Group wrapper에 전달할 props입니다. |
| `itemProps` | - | 각 item에 전달할 props입니다. |
| `checkIndicatorProps` | - | Selected-item indicator에 전달할 props입니다. |

### renderValue

`renderValue`는 trigger 안의 selected value 표시를 교체합니다. 이 함수는 `{ value, label, group? }` 형태의 resolved option을 받습니다.

### renderIndicator

`renderIndicator`는 trigger 오른쪽 indicator를 교체합니다. 현재 `indicatorProps`가 기본 indicator로 전달되지 않으므로 indicator styling이나 markup을 바꾸려면 이 함수를 사용하세요.

### renderContent

`renderContent`는 popup content wrapper를 교체합니다. `contentProps`는 이 wrapper에 전달됩니다.

### renderGroup

`renderGroup`은 grouped option wrapper를 교체합니다. `groupProps`는 각 group wrapper에 전달됩니다.

### renderItem

`renderItem`은 각 option item을 교체합니다. `itemProps`는 모든 item에 공통으로 전달됩니다.

### renderCheckIndicator

`renderCheckIndicator`는 선택된 item의 check indicator를 교체합니다. `checkIndicatorProps`는 이 indicator에 전달됩니다.

### indicatorProps

`indicatorProps`는 API에 포함되어 있지만 현재 기본 indicator에는 전달되지 않습니다. Indicator에 props를 전달해야 하는 경우에는 `renderIndicator`에서 직접 원하는 element를 렌더링하세요.

### popupProps

`popupProps`는 animated `PopupPresence` wrapper에 전달됩니다. Animation wrapper를 조정할 때 사용합니다.

### contentProps

`contentProps`는 popup content wrapper에 전달됩니다. Content wrapper의 class, style, Box props를 조정할 때 사용합니다.

### groupProps

`groupProps`는 grouped data를 렌더링할 때 각 group wrapper에 전달됩니다. Group layout이나 class를 공통으로 조정할 때 사용합니다.

### itemProps

`itemProps`는 모든 option item에 공통으로 전달됩니다. Item size, class, Box props를 일괄 적용할 때 사용합니다.

### checkIndicatorProps

`checkIndicatorProps`는 선택된 item에 렌더링되는 check indicator에 전달됩니다. Check indicator의 class, style, Box props를 조정할 때 사용합니다.

```tsx
<Select
  data={['Small', 'Medium', 'Large']}
  renderIndicator={(props) => (
    <span aria-hidden="true">{props.open ? '▲' : '▼'}</span>
  )}
/>;
```

## Data

`data`는 simple value, labeled value, grouped value를 받습니다.

```tsx
const data = [
  'Small',
  { value: 'md', label: 'Medium' },
  {
    label: 'Advanced',
    options: [
      'Large',
      { value: 'xl', label: 'Extra large' },
    ],
  },
];
```

단순 문자열은 같은 문자열을 value와 label로 사용합니다. `{ value, label }` 형태는 item label과 실제 선택 value를 분리합니다. Grouped data는 선택을 위해 flatten되고, 렌더링할 때 다시 group으로 구성됩니다.

Trigger는 기본적으로 선택된 option의 label을 표시합니다. Custom formatting이 필요하면 `renderValue`에서 resolved option을 사용하세요. 현재 `value`가 `data`의 option으로 resolve되지 않으면 trigger는 `placeholder`를 표시합니다.

```tsx
const data = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
];

<Select
  data={data}
  value={value()}
  onChangeValue={setValue}
  renderValue={(selected) => (
    selected.label
  )}
/>;
```

## Selection Behavior

Built-in item을 선택하면 popup은 항상 닫힙니다. 선택 값 변경과 callback 값은 현재 value, 선택한 item, `required`에 따라 달라집니다.

| 상황 | `onChangeValue` | `onChange` | 결과 |
| --- | --- | --- | --- |
| 다른 option 선택 | Raw `string` value | `ResolvedSelectData` | 선택한 option으로 갱신하고 popup을 닫습니다. |
| 선택된 option 재선택, `required`가 false | `null` | `null` | 선택을 해제하고 popup을 닫습니다. |
| 선택된 option 재선택, `required`가 true | 호출되지 않음 | 호출되지 않음 | 선택을 유지하고 popup만 닫습니다. |

`onChange`는 trigger의 native change event가 아니라 kit Select가 제공하는 resolved option callback입니다.

## Examples

### Basic Select

```tsx
const [value, setValue] = createSignal<string | null>(null);

<Select
  data={['Small', 'Medium', 'Large']}
  value={value()}
  onChangeValue={setValue}
  placeholder="Choose a size"
/>;
```

### Labeled Values

```tsx
const sizes = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
];

<Select
  data={sizes}
  value={value()}
  onChangeValue={setValue}
  onChange={(selected) => {
    console.log(selected?.label);
  }}
  placeholder="Choose a size"
  renderValue={(selected) => (
    selected.label
  )}
/>;
```

### Grouped Options

```tsx
<Select
  data={[
    {
      label: 'Text',
      options: [
        { value: 'title', label: 'Title' },
        { value: 'body', label: 'Body' },
      ],
    },
    {
      label: 'Display',
      options: [
        { value: 'caption', label: 'Caption' },
      ],
    },
  ]}
  value={value()}
  onChangeValue={setValue}
/>;
```

### Raw And Resolved Callbacks

```tsx
<Select
  data={[
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
  ]}
  value={value()}
  onChangeValue={(value) => {
    setValue(value);
  }}
  onChange={(selected) => {
    console.log(selected?.value, selected?.label, selected?.group);
  }}
/>;
```

### Required Select

```tsx
const [value, setValue] = createSignal('Medium');

<Select
  required
  data={['Small', 'Medium', 'Large']}
  value={value()}
  onChangeValue={setValue}
/>;
```

### Custom Item

```tsx
import { Select, SelectItem } from '@suis-ui/kit';

<Select
  data={['Small', 'Medium', 'Large']}
  itemProps={{ size: 'sm' }}
  renderItem={(props) => (
    <SelectItem
      {...props}
      bg={props.selected ? 'primary.container' : undefined}
    />
  )}
/>;
```

### Popup Positioning

```tsx
<Select
  data={['Top', 'Right', 'Bottom', 'Left']}
  value={value()}
  onChangeValue={setValue}
  placement="bottom-start"
  offset={8}
  shift
  flip
/>;
```
