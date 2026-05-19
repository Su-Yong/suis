# Item

`Item` is a styled content row in `@suis-ui/kit`. It renders optional leading media, title, description, and trailing action content in a single row.

## Usage

```tsx
import { Button, Item } from '@suis-ui/kit';

<Item
  media={<span aria-hidden="true">*</span>}
  title="Item title"
  description="Item description"
  action={<Button size="sm">Action</Button>}
/>;
```

The actual primitive structure can be read as a lightweight tree:

```text
Item
├── Media
├── Content
│   ├── Title
│   └── Description
└── Action
```

`media` and `action` render only when provided. `title` and `description` render inside the central content area.

## Props

### Slot Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `media` | `JSX.Element` | - | Leading slot, usually an icon, avatar, or thumbnail. |
| `title` | `JSX.Element` | - | Main text area. |
| `description` | `JSX.Element` | - | Secondary text area. |
| `action` | `JSX.Element` | - | Trailing slot, usually a button, switch, or indicator. |
| `size` | one of: `xs`, `sm`, `md`, `lg`, `xl` | `md` | Selects row padding and radius. |
| `as` | `ValidComponent` | `div` | Renders another element or component while keeping item styles. |

### Box Mixin Props

`Item` also accepts [Box](./box.md) props. Use props such as `bg`, `c`, `bd`, `bc`, `r`, `gap`, and `w` to adjust a single row.

## Styling

Item styles read from the `component.item` theme contract.

```ts
component.item = {
  background,
  color,
  borderWidth,
  borderColor,
  boxShadow,
  gap,
  focus: { offset, color, width },
  size: {
    xSmall: { x, y, radius },
    small: { x, y, radius },
    medium: { x, y, radius },
    large: { x, y, radius },
    xLarge: { x, y, radius },
  },
}
```

`background`, `color`, `borderWidth`, `borderColor`, `boxShadow`, and `gap` apply to the row. `size` controls padding and radius for each size. `focus` controls the `:focus-visible` outline when the rendered element can receive focus, such as `as="button"` or `as="a"`.

### Row Surface

`background`, `color`, `borderWidth`, `borderColor`, and `boxShadow` define the item row surface. `gap` controls spacing between media, content, and action slots.

### Size

`size` maps to the `xs`, `sm`, `md`, `lg`, and `xl` prop values. Each size token's `x` and `y` values become row padding, while `radius` becomes row border radius.

### Focus

`focus` controls the `:focus-visible` outline when the item renders as a focusable element. Button-like and link items use these tokens for keyboard focus feedback.

## Composition

`Item` currently does not expose `render*`, `*Props`, or exported part components. Customize the row by passing elements to `media`, `title`, `description`, and `action`, then use Box props on the outer row.

For an interactive item, use `as="button"` or `as="a"` and pass the native props required by that element.

## Examples

### Basic Item

```tsx
<Item
  media={<span aria-hidden="true">*</span>}
  title="Favorites"
  description="Pinned items and shortcuts"
/>
```

### With Action

```tsx
<Item
  title="Notifications"
  description="Email and push preferences"
  action={<Button size="sm" variant="secondary">Edit</Button>}
/>
```

### Interactive Button Item

```tsx
<Item
  as="button"
  type="button"
  title="Open command"
  description="Runs the selected command"
  action={<span aria-hidden="true">></span>}
/>
```

### Link Item

```tsx
<Item
  as="a"
  href="/billing"
  title="Billing"
  description="Invoices and payment methods"
/>
```

### Custom Slot Content

```tsx
<Item
  media={<Box w="32px" h="32px" r="xl" bg="primary.main" />}
  title={<Box as="strong">Workspace</Box>}
  description={<Box c="text.caption">12 members</Box>}
  action={<Button type="icon" aria-label="Open workspace">></Button>}
/>
```
