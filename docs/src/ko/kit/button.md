# Button

`Button`은 `@suis-ui/kit`의 스타일 button 컴포넌트입니다. `Box` 위에 구축되어 Box style props와 선택한 element의 native props를 함께 받습니다.

## Usage

```tsx
import { Button } from '@suis-ui/kit';

<Button variant="primary" size="md">
  Save
</Button>
```

실제 primitive 구조는 다음처럼 볼 수 있습니다.

```text
Button
└── Box
    └── Polymorphic(button)
```

`Button`의 `type` prop은 HTML button type이 아니라 kit layout type입니다. Form submit button이 필요하면 현재 API에서는 `props` escape hatch로 native type을 전달하세요.

```tsx
<Button props={{ type: 'submit' }} variant="primary">
  Submit
</Button>
```

## Props

### Button Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `variant` | one of: `default`, `primary`, `secondary`, `ghost` | `default` | Button의 색상, border, shadow state를 선택합니다. |
| `type` | one of: `button`, `icon` | `button` | Layout type입니다. `icon`은 x/y padding 대신 정사각 padding을 사용합니다. |
| `size` | one of: `xs`, `sm`, `md`, `lg`, `xl` | `md` | Padding과 radius token을 선택합니다. |
| `active` | `boolean` | `false` | Active visual state를 강제로 적용합니다. |
| `disabled` | native button prop | `false` | Native disabled behavior와 disabled opacity/cursor를 적용합니다. |
| `as` | `ValidComponent` | `button` | Button style을 유지한 채 다른 element나 component를 렌더링합니다. |

`Button`의 `type`은 kit layout type입니다. Native form submit/reset type이 필요하면 [Box](./box.md)의 `props` escape hatch로 native `type="submit"` 값을 전달하세요.

### Box Mixin Props

`Button`은 [Box](./box.md) props를 함께 받습니다. `w`, `gap`, `bg`, `c`, `m`, `r`, `shadow` 같은 props로 일회성 layout/style override를 적용할 수 있습니다. `as`로 `a`나 custom component를 렌더링하면 해당 element의 native props도 함께 사용할 수 있습니다.

## Styling

Button 스타일은 `component.button` theme contract에서 가져옵니다.

```ts
component.button = {
  focus: { offset, color, width },
  disabled: { opacity },
  size: {
    xSmall: { x, y, radius },
    small: { x, y, radius },
    medium: { x, y, radius },
    large: { x, y, radius },
    xLarge: { x, y, radius },
  },
  font: {
    xSmall,
    small,
    medium,
    large,
    xLarge,
  },
  variants: {
    default: { default, hover, active },
    primary: { default, hover, active },
    secondary: { default, hover, active },
    ghost: { default, hover, active },
  },
}
```

각 `variants.*.*` state는 `background`, `color`, `borderWidth`, `borderColor`, `boxShadow`를 가집니다. `size`는 padding과 radius에, `font`는 size별 typography에 사용됩니다. `focus`는 `:focus-visible` outline에, `disabled.opacity`는 disabled 상태에 사용됩니다.

### Size

`size`는 `xs`, `sm`, `md`, `lg`, `xl` prop 값과 연결됩니다. 각 size token의 `x`와 `y`는 일반 버튼의 horizontal/vertical padding에 사용되고, `radius`는 border radius에 적용됩니다. `type="icon"`일 때는 `x` 값이 사방 padding으로 사용되어 정사각 버튼에 가깝게 렌더링됩니다.

### Font

`font`는 size별 typography token입니다. 각 `font.*` 값의 `fontSize`, `lineHeight`, `fontWeight`, `letterSpacing`이 같은 size의 버튼에 적용됩니다. Button은 기본 Box text style을 끄고 이 token을 우선 사용하며, 단일 버튼만 바꿔야 할 때는 `text` prop으로 override할 수 있습니다.

### Variants

`variants`는 `default`, `primary`, `secondary`, `ghost`로 나뉘고 각 variant는 `default`, `hover`, `active` state를 가집니다. 각 state의 background, color, border, shadow 값을 바꾸면 해당 variant의 모든 버튼 상태가 함께 바뀝니다.

### Focus And Disabled

`focus`는 keyboard focus에서 보이는 outline의 offset, color, width를 제어합니다. `disabled.opacity`는 disabled 상태의 투명도를 제어하고, disabled button은 hover style을 적용하지 않습니다.

컴포넌트 전역 스타일을 바꾸려면 [커스터마이징](../customization.md)의 `createTheme({ component: { button: ... } })`를 사용하세요. 특정 버튼 하나만 바꿀 때는 먼저 Box props를 사용하고, 필요한 경우 `class`나 `style`을 추가합니다.

## Accessibility

비활성화된 native button에는 `disabled`를 사용하세요. `type="icon"` 버튼처럼 텍스트가 보이지 않는 버튼에는 `aria-label`을 제공해야 합니다.

```tsx
<Button type="icon" aria-label="Close">
  ×
</Button>
```

## Examples

### Variants

```tsx
<Box direction="row" gap="sm">
  <Button variant="default">Default</Button>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
</Box>
```

### Sizes

```tsx
<Box direction="row" align="center" gap="sm">
  <Button size="xs">XS</Button>
  <Button size="sm">SM</Button>
  <Button size="md">MD</Button>
  <Button size="lg">LG</Button>
  <Button size="xl">XL</Button>
</Box>
```

### Icon Button

```tsx
<Button type="icon" size="sm" aria-label="Add item">
  +
</Button>
```

### Active And Disabled

```tsx
<Box direction="row" gap="sm">
  <Button active>Active</Button>
  <Button disabled>Disabled</Button>
</Box>
```

### Polymorphic Link

```tsx
<Button as="a" href="/settings" variant="secondary">
  Settings
</Button>
```
