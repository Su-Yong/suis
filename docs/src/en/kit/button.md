# Button

`Button` is the styled button component in `@suis-ui/kit`. It is built on `Box`, so it accepts Box style props and native button props.

```tsx
import { Button } from '@suis-ui/kit';

<Button variant="primary" size="md">
  Save
</Button>
```

## Import

```tsx
import { Button } from '@suis-ui/kit';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `default | primary | secondary | ghost` | `default` | Visual variant. |
| `type` | `button | icon` | `button` | Layout type. `icon` uses equal padding. |
| `size` | `xs | sm | md | lg | xl` | `md` | Button size token. |
| `active` | `boolean` | `false` | Forces the active visual state. |
| `disabled` | native button prop | `false` | Applies disabled styling and native disabled behavior. |

`Button` renders a `button` by default. Use `as` to render another element while keeping button styles:

```tsx
<Button as="a" href="/settings" variant="secondary">
  Settings
</Button>
```

## Styling

`Button` inherits Box props such as `gap`, `w`, `bg`, `c`, `m`, and `r`. Component-specific styling comes from the `component.button` theme contract.

## Accessibility

Use the native `disabled` prop for disabled buttons. For icon buttons, provide an accessible label with `aria-label`.
