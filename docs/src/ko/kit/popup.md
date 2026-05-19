# Popup

`Popup`은 `@suis-ui/kit`의 스타일 popup 컴포넌트입니다. primitive Popup을 animated presence와 content wrapper로 감싸고, positioning은 `@floating-ui/dom` 기반 props로 제어합니다.

## Usage

```tsx
import { Popup, Button, Box } from '@suis-ui/kit';

<Popup
  placement="bottom-start"
  element={<Box p="md">Popup content</Box>}
>
  <Button>Open</Button>
</Popup>
```

실제 primitive 구조는 다음처럼 볼 수 있습니다.

```text
Popup
├── PopupTrigger | PopupAnchor
└── PopupElement
    └── PopupPresence
        └── Element
```

`open`이 `boolean`으로 제공되면 trigger 대신 anchor로 렌더링됩니다. 이 경우 click toggle은 자동으로 연결되지 않으므로, child element에서 직접 state를 업데이트해야 합니다.

## Props

### Content And State Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `children` | `JSX.Element` | 필수 | Anchor 또는 trigger element입니다. |
| `element` | `JSX.Element` | 필수 | Popup content 안에 렌더링할 element입니다. |
| `open` | `boolean` | - | 제공되면 open state를 외부에서 제어합니다. |
| `animation` | `Record<'enter' 또는 'exit', string>` | 기본 scale/fade animation | enter/exit animation class map입니다. |

`children`은 popup의 위치 기준입니다. `element`는 실제 popup body입니다. `open`을 넘기지 않으면 uncontrolled trigger로 동작하고, `open`을 넘기면 controlled anchor로 동작합니다.

### Positioning Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `placement` | Floating UI `Placement` | - | 선호 placement입니다. |
| `strategy` | Floating UI `Strategy` | - | Positioning strategy입니다. |
| `offset` | Floating UI `OffsetOptions` | - | Offset middleware config입니다. |
| `shift` | `ShiftOptions` 또는 `boolean` | - | Viewport 안으로 이동시키는 shift middleware입니다. |
| `flip` | `FlipOptions` 또는 `boolean` | - | 공간이 부족할 때 반대쪽 placement를 시도합니다. |
| `autoUpdate` | `AutoUpdateOptions` 또는 `boolean` | `true` | Scroll, resize, layout change에 맞춰 위치를 갱신합니다. |
| `middleware` | `Middleware[]` | - | 추가 Floating UI middleware입니다. |

Positioning props는 primitive [Popup](../primitives/popup.md)과 Floating UI middleware로 전달됩니다. Collision handling이 필요하면 `shift`, `flip`, `middleware`를 조합하세요.

### Box Mixin Props

`Popup`은 content wrapper에 적용할 [Box](./box.md) props를 받습니다. `p`, `bg`, `r`, `shadow` 같은 시각적 스타일은 보통 `element` 안의 `Box` 또는 Popup에 전달한 Box props로 적용합니다.

## Styling

Popup animation timing은 `component.popup` theme contract에서 가져옵니다.

```ts
component.popup = {
  enter: {
    duration,
    easing,
  },
  exit: {
    duration,
    easing,
  },
}
```

기본 popup animation은 opacity와 scale을 사용합니다. Transform origin은 실제 placement에 맞춰 계산되는 CSS variable을 사용하므로, `top`, `bottom-start`, `right` 같은 placement에 따라 animation 기준점이 달라집니다.

Popup content의 background, padding, radius, shadow는 Popup 자체 토큰이 아니라 전달한 `element` 또는 content wrapper의 Box props로 조정합니다.

### Enter

`enter.duration`과 `enter.easing`은 popup이 열릴 때 적용되는 animation timing입니다. 기본 animation은 opacity와 scale을 사용하고, transform origin은 placement에 따라 계산됩니다.

### Exit

`exit.duration`과 `exit.easing`은 popup이 닫힐 때 적용되는 animation timing입니다. Exit 상태에서는 pointer events가 비활성화되어 닫히는 중의 상호작용을 막습니다.

## Trigger Behavior

Uncontrolled 모드에서는 `children`이 `PrimitivePopup.Trigger`로 감싸지고 click으로 popup을 toggle합니다.

```tsx
<Popup element={<Box p="md">Menu</Box>}>
  <Button>Open menu</Button>
</Popup>
```

Controlled 모드에서는 `children`이 `PrimitivePopup.Anchor`로 감싸집니다. `open` 값만 전달되므로 trigger event는 직접 작성합니다.

```tsx
import { createSignal } from 'solid-js';
import { Popup, Button, Box } from '@suis-ui/kit';

const [open, setOpen] = createSignal(false);

<Popup
  open={open()}
  placement="right"
  element={<Box p="md">Controlled content</Box>}
>
  <Button onClick={() => setOpen(!open())}>Toggle</Button>
</Popup>
```

## Examples

### Basic Popup

```tsx
<Popup
  element={
    <Box p="md" bg="surface.main" r="md" shadow="md">
      Popup content
    </Box>
  }
>
  <Button>Open</Button>
</Popup>
```

### Placement And Offset

```tsx
<Popup
  placement="bottom-start"
  offset={8}
  shift
  flip
  element={<Box p="md" bg="surface.main" r="md">Actions</Box>}
>
  <Button variant="secondary">More</Button>
</Popup>
```

### Styled Wrapper

```tsx
<Popup
  p="xs"
  bg="surface.main"
  r="lg"
  shadow="xl"
  element={
    <Box gap="xs">
      <Button variant="ghost">Rename</Button>
      <Button variant="ghost">Archive</Button>
    </Box>
  }
>
  <Button>Open menu</Button>
</Popup>
```

### Controlled Popup

```tsx
const [open, setOpen] = createSignal(false);

<Popup
  open={open()}
  placement="top"
  element={<Box p="md">Saved</Box>}
>
  <Button onClick={() => setOpen(!open())}>
    Toggle feedback
  </Button>
</Popup>
```
