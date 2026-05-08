# Polymorphic

`Polymorphic` is the low-level dynamic element primitive exported by `@suis-ui/primitives`.

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

`PolymorphicProps<T>` includes the props for the selected Solid component or intrinsic element, plus:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `T` | `div` | Element or component to render. |

Any remaining props are forwarded to Solid's `Dynamic` component.

## forwardRef

Use `forwardRef` when a primitive needs to run setup code and still respect a caller-provided ref:

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

`forwardRef` calls the external callback ref first, then calls the local setup callback.
