# CheckBox

`CheckBox` is the styled checkbox component in `@suis-ui/kit`. It composes the primitive checkbox root, label, and input indicator.

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

## Import

```tsx
import { CheckBox } from '@suis-ui/kit';
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `checked` | `boolean` | Passed to the underlying checkbox input. |
| `onChecked` | `(checked: boolean) => void` | Called from the input change event. |
| `inputProps` | primitive `CheckBoxIndicatorProps` | Props for the underlying `input type="checkbox"`. |
| `labelProps` | primitive `CheckBoxLabelProps` | Props for the underlying `label`. |
| `renderIndicator` | `(props: { checked?: boolean }) => JSX.Element` | Custom visual indicator renderer. |

The rendered label text comes from the `name` prop.

## Custom Indicator

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

## Notes

`CheckBox` is controlled by the `checked` value you pass. Keep the signal or state in sync through `onChecked`.
