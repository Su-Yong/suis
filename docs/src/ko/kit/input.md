# Input

`Input`은 `@suis-ui/kit`의 스타일 form input 컴포넌트입니다. `Box`를 `input` 또는 `textarea`로 렌더링하고, 해당 element에 kit input class를 추가합니다.

## Usage

```tsx
import { Input } from '@suis-ui/kit';

<Input placeholder="Email" type="email" />;
```

실제 primitive 구조는 다음처럼 볼 수 있습니다.

```text
Input
└── Box
    └── Polymorphic(input | textarea)
```

`Input`은 [Box](./box.md) props를 받기 때문에 `w`, `minH`, `m`, `text` 같은 layout/style props를 함께 사용할 수 있습니다.

## Props

### Input Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `as` | one of: `input`, `textarea` | `input` | 렌더링할 form element를 선택합니다. |
| native input props | `JSX.InputHTMLAttributes<HTMLInputElement>` | - | `type`, `value`, `placeholder`, `disabled`, `onInput` 같은 native input props입니다. |
| Box props | [Box props](./box.md) | - | 크기, margin, text, color 등 layout/style props입니다. |

`as="textarea"`를 사용하면 textarea style class가 적용되고 기본 width가 `100%`, 최소 높이가 `6lh`로 설정됩니다.

### Box Mixin Props

`Input`은 [Box](./box.md) 위에 구축되어 `w`, `minH`, `maxW`, `m`, `text` 같은 layout/style props를 받습니다. Text input 자체의 surface color와 border는 `component.input` token이 우선 담당하고, 개별 크기 조정은 Box props로 처리합니다.

## Styling

Input 스타일은 `component.input` theme contract에서 가져옵니다.

```ts
component.input = {
  focus: { offset, color, width },
  default: {
    background,
    color,
    borderWidth,
    borderColor,
    borderRadius,
    paddingX,
    paddingY,
  },
  hover: { background, color, borderWidth, borderColor, borderRadius },
  active: { background, color, borderWidth, borderColor, borderRadius },
  placeholder: { color },
  file: {
    background,
    color,
    borderWidth,
    borderColor,
    borderRadius,
    paddingX,
    paddingY,
  },
}
```

`default`, `hover`, `active`는 input surface의 background, text color, border, radius를 제어합니다. `placeholder.color`는 placeholder text에 적용됩니다. `file`은 `input[type="file"]`의 `::file-selector-button` 스타일에 사용됩니다.

### Default, Hover, Active

`default`는 input의 기본 surface입니다. `hover`는 pointer hover 상태에서 background, color, border를 바꿉니다. `active`는 active 상태에서 같은 surface 항목을 바꿉니다. 세 state 모두 border radius를 포함하므로 state별 radius도 theme에서 조정할 수 있습니다.

### Placeholder

`placeholder.color`는 `::placeholder` text color에 적용됩니다. 입력 전 안내 문구의 시각적 위계를 낮추고 싶을 때 이 값을 조정합니다.

### File

`file`은 `input[type="file"]`의 `::file-selector-button`에 적용됩니다. File picker 버튼의 background, color, border, radius, padding을 input surface와 별도로 제어합니다.

### Focus

`focus`는 input focus outline을 위한 token입니다. `input`, `textarea`, `type="file"` 모두 `:focus-visible` 상태에서 `component.input.focus.offset`, `color`, `width`를 사용합니다.

## Examples

### Text Input

```tsx
<Input
  type="text"
  placeholder="Search"
  w="320px"
/>
```

### Email Input

```tsx
<Input
  type="email"
  name="email"
  autocomplete="email"
  placeholder="you@example.com"
/>
```

### Textarea

```tsx
<Input
  as="textarea"
  placeholder="Message"
  minH="120px"
/>
```

### File Input

```tsx
<Input
  type="file"
  accept="image/*"
/>
```

### With Box Layout Props

```tsx
<Input
  placeholder="Full width"
  w="100%"
  maxW="480px"
  m="none"
/>
```
