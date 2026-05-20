# Box

`Box` is the base layout component in `@suis-ui/kit`. It renders a `div` by default, can render another element through `as`, and maps SUIS spacing, color, text, border, radius, and size tokens to props.

## Usage

```tsx
import { Box } from '@suis-ui/kit';

<Box direction="row" align="center" gap="md" p="lg" bg="surface.main" r="md">
  Content
</Box>
```

The actual primitive structure can be read as a lightweight tree:

```text
Box
└── Polymorphic
```

Native props for the selected element are also supported.

```tsx
<Box as="section" aria-labelledby="profile-title" p="lg">
  <h2 id="profile-title">Profile</h2>
</Box>
```

## Props

### Element Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ValidComponent` | `div` | HTML element or Solid component to render. |
| `props` | `Record<string, unknown>` | - | Escape hatch props merged last into the inner `Polymorphic`. |

`Box` is polymorphic, so it also accepts native props for the element selected by `as`. For example, `as="a"` allows `href` and `target`. Use `props` only when the typed props do not express the required attribute cleanly.

### Layout Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `pos` | one of: `relative`, `absolute`, `fixed`, `sticky` | - | Sets `position`. |
| `direction` | one of: `row`, `row-reverse`, `column`, `column-reverse` | `column` | Flex direction. Pass `null` to skip the default. |
| `justify` | CSS `justify-content` preset | - | Main axis alignment. |
| `align` | CSS `align-items` preset | - | Cross axis alignment. |
| `wrap` | one of: `nowrap`, `wrap`, `wrap-reverse` | - | Flex wrapping. |
| `gap` | space token | - | Flex gap. |

`justify` supports `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, and `space-evenly`. `align` supports `flex-start`, `flex-end`, `center`, `baseline`, and `stretch`. `gap` accepts a SUIS space token.

### Spacing Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` | space token | - | Padding shortcuts. |
| `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | space token | - | Margin shortcuts. |

Spacing props accept SUIS space tokens. `p` and `m` apply to all sides, while `x`, `y`, `t`, `b`, `l`, and `r` suffixes target axes or individual sides.

### Size And Position Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `w`, `h` | `string` | - | Width and height. |
| `minW`, `minH`, `maxW`, `maxH` | `string` | - | Minimum and maximum width/height. |
| `flex` | `string`, `number`, `boolean` | - | Flex value. `true` becomes `flex: 1`. |
| `top`, `right`, `bottom`, `left` | `string` | - | Inset values for positioned elements. |
| `z` | `string`, `number` | - | `z-index`. |

Size and position props accept CSS length strings rather than token keys. For example, `w="min(100%, 720px)"` and `maxH="50vh"` are valid.

### Color Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `c` | color token | `inherit` | Text color. Pass `null` to skip the default. |
| `bg` | color token | - | Background color. |
| `bc`, `blc`, `brc`, `btc`, `bbc` | color token | - | Border color for all sides or individual sides. |

Color props accept SUIS color tokens. `c` sets text color, `bg` sets background, and the `bc` family sets border colors.

### Border Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `bd`, `bdl`, `bdr`, `bdt`, `bdb` | line-size token | - | Border width for all sides or individual sides. Border style is `solid`. |

Border width props accept line-size tokens. Directional border colors are set with `blc`, `brc`, `btc`, and `bbc`.

### Radius, Text, And Effect Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `r`, `tlr`, `trr`, `blr`, `brr` | radius token | - | Border radius for all corners or individual corners. |
| `text` | font token | `body` | Semantic text style. Pass `null` to skip the default. |
| `shadow` | shadow token | - | Box shadow. |
| `overflow` | overflow preset | - | `overflow`, `overflow-x`, or `overflow-y` preset. |

Radius props accept SUIS radius tokens. `text` applies a full font token, and `shadow` applies a shadow token. `overflow` supports `auto`, `hidden`, `visible`, `scroll`, `xAuto`, `xHidden`, `xVisible`, `xScroll`, `yAuto`, `yHidden`, `yVisible`, and `yScroll`.

`Box` does not have a dedicated `component.box` token. It directly maps theme token maps to recipe variants.

```ts
boxStyle({
  gap: 'md',
  p: 'lg',
  bg: 'surface.main',
  text: 'body',
});
```

Size and position props that need arbitrary CSS lengths are applied through inline CSS variables.

```tsx
<Box w="min(100%, 720px)" maxH="50vh" overflow="yAuto" />
```

Prefer Box props before adding custom `class`, `classList`, or `style`. Use the `props` escape hatch only when a needed attribute or component-specific prop is not represented by the typed props.

## Examples

### Basic Stack

```tsx
import { Box, Button } from '@suis-ui/kit';

<Box gap="md" p="lg" bg="surface.main" r="lg" shadow="sm">
  <Box as="h2" text="title" m="none">
    Account
  </Box>
  <Box c="text.caption">
    Manage profile and notification settings.
  </Box>
  <Button variant="primary">Save</Button>
</Box>
```

### Horizontal Layout

```tsx
<Box direction="row" align="center" justify="space-between" gap="md">
  <Box>
    <Box text="title">Storage</Box>
    <Box text="caption" c="text.caption">24 GB used</Box>
  </Box>
  <Button variant="secondary" size="sm">
    Upgrade
  </Button>
</Box>
```

### Polymorphic Element

```tsx
<Box
  as="a"
  href="/settings"
  direction="row"
  align="center"
  gap="sm"
  p="md"
  r="md"
  bg="surface.high"
>
  Open settings
</Box>
```

### Positioned Element

```tsx
<Box pos="relative" p="lg" bg="surface.main" r="lg">
  <Box pos="absolute" top="8px" right="8px" z={1}>
    New
  </Box>
  Card content
</Box>
```

### Escape Hatch

```tsx
<Box
  as="div"
  props={{ role: 'presentation', 'data-testid': 'layout-shell' }}
/>
```
