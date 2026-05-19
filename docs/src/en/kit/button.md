# Button

`Button` is the styled button component in `@suis-ui/kit`. It is built on `Box`, so it accepts Box style props and native props for the selected element.

## Usage

```tsx
import { Button } from '@suis-ui/kit';

<Button variant="primary" size="md">
  Save
</Button>
```

The actual primitive structure can be read as a lightweight tree:

```text
Button
└── Box
    └── Polymorphic(button)
```

The `type` prop is a kit layout type, not the native HTML button type. If you need a form submit button with the current API, pass the native type through the `props` escape hatch.

```tsx
<Button props={{ type: 'submit' }} variant="primary">
  Submit
</Button>
```

## Props

### Button Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | one of: `default`, `primary`, `secondary`, `ghost` | `default` | Selects the color, border, and shadow states. |
| `type` | one of: `button`, `icon` | `button` | Layout type. `icon` uses square padding. |
| `size` | one of: `xs`, `sm`, `md`, `lg`, `xl` | `md` | Selects padding and radius tokens. |
| `active` | `boolean` | `false` | Forces the active visual state. |
| `disabled` | native button prop | `false` | Applies native disabled behavior plus disabled opacity/cursor. |
| `as` | `ValidComponent` | `button` | Renders another element or component while keeping button styles. |

`Button`'s `type` is a kit layout type. If you need a native form submit/reset type, use the [Box](./box.md) `props` escape hatch to pass native `type="submit"`.

### Box Mixin Props

`Button` also accepts [Box](./box.md) props. Use props such as `w`, `gap`, `bg`, `c`, `m`, `r`, and `shadow` for one-off layout or style overrides. If `as` renders an anchor or custom component, native props for that element are available too.

## Styling

Button styles read from the `component.button` theme contract.

```ts
component.button = {
  focus: { offset, color, width },
  disabled: { opacity },
  size: {
    xSmall: { x, y, radius },
    small: { x, y, radius },
    medium: { x, y, radius },
    large: { x, y, radius },
    xLarge: { x, y, radius },
  },
  font: {
    xSmall,
    small,
    medium,
    large,
    xLarge,
  },
  variants: {
    default: { default, hover, active },
    primary: { default, hover, active },
    secondary: { default, hover, active },
    ghost: { default, hover, active },
  },
}
```

Each `variants.*.*` state contains `background`, `color`, `borderWidth`, `borderColor`, and `boxShadow`. `size` controls padding and radius, and `font` controls size-specific typography. `focus` controls the `:focus-visible` outline. `disabled.opacity` controls disabled opacity.

### Size

`size` maps to the `xs`, `sm`, `md`, `lg`, and `xl` prop values. Each size token's `x` and `y` values become horizontal and vertical padding for regular buttons, while `radius` becomes border radius. For `type="icon"`, the `x` value is used as square padding.

### Font

`font` provides size-specific typography tokens. Each `font.*` value applies `fontSize`, `lineHeight`, `fontWeight`, and `letterSpacing` to the matching button size. Button suppresses the default Box text style so these tokens win by default; use the `text` prop when a single button needs a text-style override.

### Variants

`variants` contains `default`, `primary`, `secondary`, and `ghost`. Each variant has `default`, `hover`, and `active` states. Changing a state's background, color, border, or shadow updates that visual state for every button using the variant.

### Focus And Disabled

`focus` controls keyboard focus outline offset, color, and width. `disabled.opacity` controls disabled opacity, and disabled buttons do not receive hover styles.

For global component styling, use `createTheme({ component: { button: ... } })` from [Customization](../customization.md). For a single button, prefer Box props first, then add `class` or `style` only when needed.

## Accessibility

Use the native `disabled` prop for disabled native buttons. Icon-only buttons need an accessible label.

```tsx
<Button type="icon" aria-label="Close">
  x
</Button>
```

## Examples

### Variants

```tsx
<Box direction="row" gap="sm">
  <Button variant="default">Default</Button>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
</Box>
```

### Sizes

```tsx
<Box direction="row" align="center" gap="sm">
  <Button size="xs">XS</Button>
  <Button size="sm">SM</Button>
  <Button size="md">MD</Button>
  <Button size="lg">LG</Button>
  <Button size="xl">XL</Button>
</Box>
```

### Icon Button

```tsx
<Button type="icon" size="sm" aria-label="Add item">
  +
</Button>
```

### Active And Disabled

```tsx
<Box direction="row" gap="sm">
  <Button active>Active</Button>
  <Button disabled>Disabled</Button>
</Box>
```

### Polymorphic Link

```tsx
<Button as="a" href="/settings" variant="secondary">
  Settings
</Button>
```
