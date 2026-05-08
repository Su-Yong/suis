# Helpers

`@suis-ui/primitives` exports small class and style composition helpers.

## Import

```tsx
import { cx, cl, clx, sx } from '@suis-ui/primitives';
```

## cx

`cx(...classNames)` filters falsy values and joins the rest with spaces.

```tsx
cx('base', active && 'active');
```

## cl

`cl(object)` converts a class map into a class string.

```tsx
cl({
  active: true,
  disabled: false,
});
```

The result is `"active"`.

## clx

`clx(...items)` accepts strings, class maps, `null`, or `undefined`, then joins each resolved value with spaces.

```tsx
clx('base', { active: true }, maybeClass);
```

Use this when combining vanilla-extract classes with Solid `classList`-style objects.

## sx

`sx(...styles)` combines Solid style values into a CSS string. It accepts strings, arrays, or style objects.

```tsx
sx(
  'display: flex',
  { color: 'red' },
  props.style,
);
```

Object keys are emitted as written. Pass CSS property names in the same form expected by Solid style objects.
