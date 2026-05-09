# Item

`Item` is a styled content row in `@suis-ui/kit`. It renders optional leading media, title, description, and trailing action content in a single row.

```tsx
import { Button, Item } from '@suis-ui/kit';
import { Star } from 'lucide-solid';

<Item
  media={<Star />}
  title="Item title"
  description="Item description"
  action={<Button size="sm">Action</Button>}
/>;
```

## Import

```tsx
import { Item } from '@suis-ui/kit';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `media` | `JSX.Element` | - | Leading content, usually an icon or small visual. |
| `title` | `JSX.Element` | - | Main item title. |
| `description` | `JSX.Element` | - | Secondary item description. |
| `action` | `JSX.Element` | - | Trailing action content. |
| `size` | `xs | sm | md | lg | xl` | `md` | Controls row padding and radius. |
| `as` | polymorphic element | `div` | Rendered element. |

`Item` is built on `Box`, so it also accepts Box style props and native props for the selected `as` element.

## Structure

`Item` owns its internal row structure:

```tsx
<Item
  media={<Icon />}
  title="Settings"
  description="Manage preferences"
  action={<Button size="sm">Open</Button>}
/>
```

The `media` and `action` slots are rendered only when provided. `title` and `description` are rendered inside the center content area.

`Item` does not currently expose `render*`, `*Props`, or exported part components. Use Box props on `Item` and pass styled elements into `media`, `title`, `description`, or `action` when you need customization.

## Element Type

Use `as` to render another element while keeping Item styling:

```tsx
<Item
  as="button"
  type="button"
  title="Open command"
  description="Runs the selected command"
/>
```

For native interactive elements such as `button` or `a`, provide the appropriate native props and accessible labels when needed.

## Styling

Component-specific styling comes from the `component.item` theme contract:

| Contract key | Description |
| --- | --- |
| `background` | Default row background. |
| `color` | Default text color. |
| `borderWidth` | Row border width. |
| `borderColor` | Row border color. |
| `boxShadow` | Row shadow. |
| `gap` | Gap between media, content, and action. |
| `focus` | Focus-visible outline values. |
| `size` | Padding and radius values for `xs`, `sm`, `md`, `lg`, and `xl`. |

Use Box props such as `bg`, `c`, `bd`, `bc`, `r`, `gap`, and `w` for one-off overrides.
