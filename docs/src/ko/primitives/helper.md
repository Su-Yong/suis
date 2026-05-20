# Helpers

`@suis-ui/primitives`는 class와 inline style 값을 조합하는 작은 helper를 제공합니다.

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

여러 값을 받아 falsy 값을 제외하고 나머지를 공백으로 연결합니다. 조건부 class 이름을 간단히 붙일 때 사용합니다.

### Signature

```ts
cx(...classNames: unknown[]): string
```

### Behavior

`filter(Boolean)`을 사용하므로 `false`, `null`, `undefined`, 빈 문자열 같은 값은 빠집니다. 남은 값은 `Array.prototype.join(' ')` 규칙에 따라 문자열로 합쳐집니다.

### Examples

```tsx
const className = cx('base', selected() && 'selected', disabled() && 'disabled');
```

## `cl`

class map을 class 문자열로 변환합니다. 객체 key는 class 이름이고, value가 truthy인 key만 결과에 포함됩니다.

### Signature

```ts
type ClassListType = Record<string, boolean | undefined>;

cl(obj?: ClassListType): string
```

### Behavior

인자를 전달하지 않으면 빈 문자열을 반환합니다. 객체 key는 변환하지 않고 작성한 그대로 출력합니다.

### Examples

```tsx
const className = cl({
  active: active(),
  disabled: disabled(),
});
```

## `clx`

문자열, class map, `null`, `undefined`, boolean 값을 함께 받아 class 문자열로 합칩니다. vanilla-extract class와 Solid `classList` 스타일 객체를 함께 조합할 때 사용합니다.

### Signature

```ts
type Maybe<T> = T | undefined | null;
type ClassListType = Record<string, boolean | undefined>;
type ClxObject = ClassListType | string | boolean;

clx(...clxObjects: Maybe<ClxObject>[]): string
```

### Behavior

문자열은 그대로 사용하고, 객체는 truthy value를 가진 key만 공백으로 연결합니다. `null`, `undefined`, boolean 값은 빈 문자열로 해석됩니다.

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

Solid의 `style` 값들을 CSS 문자열로 합칩니다. 문자열, 배열, style object를 함께 넘길 수 있습니다.

### Signature

```ts
sx<Element extends HTMLElement>(
  ...styles: JSX.HTMLAttributes<Element>['style'][]
): string
```

### Behavior

문자열은 그대로 추가하고, 배열은 재귀적으로 펼치며, 객체는 key-value를 `key: value` 형식의 CSS declaration으로 변환합니다. 각 declaration은 세미콜론으로 끝나며 줄바꿈으로 연결됩니다.

Object key는 작성한 그대로 출력됩니다. CSS property name은 Solid style object가 기대하는 형식으로 전달하세요.

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
