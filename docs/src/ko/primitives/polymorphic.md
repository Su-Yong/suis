# Polymorphic

`Polymorphic`은 `@suis-ui/primitives`에서 export하는 낮은 수준의 동적 element primitive입니다.

## Usage

```tsx
import { Polymorphic, forwardRef } from '@suis-ui/primitives';
```

`Polymorphic`은 Solid `Dynamic`을 감싸 선택한 element 또는 component를 렌더링합니다.

```text
Polymorphic
└── Dynamic component
```

```tsx
<Polymorphic as="button" type="button">
  Save
</Polymorphic>
```

## Props

`PolymorphicProps`는 선택한 Solid 컴포넌트나 intrinsic element의 props와 다음 prop을 포함합니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `as` | <code>T</code> | `div` | 렌더링할 element 또는 component입니다. |
| 선택한 element props | <code>ComponentProps&lt;T&gt;</code> | `-` | Solid `Dynamic` 컴포넌트로 전달되는 props입니다. |

## forwardRef

Primitive가 setup code를 실행하면서 호출자가 제공한 ref도 존중해야 할 때 `forwardRef`를 사용하세요.

`forwardRef(callback, ref)`는 외부 callback ref를 먼저 호출한 다음 local setup callback을 호출합니다. 외부 ref가 callback이 아니면 local setup callback만 호출합니다.

```tsx
import { forwardRef, Polymorphic } from '@suis-ui/primitives';

const onSetup = (element: HTMLButtonElement) => {
  element.focus();
};

<Polymorphic
  as="button"
  ref={forwardRef(onSetup, props.ref)}
/>;
```

## Examples

### Button Element

```tsx
<Polymorphic as="button" type="button">
  Save
</Polymorphic>
```

### Anchor Element

```tsx
<Polymorphic as="a" href="/docs">
  Open docs
</Polymorphic>
```

### Custom Component

```tsx
const LinkButton = (props) => (
  <a role="button" {...props}>
    {props.children}
  </a>
);

<Polymorphic as={LinkButton} href="/settings">
  Settings
</Polymorphic>
```
