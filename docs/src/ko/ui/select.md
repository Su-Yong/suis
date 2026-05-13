# Select

`Select`는 `@suis-ui/kit`의 스타일 select 컴포넌트입니다. Primitive Select, Popup, FocusManager, kit style을 하나의 컴포넌트 API 뒤에서 조합합니다.

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

## Import

```tsx
import { Select } from '@suis-ui/kit';
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

단순 문자열은 같은 문자열을 value와 label로 사용합니다. Grouped data는 선택을 위해 flatten되고, 렌더링할 때 다시 group으로 구성됩니다.

Primitive Select는 `Select.Trigger`, `Select.Value`, `Select.Content`, `Select.Item`으로 직접 조립합니다. Kit Select는 그 구조를 소유하고 `*Props`와 `render*` props로 커스터마이징을 노출합니다.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `data` | `SelectData[]` | 필수 option data입니다. |
| `value` | `string | null` | 현재 선택된 값입니다. |
| `onChangeValue` | `(value: string | null) => void` | 선택 값이 바뀔 때 호출됩니다. |
| `placeholder` | `string` | 선택된 값이 없을 때 표시되는 text입니다. |
| `renderValue` | `(value: T) => JSX.Element` | Custom selected value renderer입니다. |
| `renderIndicator` | `(props) => JSX.Element` | Custom trigger indicator입니다. |
| `renderContent` | `(props) => JSX.Element` | Custom popup content wrapper입니다. |
| `renderGroup` | `(props) => JSX.Element` | Custom group wrapper입니다. |
| `renderItem` | `(props) => JSX.Element` | Custom item wrapper입니다. |
| `renderCheckIndicator` | `(props) => JSX.Element` | Custom selected-item indicator입니다. |
| `indicatorProps` | `SelectIndicatorProps` | Trigger indicator에 전달할 props입니다. |
| `contentProps` | `SelectContentProps` | Popup content wrapper에 전달할 props입니다. |
| `groupProps` | `SelectGroupProps` | Group wrapper에 전달할 props입니다. |
| `itemProps` | `SelectItemProps` | Item에 전달할 props입니다. |
| `checkIndicatorProps` | `SelectCheckIndicatorProps` | Selected-item indicator에 전달할 props입니다. |

`Select`는 `placement`, `offset`, `shift`, `flip`, `autoUpdate`, `middleware` 같은 Popup positioning props도 받습니다.

## Custom Parts

생성된 part에 props를 전달하려면 `*Props`를 사용하세요. 생성된 part를 교체하려면 `render*`를 사용하세요.

```tsx
import { Select, SelectItem } from '@suis-ui/kit';

<Select
  data={['Small', 'Medium', 'Large']}
  renderItem={(props) => (
    <SelectItem {...props} bg={props.selected ? 'primary.container' : undefined} />
  )}
/>;
```

현재 Select API는 value, indicator, content, group, item, selected-item indicator 커스터마이징을 노출합니다.

## Defaults

- `flip`의 기본값은 `true`입니다.
- `offset`의 기본값은 `4`입니다.
- Trigger는 `button`으로 렌더링됩니다.
- Popup content는 animated presence와 vertical keyboard navigation을 사용합니다.
