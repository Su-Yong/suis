# CheckBox

`CheckBox`는 `@suis-ui/kit`의 스타일 checkbox 컴포넌트입니다. primitive checkbox root, label, input indicator를 하나의 컴포넌트 API 뒤에서 조합합니다.

## Usage

```tsx
import { createSignal } from 'solid-js';
import { CheckBox } from '@suis-ui/kit';

const [checked, setChecked] = createSignal(false);

<CheckBox
  name="Receive updates"
  checked={checked()}
  onChecked={setChecked}
/>;
```

실제 primitive 구조는 다음처럼 볼 수 있습니다.

```text
CheckBox
└── PrimitiveCheckBox
    └── CheckBoxLabel
        ├── CheckBoxIndicator(input)
        │   └── Indicator
        └── LabelText
```

`checked` 값을 직접 전달하고 `onChecked`로 상태를 동기화하는 controlled 사용을 기본으로 생각하면 됩니다.

## Props

### State Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `name` | `string` | - | 렌더링되는 label text입니다. |
| `checked` | `boolean` | - | 내부 checkbox input의 checked 상태입니다. |
| `onChecked` | `(checked: boolean) => void` | - | Input change event에서 다음 checked 값을 받아 호출됩니다. |

Primitive root의 `id`, `rootId`, polymorphic props는 [primitive CheckBox](../primitives/checkbox.md)를 참고하세요.

## Styling

CheckBox 스타일은 `component.checkbox` theme contract에서 가져옵니다.

```ts
component.checkbox = {
  active,
  transition,
  indicator: {
    size,
    borderWidth,
    borderColor,
    hover,
    active,
  },
  check: {
    size,
    color,
    hover,
    active,
  },
}
```

`indicator`는 원형 checkbox 박스의 크기, border, hover/active background를 제어합니다. `active`는 checked 상태의 채움 색상입니다. `check`는 기본 check svg의 크기와 색상을 제어합니다.

### Indicator

`indicator.size`는 checkbox visual box의 width와 height에 모두 사용됩니다. `indicator.borderWidth`와 `indicator.borderColor`는 unchecked 상태의 border를 만들고, `indicator.hover`와 `indicator.active`는 hover/active feedback background에 사용됩니다.

### Check

`check.size`는 기본 check svg의 크기를 제어합니다. `check.color`는 checked 상태의 기본 색상이고, `check.hover`, `check.active`는 label hover/active 상태에서 check icon color로 적용됩니다.

### Active And Transition

`active`는 checked 상태에서 indicator를 채우는 색상입니다. `transition`은 indicator와 check icon의 상태 전환에 사용됩니다.

현재 focus-visible outline은 `component.button.focus` 값을 사용합니다. Checkbox만 별도로 focus outline을 바꾸려면 custom class나 theme 구조 변경이 필요합니다.

## Rendering

| 이름 | 기본값 | 설명 |
| --- | --- | --- |
| `inputProps` | - | 내부 `input type="checkbox"`에 전달할 props입니다. |
| `labelProps` | - | 내부 `label`에 전달할 props입니다. |
| `renderIndicator` | 기본 check icon | 시각적 indicator를 교체합니다. |

### inputProps

`inputProps`는 내부 `input type="checkbox"`에 전달됩니다. `required`, `disabled`, `aria-*`, `class`, `classList`처럼 input 자체에 필요한 props를 넣을 때 사용합니다.

### labelProps

`labelProps`는 checkbox label wrapper에 전달됩니다. Label에 class, data attribute, event handler를 붙일 때 사용합니다.

### renderIndicator

`renderIndicator`는 기본 check svg를 완전히 교체합니다. 이 함수는 `{ checked }`를 받고, 반환한 element는 내부 input 다음의 visual indicator 위치에 렌더링됩니다.

```tsx
<CheckBox
  name="Enabled"
  checked={enabled()}
  onChecked={setEnabled}
  renderIndicator={(props) => (
    <span>{props.checked ? 'on' : 'off'}</span>
  )}
/>;
```

Custom indicator를 사용할 때도 checked state는 내부 input이 소유합니다. 시각 요소만 교체하고 input/label 구조는 유지됩니다.

## Examples

### Controlled CheckBox

```tsx
import { createSignal } from 'solid-js';
import { CheckBox } from '@suis-ui/kit';

const [checked, setChecked] = createSignal(false);

<CheckBox
  name="Marketing emails"
  checked={checked()}
  onChecked={setChecked}
/>;
```

### Required Field

```tsx
<CheckBox
  name="I agree to the terms"
  checked={agreed()}
  onChecked={setAgreed}
  inputProps={{ required: true }}
/>
```

### Custom Label Props

```tsx
<CheckBox
  name="Compact mode"
  checked={compact()}
  onChecked={setCompact}
  labelProps={{ class: 'settings-checkbox', 'data-density': 'compact' }}
/>
```

### Custom Indicator

```tsx
<CheckBox
  name="Favorite"
  checked={favorite()}
  onChecked={setFavorite}
  renderIndicator={(props) => (
    <span aria-hidden="true">
      {props.checked ? '★' : '☆'}
    </span>
  )}
/>
```
