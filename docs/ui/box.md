# Box

`Box` is the base styled layout component in `@suis-ui/kit`. It renders a polymorphic element, defaults to `div`, and applies SUIS spacing, color, text, border, radius, and size props.

```tsx
import { Box } from '@suis-ui/kit';

<Box
  direction="row"
  align="center"
  gap="md"
  p="lg"
  bg="surface.main"
  r="md"
>
  Content
</Box>
```

## Import

```tsx
import { Box } from '@suis-ui/kit';
```

## Element Type

Use `as` to choose the rendered element or component:

```tsx
<Box as="section" p="lg">
  Section content
</Box>
```

`Box` accepts native props for the selected element through its polymorphic type.

## Layout Props

| Prop | Values |
| --- | --- |
| `pos` | `relative`, `absolute`, `fixed`, `sticky` |
| `direction` | `row`, `row-reverse`, `column`, `column-reverse` |
| `justify` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `align` | `flex-start`, `flex-end`, `center`, `baseline`, `stretch` |
| `wrap` | `nowrap`, `wrap`, `wrap-reverse` |
| `gap` | any key from the SUIS space map |

The base display is `flex`. The default direction is `column`.

## Spacing Props

Padding props: `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`.

Margin props: `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr`.

Each spacing prop accepts keys from the SUIS space map, including semantic space keys and `token.*` space keys.

## Size Props

| Prop | Type |
| --- | --- |
| `w` | `string` |
| `h` | `string` |
| `minW` | `string` |
| `minH` | `string` |
| `maxW` | `string` |
| `maxH` | `string` |
| `flex` | `string | number | boolean` |

When `flex` is `true`, `Box` writes `flex: 1`.

## Color, Border, Radius, and Text Props

| Prop | Description |
| --- | --- |
| `c` | text color from the SUIS color map |
| `bg` | background color from the SUIS color map |
| `bc` | border color from the SUIS color map |
| `bw` | border width from `vars.size.line`, or enabled automatically when `bc` is set |
| `r` | border radius for all corners |
| `tlr`, `trr`, `blr`, `brr` | corner-specific radius values |
| `text` | semantic font style from `vars.font` |

The default text color is `text.main`, and the default text style is `body`.

## Escape Hatch

Use `props` to pass a final set of props to the underlying `Polymorphic` component:

```tsx
<Box
  as="div"
  props={{ role: 'presentation' }}
/>
```

Prefer normal typed props first. Use `props` only when a needed attribute is not represented well by the generic type.
