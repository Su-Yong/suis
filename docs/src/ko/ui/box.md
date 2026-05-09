# Box

`Box`는 `@suis-ui/kit`의 기본 스타일 레이아웃 컴포넌트입니다. Polymorphic element를 렌더링하고 기본값은 `div`이며, SUIS spacing, color, text, border, radius, size props를 적용합니다.

```tsx
import { Box } from '@suis-ui/kit';

<Box
  direction="row"
  align="center"
  gap="md"
  p="lg"
  bg="surface.main"
  r="md"
>
  Content
</Box>
```

## Import

```tsx
import { Box } from '@suis-ui/kit';
```

## Element Type

`as`를 사용해 렌더링할 element나 component를 선택합니다.

```tsx
<Box as="section" p="lg">
  Section content
</Box>
```

`Box`는 polymorphic type을 통해 선택한 element의 native props를 받습니다.

## Layout Props

| Prop | Values |
| --- | --- |
| `pos` | `relative`, `absolute`, `fixed`, `sticky` |
| `direction` | `row`, `row-reverse`, `column`, `column-reverse` |
| `justify` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `align` | `flex-start`, `flex-end`, `center`, `baseline`, `stretch` |
| `wrap` | `nowrap`, `wrap`, `wrap-reverse` |
| `gap` | SUIS space map의 임의 key |

기본 display는 `flex`입니다. 기본 direction은 `column`입니다.

## Spacing Props

Padding props: `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`.

Margin props: `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr`.

각 spacing prop은 semantic space key와 `token.*` space key를 포함해 SUIS space map의 key를 받습니다.

## Size Props

| Prop | Type |
| --- | --- |
| `w` | `string` |
| `h` | `string` |
| `minW` | `string` |
| `minH` | `string` |
| `maxW` | `string` |
| `maxH` | `string` |
| `flex` | `string | number | boolean` |

`flex`가 `true`이면 `Box`는 `flex: 1`을 씁니다.

## Color, Border, Radius, Text Props

| Prop | Description |
| --- | --- |
| `c` | SUIS color map의 text color |
| `bg` | SUIS color map의 background color |
| `bc` | SUIS color map의 border color |
| `bw` | `vars.size.line`의 border width 또는 `bc`가 설정되었을 때 자동 활성화 |
| `r` | 모든 corner의 border radius |
| `tlr`, `trr`, `blr`, `brr` | Corner별 radius 값 |
| `text` | `vars.font`의 semantic font style |

기본 text color는 `text.main`이고 기본 text style은 `body`입니다.

## Escape Hatch

`props`를 사용해 하위 `Polymorphic` 컴포넌트에 마지막 props set을 전달할 수 있습니다.

```tsx
<Box
  as="div"
  props={{ role: 'presentation' }}
/>
```

먼저 일반 typed props를 선호하세요. 필요한 attribute가 generic type으로 잘 표현되지 않을 때만 `props`를 사용하세요.
