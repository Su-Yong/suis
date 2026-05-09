# Helpers

`@suis-ui/primitives`는 작은 class와 style 조합 helper를 export합니다.

## Import

```tsx
import { cx, cl, clx, sx } from '@suis-ui/primitives';
```

## cx

`cx(...classNames)`는 falsy 값을 걸러내고 나머지를 공백으로 이어 붙입니다.

```tsx
cx('base', active && 'active');
```

## cl

`cl(object)`는 class map을 class 문자열로 변환합니다.

```tsx
cl({
  active: true,
  disabled: false,
});
```

결과는 `"active"`입니다.

## clx

`clx(...items)`는 문자열, class map, `null`, `undefined`를 받고, 해석된 각 값을 공백으로 이어 붙입니다.

```tsx
clx('base', { active: true }, maybeClass);
```

vanilla-extract class와 Solid `classList` 스타일 객체를 조합할 때 사용하세요.

## sx

`sx(...styles)`는 Solid style 값을 CSS 문자열로 합칩니다. 문자열, 배열, style object를 받을 수 있습니다.

```tsx
sx(
  'display: flex',
  { color: 'red' },
  props.style,
);
```

Object key는 작성한 그대로 출력됩니다. CSS property name은 Solid style object가 기대하는 형식과 같은 형식으로 전달하세요.
