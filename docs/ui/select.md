# Select

`Select` is the styled select component in `@suis-ui/kit`. It composes primitive Select, Popup, FocusManager, and kit styles.

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

`data` accepts simple values, labeled values, or grouped values:

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

Simple strings use the same string for value and label. Grouped data is flattened for selection and grouped again for rendering.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `data` | `SelectData[]` | Required option data. |
| `value` | `string | null` | Current selected value. |
| `onChangeValue` | `(value: string | null) => void` | Called when the selected value changes. |
| `placeholder` | `string` | Text shown when no value is selected. |
| `renderValue` | `(value: T) => JSX.Element` | Custom selected value renderer. |
| `renderIndicator` | `(props) => JSX.Element` | Custom trigger indicator. |
| `renderGroup` | `(props) => JSX.Element` | Custom group wrapper. |
| `renderItem` | `(props) => JSX.Element` | Custom item wrapper. |
| `renderCheckIndicator` | `(props) => JSX.Element` | Custom selected-item indicator. |
| `indicatorProps` | `SelectIndicatorProps` | Props for the trigger indicator. |
| `groupProps` | `SelectGroupProps` | Props for group wrappers. |
| `itemProps` | `SelectItemProps` | Props for items. |

`Select` also accepts Popup positioning props such as `placement`, `offset`, `shift`, `flip`, `autoUpdate`, and `middleware`.

## Defaults

- `flip` defaults to `true`.
- `offset` defaults to `4`.
- The trigger renders as a `button`.
- The popup content uses animated presence and vertical keyboard navigation.
