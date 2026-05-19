# Item

`Item`은 `@suis-ui/kit`의 스타일 content row입니다. 선택적인 leading media, title, description, trailing action을 하나의 row로 렌더링합니다.

## Usage

```tsx
import { Button, Item } from '@suis-ui/kit';

<Item
  media={<span aria-hidden="true">★</span>}
  title="Item title"
  description="Item description"
  action={<Button size="sm">Action</Button>}
/>;
```

실제 primitive 구조는 다음처럼 볼 수 있습니다.

```text
Item
├── Media
├── Content
│   ├── Title
│   └── Description
└── Action
```

`media`와 `action`은 값이 있을 때만 렌더링됩니다. `title`과 `description`은 중앙 content area 안에 렌더링됩니다.

## Props

### Slot Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `media` | `JSX.Element` | - | Leading slot입니다. 보통 icon, avatar, thumbnail을 넣습니다. |
| `title` | `JSX.Element` | - | Main text 영역입니다. |
| `description` | `JSX.Element` | - | Secondary text 영역입니다. |
| `action` | `JSX.Element` | - | Trailing slot입니다. 보통 button, switch, indicator를 넣습니다. |
| `size` | one of: `xs`, `sm`, `md`, `lg`, `xl` | `md` | Row padding과 radius를 선택합니다. |
| `as` | `ValidComponent` | `div` | Item style을 유지한 채 다른 element나 component를 렌더링합니다. |

### Box Mixin Props

`Item`은 [Box](./box.md) props를 함께 받습니다. `bg`, `c`, `bd`, `bc`, `r`, `gap`, `w` 같은 props로 단일 item의 layout/style을 조정할 수 있습니다.

## Styling

Item 스타일은 `component.item` theme contract에서 가져옵니다.

```ts
component.item = {
  background,
  color,
  borderWidth,
  borderColor,
  boxShadow,
  gap,
  focus: { offset, color, width },
  size: {
    xSmall: { x, y, radius },
    small: { x, y, radius },
    medium: { x, y, radius },
    large: { x, y, radius },
    xLarge: { x, y, radius },
  },
}
```

`background`, `color`, `borderWidth`, `borderColor`, `boxShadow`, `gap`은 row 전체에 적용됩니다. `size`는 각 크기의 padding과 radius를 제어합니다. `focus`는 `as="button"`이나 `as="a"`처럼 focus 가능한 element일 때 `:focus-visible` outline에 사용됩니다.

### Row Surface

`background`, `color`, `borderWidth`, `borderColor`, `boxShadow`는 item row의 기본 surface를 구성합니다. `gap`은 media, content, action 사이의 간격으로 사용됩니다.

### Size

`size`는 `xs`, `sm`, `md`, `lg`, `xl` prop 값과 연결됩니다. 각 size token의 `x`, `y`는 row padding에 사용되고, `radius`는 row border radius에 적용됩니다.

### Focus

`focus`는 item이 focus 가능한 element로 렌더링될 때 `:focus-visible` outline을 제어합니다. Button-like item이나 link item을 만들 때 keyboard focus 상태가 이 token의 영향을 받습니다.

## Composition

현재 `Item`은 `render*`, `*Props`, export된 part component를 제공하지 않습니다. 내부 구조를 직접 바꾸기보다는 `media`, `title`, `description`, `action` slot에 원하는 element를 넣고, outer row에는 Box props를 적용하세요.

Interactive item을 만들 때는 `as="button"` 또는 `as="a"`를 사용하고, 해당 native element에 필요한 props를 함께 전달합니다.

## Examples

### Basic Item

```tsx
<Item
  media={<span aria-hidden="true">★</span>}
  title="Favorites"
  description="Pinned items and shortcuts"
/>
```

### With Action

```tsx
<Item
  title="Notifications"
  description="Email and push preferences"
  action={<Button size="sm" variant="secondary">Edit</Button>}
/>
```

### Interactive Button Item

```tsx
<Item
  as="button"
  type="button"
  title="Open command"
  description="Runs the selected command"
  action={<span aria-hidden="true">›</span>}
/>
```

### Link Item

```tsx
<Item
  as="a"
  href="/billing"
  title="Billing"
  description="Invoices and payment methods"
/>
```

### Custom Slot Content

```tsx
<Item
  media={<Box w="32px" h="32px" r="xl" bg="primary.main" />}
  title={<Box as="strong">Workspace</Box>}
  description={<Box c="text.caption">12 members</Box>}
  action={<Button type="icon" aria-label="Open workspace">›</Button>}
/>
```
