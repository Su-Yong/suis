# CheckBox Primitive

Primitive CheckBox는 kit 스타일 없이 root context, label 연결, checkbox input을 제공합니다.

```tsx
import { CheckBox } from '@suis-ui/primitives';

<CheckBox as="div" id="terms">
  <CheckBox.Label>I accept the terms</CheckBox.Label>
  <CheckBox.Indicator />
</CheckBox>
```

## Import

```tsx
import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxIndicator,
} from '@suis-ui/primitives';
```

## Components

### `CheckBox`

Root는 checkbox context를 만들고 polymorphic element를 렌더링합니다.

| Prop | Type | Description |
| --- | --- | --- |
| `id` | `string` | `CheckBoxIndicator`와 `CheckBoxLabel`이 사용하는 input id입니다. |
| `rootId` | `string` | Root element에 적용되는 DOM id입니다. |
| `as` | `ValidComponent` | Root element type입니다. |

### `CheckBox.Label`

Checkbox context id에 바인딩된 `for`를 가진 `label`을 렌더링합니다.

`for`를 제외한 label HTML attribute를 받습니다.

### `CheckBox.Indicator`

Checkbox context id에 바인딩된 `id`와 `type="checkbox"`를 가진 `input`을 렌더링하고, 그 뒤에 children을 렌더링합니다.

`type`과 `id`를 제외한 input HTML attribute를 받습니다.

## 참고

레이아웃과 시각적 indicator 렌더링을 완전히 제어해야 할 때 이 primitive를 사용하세요. 스타일이 적용된 버전은 `@suis-ui/kit`의 `CheckBox`를 사용하세요.
