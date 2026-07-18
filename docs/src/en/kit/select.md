# Select

`Select` is the styled select component in `@suis-ui/kit`. It combines primitive Select, Popup, FocusManager, and kit styles behind one component API.

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

The actual primitive structure can be read as a lightweight tree:

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

Kit Select does not expose the primitive parts directly. Customize them with `data`, `*Props`, and `render*` props.

## Props

### Value And Data Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `SelectData[]` | required | Option data to render. |
| `value` | `string` or `null` | `null` | Currently selected option value. If `required` is the literal `true`, `null` is not allowed. |
| `onChangeValue` | `(value: string or null) => void` | - | Called with the raw selected value when the selected value changes. If `required` is the literal `true`, `null` is removed from the callback type. |
| `onChange` | `(value: ResolvedSelectData or null) => void` | - | Called with the resolved selected option when the selected value changes. If `required` is the literal `true`, `null` is removed from the callback type. |
| `required` | `boolean` | `false` | Prevents clearing the selected option by selecting it again and marks the trigger/listbox as required. |
| `placeholder` | `string` | - | Text shown in the trigger when no value is selected. |
| `open` | `boolean` | - | Externally controls popup visibility when provided. |

`data` is the source for the option list. `value` and `onChangeValue` make up the controlled raw value state. Use `onChange` when you need the resolved option object. `ResolvedSelectData` is `{ value: string; label: string; group?: string }`. Passing `required` as the literal `true` removes `null` from the `value`, `onChangeValue`, and `onChange` types. Passing a dynamic boolean such as `required={someBoolean}` keeps the safer nullable type.

When `open` is a boolean, popup visibility follows that external state. In this mode, trigger clicks and click-away do not update `open` automatically, so the caller must update the state directly.
Selecting the current option again clears the value unless `required` is true. Selecting an option closes the popup.

### Positioning Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | Floating UI `Placement` | - | Popup placement. |
| `strategy` | Floating UI `Strategy` | - | Popup positioning strategy. |
| `offset` | Floating UI `OffsetOptions` | `4` | Gap between trigger and content. |
| `shift` | `ShiftOptions` or `boolean` | - | Popup shift middleware. |
| `flip` | `FlipOptions` or `boolean` | `true` | Popup flip middleware. |
| `autoUpdate` | `AutoUpdateOptions` or `boolean` | `true` | Automatic popup position updates. |
| `middleware` | `Middleware[]` | - | Additional Floating UI middleware. |

Popup positioning props follow [Popup](./popup.md) behavior. Kit Select provides defaults for `flip` and `offset`.

### Trigger Box Mixin Props

The trigger accepts [Box](./box.md) props and native button props. Use props such as `w`, `maxW`, `as`, `disabled`, and `aria-*` to adjust the trigger element.

## Styling

Select styles read from the `component.select` theme contract.

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

`trigger` controls the closed trigger button surface states. `indicator.transform` applies when the select is open. `content` styles the popup listbox surface. `group.title` styles grouped data labels. `check` styles the selected-item check icon.

### Focus

`focus` controls the trigger `:focus-visible` outline. Offset, color, and width apply when the select trigger is reached by keyboard.

### Trigger

`trigger.default`, `trigger.hover`, and `trigger.active` are trigger button surface states. Each state controls background, color, border, radius, shadow, and padding.

### Indicator

`indicator.size` controls the chevron area. `indicator.transition` is used for open/close transitions, and `indicator.transform` applies when the select is open.

### Content

`content` controls the popup listbox surface. It sets background, border, radius, shadow, and padding. The actual height cap is based on available height calculated by Floating UI `size` middleware.

### Group, Check, Placeholder

`group.title` controls grouped data label typography, color, and padding. `check` controls selected-item check indicator size and color. `placeholder.color` applies to trigger text when no value is selected.

## Rendering

| Name | Default | Description |
| --- | --- | --- |
| `renderValue` | `(value) => value.label` | Renders the resolved selected option inside the trigger. |
| `renderIndicator` | `SelectIndicator` | Renders the trigger indicator. |
| `renderContent` | `Box` | Replaces the popup content wrapper. |
| `renderGroup` | `SelectGroup` | Replaces a group wrapper. |
| `renderItem` | `SelectItem` | Replaces each option item. |
| `renderCheckIndicator` | `SelectCheckIndicator` | Replaces the selected-item check indicator. |
| `indicatorProps` | - | Present in the API, but not forwarded to the default indicator in the current implementation. Use `renderIndicator` to customize the indicator. |
| `popupProps` | - | Props passed to the `PopupPresence` wrapper. |
| `contentProps` | - | Props passed to the popup content wrapper. |
| `groupProps` | - | Props passed to group wrappers. |
| `itemProps` | - | Props passed to each item. |
| `checkIndicatorProps` | - | Props passed to the selected-item indicator. |

### renderValue

`renderValue` replaces the selected value display inside the trigger. It receives the resolved option object: `{ value, label, group? }`.

### renderIndicator

`renderIndicator` replaces the indicator on the right side of the trigger. Because `indicatorProps` is not forwarded to the default indicator in the current implementation, use this function for indicator markup or styling changes.

### renderContent

`renderContent` replaces the popup content wrapper. `contentProps` is passed to this wrapper.

### renderGroup

`renderGroup` replaces grouped option wrappers. `groupProps` is passed to each group wrapper.

### renderItem

`renderItem` replaces each option item. `itemProps` is passed to every item.

### renderCheckIndicator

`renderCheckIndicator` replaces the selected-item check indicator. `checkIndicatorProps` is passed to this indicator.

### indicatorProps

`indicatorProps` exists in the API, but it is not forwarded to the default indicator in the current implementation. If you need to pass props to the indicator, render the desired element through `renderIndicator`.

### popupProps

`popupProps` is passed to the animated `PopupPresence` wrapper. Use it to adjust the animation wrapper.

### contentProps

`contentProps` is passed to the popup content wrapper. Use it to adjust classes, styles, or Box props on the content wrapper.

### groupProps

`groupProps` is passed to each group wrapper when grouped data is rendered. Use it for shared group layout or class changes.

### itemProps

`itemProps` is passed to every option item. Use it to apply item size, classes, or Box props consistently.

### checkIndicatorProps

`checkIndicatorProps` is passed to the check indicator rendered for selected items. Use it to adjust classes, styles, or Box props on the check indicator.

```tsx
<Select
  data={['Small', 'Medium', 'Large']}
  renderIndicator={(props) => (
    <span aria-hidden="true">{props.open ? '^' : 'v'}</span>
  )}
/>;
```

## Data

`data` accepts simple values, labeled values, and grouped values.

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

A string uses the same value for both value and label. `{ value, label }` separates the rendered item label from the selected value. Grouped data is flattened for selection, then grouped again for rendering.

The trigger displays the selected option label by default. `renderValue` receives the resolved option object when you need custom formatting. If the current `value` does not resolve to an option in `data`, the trigger shows `placeholder`.

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

Selecting a built-in item always closes the popup. Value changes and callback values depend on the current value, selected item, and `required`.

| Case | `onChangeValue` | `onChange` | Result |
| --- | --- | --- | --- |
| Selecting a different option | Raw `string` value | `ResolvedSelectData` | Updates to the selected option and closes the popup. |
| Selecting the current option when `required` is false | `null` | `null` | Clears the selection and closes the popup. |
| Selecting the current option when `required` is true | Not called | Not called | Keeps the selection and only closes the popup. |

`onChange` is the resolved option callback provided by kit Select, not the trigger's native change event.

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
