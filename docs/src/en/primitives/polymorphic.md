# Polymorphic

`Polymorphic` is the low-level dynamic element primitive exported by `@suis-ui/primitives`.

## Usage

```tsx
import { Polymorphic, forwardRef } from '@suis-ui/primitives';
```

`Polymorphic` wraps Solid `Dynamic` to render the selected element or component.

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

`PolymorphicProps` includes the props for the selected Solid component or intrinsic element, plus:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | <code>T</code> | `div` | Element or component to render. |
| Selected element props | <code>ComponentProps&lt;T&gt;</code> | `-` | Props forwarded to the Solid `Dynamic` component. |

## forwardRef

Use `forwardRef` when a primitive needs to run setup code while still honoring a caller-provided ref.

`forwardRef(callback, ref)` calls the external callback ref first, then the local setup callback. If the external ref is not a callback, only the local setup callback is called.

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
