# Polymorphic

`Polymorphic`은 `@suis-ui/primitives`에서 export하는 낮은 수준의 동적 element primitive입니다.

```tsx
import { Polymorphic } from '@suis-ui/primitives';

<Polymorphic as="button" type="button">
  Save
</Polymorphic>
```

## Import

```tsx
import { Polymorphic, forwardRef } from '@suis-ui/primitives';
```

## Props

`PolymorphicProps<T>`는 선택한 Solid 컴포넌트나 intrinsic element의 props와 다음 prop을 포함합니다.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `T` | `div` | 렌더링할 element 또는 component입니다. |

나머지 props는 Solid의 `Dynamic` 컴포넌트로 전달됩니다.

## forwardRef

Primitive가 setup code를 실행하면서 호출자가 제공한 ref도 존중해야 할 때 `forwardRef`를 사용하세요.

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

`forwardRef`는 외부 callback ref를 먼저 호출한 다음 local setup callback을 호출합니다.
