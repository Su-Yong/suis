# CheckBox Primitive

Primitive CheckBox는 kit 스타일 없이 root context, label 연결, checkbox input을 제공합니다.

## Usage

```tsx
import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxIndicator,
} from '@suis-ui/primitives';
```

권장 primitive 구조는 `CheckBox` root 안에 label과 indicator를 조합하는 형태입니다.

```text
CheckBox
├── CheckBoxLabel
└── CheckBoxIndicator
    └── input[type="checkbox"]
```

```tsx
<CheckBox as="div" id="terms">
  <CheckBox.Label>I accept the terms</CheckBox.Label>
  <CheckBox.Indicator />
</CheckBox>
```

## Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `id` | <code>string</code> | `createUniqueId()` | `CheckBoxIndicator`와 `CheckBoxLabel`이 공유하는 input id입니다. Root DOM id로는 전달되지 않습니다. |
| `rootId` | <code>string</code> | `-` | Root element에 적용할 DOM id입니다. |
| `as` | <code>T</code> | `div` | Root로 렌더링할 element 또는 component입니다. |
| `children` | <code>JSX.Element</code> | `-` | Checkbox label, indicator, custom content를 배치합니다. |
| 선택한 element props | <code>Omit&lt;ComponentProps&lt;T&gt;, 'id' &#124; 'children'&gt;</code> | `-` | `id`와 `children`을 제외한 props가 root element로 전달됩니다. |

## Component

### `CheckBox.Label`

Checkbox context의 id에 바인딩된 `for`를 가진 `label`을 렌더링합니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `children` | <code>JSX.Element</code> | `-` | Label 안에 렌더링할 내용입니다. |
| label HTML attributes | <code>Omit&lt;JSX.LabelHTMLAttributes&lt;HTMLLabelElement&gt;, 'for'&gt;</code> | `-` | `for`를 제외한 label attribute입니다. `for`는 context id로 고정됩니다. |

### `CheckBox.Indicator`

Checkbox context의 id에 바인딩된 `input type="checkbox"`를 렌더링하고, 그 뒤에 children을 렌더링합니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `children` | <code>JSX.Element</code> | `-` | Input 뒤에 렌더링할 custom indicator나 보조 content입니다. |
| input HTML attributes | <code>Omit&lt;JSX.InputHTMLAttributes&lt;HTMLInputElement&gt;, 'type' &#124; 'id'&gt;</code> | `-` | `type`과 `id`를 제외한 input attribute입니다. `type`은 `checkbox`, `id`는 context id로 고정됩니다. |

## 참고

레이아웃과 시각적 indicator 렌더링을 완전히 제어해야 할 때 이 primitive를 사용하세요. 스타일이 적용된 버전은 `@suis-ui/kit`의 `CheckBox`를 사용하세요.

## Examples

### Basic Checkbox

```tsx
<CheckBox id="newsletter">
  <CheckBox.Indicator />
  <CheckBox.Label>Receive newsletter</CheckBox.Label>
</CheckBox>
```

### Root Element Id

```tsx
<CheckBox as="div" id="terms-input" rootId="terms-field">
  <CheckBox.Label>I agree to the terms</CheckBox.Label>
  <CheckBox.Indicator required />
</CheckBox>
```

### Custom Indicator Content

```tsx
<CheckBox id="custom-check">
  <CheckBox.Indicator>
    <span aria-hidden="true">Selected</span>
  </CheckBox.Indicator>
  <CheckBox.Label>Use custom indicator content</CheckBox.Label>
</CheckBox>
```
