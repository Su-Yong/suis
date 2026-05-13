# CheckBox Primitive

The primitive CheckBox provides the root context, label wiring, and checkbox input without kit styling.

```tsx
import { CheckBox } from '@suis-ui/primitives';

<CheckBox as="div" id="terms">
  <CheckBox.Label>I accept the terms</CheckBox.Label>
  <CheckBox.Indicator />
</CheckBox>
```

## Import

```tsx
import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxIndicator,
} from '@suis-ui/primitives';
```

## Components

### `CheckBox`

The root creates checkbox context and renders a polymorphic element.

| Prop | Type | Description |
| --- | --- | --- |
| `id` | `string` | Input id used by `CheckBoxIndicator` and `CheckBoxLabel`. |
| `rootId` | `string` | DOM id applied to the root element. |
| `as` | `ValidComponent` | Root element type. |

### `CheckBox.Label`

Renders a `label` with `for` bound to the checkbox context id.

It accepts label HTML attributes except `for`.

### `CheckBox.Indicator`

Renders an `input` with `type="checkbox"` and `id` bound to the checkbox context id, followed by its children.

It accepts input HTML attributes except `type` and `id`.

## Notes

Use this primitive when you need full control over layout and visual indicator rendering. Use `@suis-ui/kit` `CheckBox` for the styled version.
