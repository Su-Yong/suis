# Box

`Box`는 `@suis-ui/kit`의 기본 레이아웃 컴포넌트입니다. 기본적으로 `div`를 렌더링하고, `as`로 렌더링 대상을 바꾸며, SUIS spacing, color, text, border, radius, size 토큰을 prop으로 적용합니다.

## Usage

```tsx
import { Box } from '@suis-ui/kit';

<Box direction="row" align="center" gap="md" p="lg" bg="surface.main" r="md">
  Content
</Box>
```

실제 primitive 구조는 다음처럼 볼 수 있습니다.

```text
Box
└── Polymorphic
```

선택한 element의 native props도 함께 사용할 수 있습니다.

```tsx
<Box as="section" aria-labelledby="profile-title" p="lg">
  <h2 id="profile-title">Profile</h2>
</Box>
```

## Props

### Element Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `as` | `ValidComponent` | `div` | 렌더링할 HTML element 또는 Solid component입니다. |
| `props` | `Record<string, unknown>` | - | 내부 `Polymorphic`에 마지막으로 병합할 escape hatch props입니다. |

`Box`는 polymorphic component이므로 `as`로 선택한 element의 native props도 함께 받습니다. 예를 들어 `as="a"`이면 `href`, `target` 같은 anchor props를 사용할 수 있습니다. 필요한 attribute가 타입으로 잘 표현되지 않을 때만 `props` escape hatch를 사용하세요.

### Layout Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `pos` | one of: `relative`, `absolute`, `fixed`, `sticky` | - | `position` 값을 설정합니다. |
| `direction` | one of: `row`, `row-reverse`, `column`, `column-reverse` | `column` | Flex direction입니다. `null`을 전달하면 기본값을 적용하지 않습니다. |
| `justify` | CSS `justify-content` preset | - | Main axis 정렬입니다. |
| `align` | CSS `align-items` preset | - | Cross axis 정렬입니다. |
| `wrap` | one of: `nowrap`, `wrap`, `wrap-reverse` | - | Flex wrapping입니다. |
| `gap` | space token | - | Flex gap입니다. |

`justify`는 `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`를 지원합니다. `align`은 `flex-start`, `flex-end`, `center`, `baseline`, `stretch`를 지원합니다. `gap`에는 SUIS space token이 들어갑니다.

### Spacing Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` | space token | - | Padding shortcut입니다. |
| `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | space token | - | Margin shortcut입니다. |

Spacing props는 SUIS space token을 받습니다. `p`, `m`은 전체 방향에 적용되고, `x`, `y`, `t`, `b`, `l`, `r` suffix는 축 또는 방향별 값을 설정합니다.

### Size And Position Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `w`, `h` | `string` | - | Width와 height입니다. |
| `minW`, `minH`, `maxW`, `maxH` | `string` | - | 최소/최대 width와 height입니다. |
| `flex` | `string`, `number`, `boolean` | - | Flex 값입니다. `true`는 `flex: 1`로 처리됩니다. |
| `top`, `right`, `bottom`, `left` | `string` | - | Positioned element의 inset 값입니다. |
| `z` | `string`, `number` | - | `z-index` 값입니다. |

크기와 위치 props는 token key가 아니라 CSS length 문자열을 직접 받습니다. 예를 들어 `w="min(100%, 720px)"`, `maxH="50vh"`처럼 사용할 수 있습니다.

### Color Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `c` | color token | `inherit` | Text color입니다. `null`을 전달하면 기본값을 적용하지 않습니다. |
| `bg` | color token | - | Background color입니다. |
| `bc`, `blc`, `brc`, `btc`, `bbc` | color token | - | 전체 또는 방향별 border color입니다. |

Color props는 SUIS color token을 받습니다. `c`는 text color, `bg`는 background, `bc` 계열은 border color에 적용됩니다.

### Border Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `bd`, `bdl`, `bdr`, `bdt`, `bdb` | line-size token | - | 전체 또는 방향별 border width입니다. border style은 `solid`입니다. |

Border width props는 line-size token을 받습니다. 방향별 border color는 `blc`, `brc`, `btc`, `bbc`로 설정합니다.

### Radius, Text, And Effect Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `r`, `tlr`, `trr`, `blr`, `brr` | radius token | - | 전체 또는 corner별 border radius입니다. |
| `text` | font token | `body` | Semantic text style입니다. `null`을 전달하면 기본값을 적용하지 않습니다. |
| `shadow` | shadow token | - | Box shadow입니다. |
| `overflow` | overflow preset | - | `overflow`, `overflow-x`, `overflow-y` preset입니다. |

Radius props는 SUIS radius token을 받습니다. `text`는 font token 전체를 적용하고, `shadow`는 shadow token을 적용합니다. `overflow`는 `auto`, `hidden`, `visible`, `scroll`, `xAuto`, `xHidden`, `xVisible`, `xScroll`, `yAuto`, `yHidden`, `yVisible`, `yScroll`을 지원합니다.

`Box`는 별도의 `component.box` 토큰을 사용하지 않습니다. 대신 theme의 token map을 직접 recipe variant로 연결합니다.

```ts
boxStyle({
  gap: 'md',
  p: 'lg',
  bg: 'surface.main',
  text: 'body',
});
```

고정 token 값만으로 표현하기 어려운 크기와 위치 값은 inline CSS variable로 적용됩니다.

```tsx
<Box w="min(100%, 720px)" maxH="50vh" overflow="yAuto" />
```

우선순위가 필요한 경우 일반적으로 `class`, `classList`, `style`을 직접 넘기기보다 먼저 Box props를 사용하세요. Box props로 표현하기 어려운 attribute나 component-specific prop이 필요할 때만 `props` escape hatch를 사용합니다.

## Examples

### Basic Stack

```tsx
import { Box, Button } from '@suis-ui/kit';

<Box gap="md" p="lg" bg="surface.main" r="lg" shadow="sm">
  <Box as="h2" text="title" m="none">
    Account
  </Box>
  <Box c="text.caption">
    Manage profile and notification settings.
  </Box>
  <Button variant="primary">Save</Button>
</Box>
```

### Horizontal Layout

```tsx
<Box direction="row" align="center" justify="space-between" gap="md">
  <Box>
    <Box text="title">Storage</Box>
    <Box text="caption" c="text.caption">24 GB used</Box>
  </Box>
  <Button variant="secondary" size="sm">
    Upgrade
  </Button>
</Box>
```

### Polymorphic Element

```tsx
<Box
  as="a"
  href="/settings"
  direction="row"
  align="center"
  gap="sm"
  p="md"
  r="md"
  bg="surface.high"
>
  Open settings
</Box>
```

### Positioned Element

```tsx
<Box pos="relative" p="lg" bg="surface.main" r="lg">
  <Box pos="absolute" top="8px" right="8px" z={1}>
    New
  </Box>
  Card content
</Box>
```

### Escape Hatch

```tsx
<Box
  as="div"
  props={{ role: 'presentation', 'data-testid': 'layout-shell' }}
/>
```
