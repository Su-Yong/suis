# Button

`Button`은 `@suis-ui/kit`의 스타일 button 컴포넌트입니다. `Box` 위에 구축되어 Box style props와 native button props를 받습니다.

```tsx
import { Button } from '@suis-ui/kit';

<Button variant="primary" size="md">
  Save
</Button>
```

## Import

```tsx
import { Button } from '@suis-ui/kit';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `default | primary | secondary | ghost` | `default` | 시각적 variant입니다. |
| `type` | `button | icon` | `button` | Layout type입니다. `icon`은 같은 padding을 사용합니다. |
| `size` | `xs | sm | md | lg | xl` | `md` | Button size token입니다. |
| `active` | `boolean` | `false` | Active visual state를 강제로 적용합니다. |
| `disabled` | native button prop | `false` | Disabled styling과 native disabled behavior를 적용합니다. |

`Button`은 기본적으로 `button`을 렌더링합니다. Button style을 유지하면서 다른 element를 렌더링하려면 `as`를 사용하세요.

```tsx
<Button as="a" href="/settings" variant="secondary">
  Settings
</Button>
```

## Styling

`Button`은 `gap`, `w`, `bg`, `c`, `m`, `r` 같은 Box props를 상속합니다. 컴포넌트별 스타일은 `component.button` theme contract에서 가져옵니다.

## Accessibility

비활성화된 button에는 native `disabled` prop을 사용하세요. Icon button에는 `aria-label`로 접근 가능한 label을 제공하세요.
