# Input

`Input`은 `@suis-ui/kit`의 스타일 input 컴포넌트입니다. `Box`를 `input` 또는 `textarea`로 렌더링하고 대응되는 kit input class를 추가합니다.

```tsx
import { Input } from '@suis-ui/kit';

<Input placeholder="Email" type="email" />;
```

## Import

```tsx
import { Input } from '@suis-ui/kit';
```

## Props

`Input`은 native input props와 Box style props를 받습니다. `as` prop은 `input` 또는 `textarea`로 제한됩니다.

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

컴포넌트 스타일은 `component.input` theme contract에서 가져옵니다. 레이아웃과 spacing은 상속된 Box props로 조정할 수 있습니다.
