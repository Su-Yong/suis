# CheckBox

`CheckBox`는 `@suis-ui/kit`의 스타일 checkbox 컴포넌트입니다. Primitive checkbox root, label, input indicator를 하나의 컴포넌트 API 뒤에서 조합합니다.

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

## Import

```tsx
import { CheckBox } from '@suis-ui/kit';
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `checked` | `boolean` | 하위 checkbox input으로 전달됩니다. |
| `onChecked` | `(checked: boolean) => void` | Input change event에서 호출됩니다. |
| `inputProps` | primitive `CheckBoxIndicatorProps` | 하위 `input type="checkbox"`에 전달할 props입니다. |
| `labelProps` | primitive `CheckBoxLabelProps` | 하위 `label`에 전달할 props입니다. |
| `renderIndicator` | `(props: { checked?: boolean }) => JSX.Element` | Custom visual indicator renderer입니다. |

렌더링되는 label text는 `name` prop에서 가져옵니다.

## Custom Indicator

`inputProps`와 `labelProps`로 내부 primitive part에 props를 전달하세요. `renderIndicator`로 visual indicator를 교체하세요.

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

## 참고

`CheckBox`는 전달한 `checked` 값으로 제어됩니다. `onChecked`를 통해 signal이나 state를 동기화하세요.
