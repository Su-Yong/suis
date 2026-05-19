# Item

`Item`은 `@suis-ui/kit`의 스타일 content row입니다. 선택적인 leading media, title, description, trailing action content를 하나의 row로 렌더링합니다.

```tsx
import { Button, Item } from '@suis-ui/kit';
import { Star } from 'lucide-solid';

<Item
  media={<Star />}
  title="Item title"
  description="Item description"
  action={<Button size="sm">Action</Button>}
/>;
```

## Import

```tsx
import { Item } from '@suis-ui/kit';
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `media` | `JSX.Element` | - | Leading content입니다. 보통 icon이나 작은 visual입니다. |
| `title` | `JSX.Element` | - | Main item title입니다. |
| `description` | `JSX.Element` | - | Secondary item description입니다. |
| `action` | `JSX.Element` | - | Trailing action content입니다. |
| `size` | `xs | sm | md | lg | xl` | `md` | Row padding과 radius를 제어합니다. |
| `as` | polymorphic element | `div` | 렌더링할 element입니다. |

`Item`은 `Box` 위에 구축되어 있으므로 Box style props와 선택한 `as` element의 native props도 받습니다.

## Structure

`Item`은 내부 row 구조를 소유합니다.

```tsx
<Item
  media={<Icon />}
  title="Settings"
  description="Manage preferences"
  action={<Button size="sm">Open</Button>}
/>
```

`media`와 `action` slot은 제공된 경우에만 렌더링됩니다. `title`과 `description`은 중앙 content area 안에 렌더링됩니다.

현재 `Item`은 `render*`, `*Props`, export된 part component를 노출하지 않습니다. 커스터마이징이 필요하면 `Item`에 Box props를 사용하고 `media`, `title`, `description`, `action`에 스타일 element를 전달하세요.

## Element Type

Item style을 유지하면서 다른 element를 렌더링하려면 `as`를 사용하세요.

```tsx
<Item
  as="button"
  type="button"
  title="Open command"
  description="Runs the selected command"
/>
```

`button`이나 `a` 같은 native interactive element에는 적절한 native props와 필요한 경우 접근 가능한 label을 제공하세요.

## Styling

컴포넌트별 스타일은 `component.item` theme contract에서 가져옵니다.

| Contract key | Description |
| --- | --- |
| `background` | 기본 row background입니다. |
| `color` | 기본 text color입니다. |
| `borderWidth` | Row border width입니다. |
| `borderColor` | Row border color입니다. |
| `boxShadow` | Row shadow입니다. |
| `gap` | Media, content, action 사이의 gap입니다. |
| `focus` | Focus-visible outline 값입니다. |
| `size` | `xs`, `sm`, `md`, `lg`, `xl`의 padding과 radius 값입니다. |

일회성 override에는 `bg`, `c`, `bd`, `bc`, `r`, `gap`, `w` 같은 Box props를 사용하세요.
