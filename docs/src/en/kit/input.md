# Input

`Input` is the styled form input component in `@suis-ui/kit`. It renders `Box` as either `input` or `textarea` and adds the matching kit input class.

## Usage

```tsx
import { Input } from '@suis-ui/kit';

<Input placeholder="Email" type="email" />;
```

The actual primitive structure can be read as a lightweight tree:

```text
Input
└── Box
    └── Polymorphic(input | textarea)
```

`Input` accepts [Box](./box.md) props, so layout/style props such as `w`, `minH`, `m`, and `text` can be used directly.

## Props

### Input Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | one of: `input`, `textarea` | `input` | Selects the form element to render. |
| native input props | `JSX.InputHTMLAttributes<HTMLInputElement>` | - | Native props such as `type`, `value`, `placeholder`, `disabled`, and `onInput`. |
| Box props | [Box props](./box.md) | - | Layout/style props for size, margin, text, and color. |

When `as="textarea"` is used, the textarea class sets width to `100%` and minimum height to `6lh`.

### Box Mixin Props

`Input` is built on [Box](./box.md), so it accepts layout/style props such as `w`, `minH`, `maxW`, `m`, and `text`. The input surface color and border are primarily controlled by `component.input`, while one-off sizing is handled through Box props.

## Styling

Input styles read from the `component.input` theme contract.

```ts
component.input = {
  focus: { offset, color, width },
  default: {
    background,
    color,
    borderWidth,
    borderColor,
    borderRadius,
    paddingX,
    paddingY,
  },
  hover: { background, color, borderWidth, borderColor, borderRadius },
  active: { background, color, borderWidth, borderColor, borderRadius },
  placeholder: { color },
  file: {
    background,
    color,
    borderWidth,
    borderColor,
    borderRadius,
    paddingX,
    paddingY,
  },
}
```

`default`, `hover`, and `active` control the input surface background, text color, border, and radius. `placeholder.color` styles placeholder text. `file` styles the `::file-selector-button` for `input[type="file"]`.

### Default, Hover, Active

`default` is the base input surface. `hover` changes background, color, and border on pointer hover. `active` changes the same surface fields while active. All three states include border radius, so state-specific radius can also be themed.

### Placeholder

`placeholder.color` applies to `::placeholder` text. Adjust it when placeholder text should sit lower in the visual hierarchy.

### File

`file` applies to `input[type="file"]::file-selector-button`. It controls the file picker button background, color, border, radius, and padding separately from the input surface.

### Focus

`focus` provides tokens for input focus outlines. `input`, `textarea`, and `type="file"` all use `component.input.focus.offset`, `color`, and `width` in the `:focus-visible` state.

## Examples

### Text Input

```tsx
<Input
  type="text"
  placeholder="Search"
  w="320px"
/>
```

### Email Input

```tsx
<Input
  type="email"
  name="email"
  autocomplete="email"
  placeholder="you@example.com"
/>
```

### Textarea

```tsx
<Input
  as="textarea"
  placeholder="Message"
  minH="120px"
/>
```

### File Input

```tsx
<Input
  type="file"
  accept="image/*"
/>
```

### With Box Layout Props

```tsx
<Input
  placeholder="Full width"
  w="100%"
  maxW="480px"
  m="none"
/>
```
