# Input

`Input` is the styled input component in `@suis-ui/kit`. It renders `Box` as an `input` or `textarea` and adds the matching kit input class.

```tsx
import { Input } from '@suis-ui/kit';

<Input placeholder="Email" type="email" />;
```

## Import

```tsx
import { Input } from '@suis-ui/kit';
```

## Props

`Input` accepts native input props and Box style props. The `as` prop is limited to `input` or `textarea`.

```tsx
<Input
  type="text"
  placeholder="Search"
  w="320px"
/>
```

```tsx
<Input
  as="textarea"
  placeholder="Message"
  minH="120px"
/>
```

## Styling

Component styling comes from the `component.input` theme contract. Layout and spacing can be adjusted with inherited Box props.
