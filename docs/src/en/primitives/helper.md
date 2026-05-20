# Helpers

`@suis-ui/primitives` provides small helpers for composing class names and inline style values.

## Usage

```tsx
import { cx, cl, clx, sx } from '@suis-ui/primitives';
```

```text
Helpers
├── cx
├── cl
├── clx
└── sx
```

```tsx
const rootClass = clx('root', styles.base, {
  [styles.active]: active(),
  [styles.disabled]: disabled(),
});

const rootStyle = sx(
  'display: inline-flex',
  { color: 'red' },
  props.style,
);
```

## `cx`

Accepts multiple values, removes falsy values, and joins the rest with spaces. Use it for simple conditional class names.

### Signature

```ts
cx(...classNames: unknown[]): string
```

### Behavior

It uses `filter(Boolean)`, so values such as `false`, `null`, `undefined`, and empty strings are removed. Remaining values are joined with `Array.prototype.join(' ')`.

### Examples

```tsx
const className = cx('base', selected() && 'selected', disabled() && 'disabled');
```

## `cl`

Converts a class map into a class string. Object keys are class names, and only keys with truthy values are included in the result.

### Signature

```ts
type ClassListType = Record<string, boolean | undefined>;

cl(obj?: ClassListType): string
```

### Behavior

Returns an empty string when no argument is passed. Object keys are emitted exactly as written.

### Examples

```tsx
const className = cl({
  active: active(),
  disabled: disabled(),
});
```

## `clx`

Combines strings, class maps, `null`, `undefined`, and boolean values into a class string. Use it when combining vanilla-extract classes with Solid `classList`-style objects.

### Signature

```ts
type Maybe<T> = T | undefined | null;
type ClassListType = Record<string, boolean | undefined>;
type ClxObject = ClassListType | string | boolean;

clx(...clxObjects: Maybe<ClxObject>[]): string
```

### Behavior

Strings are used as-is, and objects contribute only keys whose values are truthy. `null`, `undefined`, and boolean values resolve to an empty string.

### Examples

```tsx
const className = clx(
  styles.root,
  props.class,
  {
    [styles.active]: active(),
    [styles.disabled]: disabled(),
  },
);
```

## `sx`

Combines Solid `style` values into a CSS string. It accepts strings, arrays, and style objects together.

### Signature

```ts
sx<Element extends HTMLElement>(
  ...styles: JSX.HTMLAttributes<Element>['style'][]
): string
```

### Behavior

Strings are added as-is, arrays are flattened recursively, and objects are converted into CSS declarations in `key: value` form. Each declaration ends with a semicolon and is joined with newlines.

Object keys are emitted exactly as written. Pass CSS property names in the same form expected by Solid style objects.

### Examples

```tsx
const style = sx<HTMLButtonElement>(
  'display: inline-flex',
  {
    'align-items': 'center',
    color: disabled() ? 'gray' : 'black',
  },
  props.style,
);

return <button class={className} style={style} />;
```
