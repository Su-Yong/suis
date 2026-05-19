# Select

`Select` is the styled select component in `@suis-ui/kit`. It composes primitive Select, Popup, FocusManager, and kit styles behind a single component API.

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

Primitive Select is assembled manually from `Select.Trigger`, `Select.Value`, `Select.Content`, and `Select.Item`. Kit Select owns that structure and exposes customization through `*Props` and `render*` props.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `data` | `SelectData[]` | Required option data. |
| `value` | `string | null` | Current selected value. |
| `onChangeValue` | `(value: string | null) => void` | Called when the selected value changes. |
| `placeholder` | `string` | Text shown when no value is selected. |
| `renderValue` | `(value: T) => JSX.Element` | Custom selected value renderer. |
| `renderIndicator` | `(props) => JSX.Element` | Custom trigger indicator. |
| `renderContent` | `(props) => JSX.Element` | Custom popup content wrapper. |
| `renderGroup` | `(props) => JSX.Element` | Custom group wrapper. |
| `renderItem` | `(props) => JSX.Element` | Custom item wrapper. |
| `renderCheckIndicator` | `(props) => JSX.Element` | Custom selected-item indicator. |
| `indicatorProps` | `SelectIndicatorProps` | Props for the trigger indicator. |
| `contentProps` | `SelectContentProps` | Props for the popup content wrapper. |
| `groupProps` | `SelectGroupProps` | Props for group wrappers. |
| `itemProps` | `SelectItemProps` | Props for items. |
| `checkIndicatorProps` | `SelectCheckIndicatorProps` | Props for the selected-item indicator. |

`Select` also accepts Popup positioning props such as `placement`, `offset`, `shift`, `flip`, `autoUpdate`, and `middleware`.

## Custom Parts

Use `*Props` when you want to pass props to a generated part. Use `render*` when you want to replace a generated part.

```tsx
import { Select, SelectItem } from '@suis-ui/kit';

<Select
  data={['Small', 'Medium', 'Large']}
  renderItem={(props) => (
    <SelectItem {...props} bg={props.selected ? 'primary.container' : undefined} />
  )}
/>;
```

The current Select API exposes customization for value, indicator, content, groups, items, and the selected-item indicator.

## Defaults

- `flip` defaults to `true`.
- `offset` defaults to `4`.
- The trigger renders as a `button`.
- The popup content uses animated presence and vertical keyboard navigation.
