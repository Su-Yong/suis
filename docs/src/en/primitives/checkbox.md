# CheckBox Primitive

Primitive CheckBox provides root context, label wiring, and a checkbox input without kit styling.

## Usage

```tsx
import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxIndicator,
} from '@suis-ui/primitives';
```

The recommended primitive structure composes a label and indicator inside the `CheckBox` root.

```text
CheckBox
├── CheckBoxLabel
└── CheckBoxIndicator
    └── input[type="checkbox"]
```

```tsx
<CheckBox as="div" id="terms">
  <CheckBox.Label>I accept the terms</CheckBox.Label>
  <CheckBox.Indicator />
</CheckBox>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | <code>string</code> | `createUniqueId()` | Input id shared by `CheckBoxIndicator` and `CheckBoxLabel`. It is not forwarded as the root DOM id. |
| `rootId` | <code>string</code> | `-` | DOM id applied to the root element. |
| `as` | <code>T</code> | `div` | Element or component rendered as the root. |
| `children` | <code>JSX.Element</code> | `-` | Checkbox label, indicator, and custom content. |
| Selected element props | <code>Omit&lt;ComponentProps&lt;T&gt;, 'id' &#124; 'children'&gt;</code> | `-` | Props forwarded to the root element except `id` and `children`. |

## Component

### `CheckBox.Label`

Renders a `label` with `for` bound to the checkbox context id.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | <code>JSX.Element</code> | `-` | Content rendered inside the label. |
| Label HTML attributes | <code>Omit&lt;JSX.LabelHTMLAttributes&lt;HTMLLabelElement&gt;, 'for'&gt;</code> | `-` | Label attributes except `for`. `for` is fixed to the context id. |

### `CheckBox.Indicator`

Renders an `input type="checkbox"` with `id` bound to the checkbox context id, followed by children.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | <code>JSX.Element</code> | `-` | Custom indicator or supporting content rendered after the input. |
| Input HTML attributes | <code>Omit&lt;JSX.InputHTMLAttributes&lt;HTMLInputElement&gt;, 'type' &#124; 'id'&gt;</code> | `-` | Input attributes except `type` and `id`. `type` is fixed to `checkbox`, and `id` is fixed to the context id. |

## Notes

Use this primitive when you need full control over layout and visual indicator rendering. Use `CheckBox` from `@suis-ui/kit` for the styled version.

## Examples

### Basic Checkbox

```tsx
<CheckBox id="newsletter">
  <CheckBox.Indicator />
  <CheckBox.Label>Receive newsletter</CheckBox.Label>
</CheckBox>
```

### Root Element Id

```tsx
<CheckBox as="div" id="terms-input" rootId="terms-field">
  <CheckBox.Label>I agree to the terms</CheckBox.Label>
  <CheckBox.Indicator required />
</CheckBox>
```

### Custom Indicator Content

```tsx
<CheckBox id="custom-check">
  <CheckBox.Indicator>
    <span aria-hidden="true">Selected</span>
  </CheckBox.Indicator>
  <CheckBox.Label>Use custom indicator content</CheckBox.Label>
</CheckBox>
```
