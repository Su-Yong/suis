# CheckBox

`CheckBox` is the styled checkbox component in `@suis-ui/kit`. It composes the primitive checkbox root, label, and input indicator behind one component API.

## Usage

```tsx
import { createSignal } from 'solid-js';
import { CheckBox } from '@suis-ui/kit';

const [checked, setChecked] = createSignal(false);

<CheckBox
  name="Receive updates"
  checked={checked()}
  onChecked={setChecked}
/>;
```

The actual primitive structure can be read as a lightweight tree:

```text
CheckBox
└── PrimitiveCheckBox
    └── CheckBoxLabel
        ├── CheckBoxIndicator(input)
        │   └── Indicator
        └── LabelText
```

Treat `CheckBox` as a controlled component: pass `checked` and sync state through `onChecked`.

## Props

### State Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | - | Label text rendered next to the indicator. |
| `checked` | `boolean` | - | Checked state for the inner checkbox input. |
| `onChecked` | `(checked: boolean) => void` | - | Called with the next checked value from the input change event. |

For primitive root props such as `id`, `rootId`, and polymorphic behavior, see [primitive CheckBox](../primitives/checkbox.md).

## Styling

CheckBox styles read from the `component.checkbox` theme contract.

```ts
component.checkbox = {
  active,
  transition,
  indicator: {
    size,
    borderWidth,
    borderColor,
    hover,
    active,
  },
  check: {
    size,
    color,
    hover,
    active,
  },
}
```

`indicator` controls the circular checkbox box size, border, and hover/active background. `active` is the checked fill color. `check` controls the default check svg size and color.

### Indicator

`indicator.size` is used for both width and height of the visual checkbox box. `indicator.borderWidth` and `indicator.borderColor` create the unchecked border. `indicator.hover` and `indicator.active` provide hover/active feedback backgrounds.

### Check

`check.size` controls the default check svg size. `check.color` is the default checked color, while `check.hover` and `check.active` apply to the check icon during label hover/active states.

### Active And Transition

`active` fills the indicator in the checked state. `transition` is used for state changes on the indicator and check icon.

The current focus-visible outline uses `component.button.focus`. To style checkbox focus independently, use a custom class or change the theme structure.

## Rendering

| Name | Default | Description |
| --- | --- | --- |
| `inputProps` | - | Props passed to the inner `input type="checkbox"`. |
| `labelProps` | - | Props passed to the inner `label`. |
| `renderIndicator` | default check icon | Replaces the visual indicator. |

### inputProps

`inputProps` is passed to the inner `input type="checkbox"`. Use it for input-level props such as `required`, `disabled`, `aria-*`, `class`, and `classList`.

### labelProps

`labelProps` is passed to the checkbox label wrapper. Use it for label classes, data attributes, or event handlers.

### renderIndicator

`renderIndicator` fully replaces the default check svg. It receives `{ checked }` and renders in the visual indicator position after the internal input.

```tsx
<CheckBox
  name="Enabled"
  checked={enabled()}
  onChecked={setEnabled}
  renderIndicator={(props) => (
    <span>{props.checked ? 'on' : 'off'}</span>
  )}
/>;
```

When a custom indicator is used, checked state still belongs to the inner input. Only the visual element is replaced.

## Examples

### Controlled CheckBox

```tsx
import { createSignal } from 'solid-js';
import { CheckBox } from '@suis-ui/kit';

const [checked, setChecked] = createSignal(false);

<CheckBox
  name="Marketing emails"
  checked={checked()}
  onChecked={setChecked}
/>;
```

### Required Field

```tsx
<CheckBox
  name="I agree to the terms"
  checked={agreed()}
  onChecked={setAgreed}
  inputProps={{ required: true }}
/>
```

### Custom Label Props

```tsx
<CheckBox
  name="Compact mode"
  checked={compact()}
  onChecked={setCompact}
  labelProps={{ class: 'settings-checkbox', 'data-density': 'compact' }}
/>
```

### Custom Indicator

```tsx
<CheckBox
  name="Favorite"
  checked={favorite()}
  onChecked={setFavorite}
  renderIndicator={(props) => (
    <span aria-hidden="true">
      {props.checked ? '*' : ''}
    </span>
  )}
/>
```
