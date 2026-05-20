# Tooltip

`Tooltip`은 `@suis-ui/kit`의 스타일 tooltip 컴포넌트입니다. Primitive Tooltip을 styled content, animated presence, 선택적 arrow로 감쌉니다.

## Usage

```tsx
import { Tooltip, Button } from '@suis-ui/kit';

<Tooltip content="Delete item" withArrow>
  <Button aria-label="Delete">Delete</Button>
</Tooltip>
```

실제 primitive 구조는 다음처럼 볼 수 있습니다.

```text
Tooltip
├── TooltipTrigger
└── TooltipContent
    └── PopupPresence
        ├── TooltipArrow
        └── Content
```

Tooltip trigger는 primitive 동작에 따라 hover/focus에서 열리고, 열려 있는 동안 접근성 연결을 위해 `aria-describedby`를 받습니다.

## Props

### Content And Delay Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `children` | `JSX.Element` | 필수 | Tooltip trigger element입니다. |
| `content` | `JSX.Element` | 필수 | Tooltip content입니다. |
| `withArrow` | `boolean` 또는 `number` | - | Arrow를 렌더링합니다. 숫자를 넘기면 Floating UI arrow padding으로 사용됩니다. |
| `openDelay` | `number` | `0` | Pointer/focus 진입 후 열리기 전 delay입니다. |
| `closeDelay` | `number` | `0` | Pointer/focus 이탈 후 닫히기 전 delay입니다. |

`children`은 tooltip trigger이고, `content`는 floating content입니다. Delay props는 primitive Tooltip trigger 동작에 전달됩니다.

### Positioning Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `placement` | Floating UI `Placement` | - | 선호 placement입니다. |
| `strategy` | Floating UI `Strategy` | - | Positioning strategy입니다. |
| `offset` | Floating UI `OffsetOptions` | `4` | Trigger와 tooltip 사이의 간격입니다. |
| `shift` | `ShiftOptions` 또는 `boolean` | - | Tooltip shift middleware입니다. |
| `flip` | `FlipOptions` 또는 `boolean` | `true` | Tooltip flip middleware입니다. |
| `autoUpdate` | `AutoUpdateOptions` 또는 `boolean` | `true` | Tooltip 위치 자동 갱신입니다. |
| `middleware` | `Middleware[]` | - | 추가 Floating UI middleware입니다. |

`Tooltip`은 controlled `open` prop을 public usage로 노출하지 않습니다. 열림/닫힘 동작은 primitive Tooltip trigger가 관리합니다.

### Box Mixin Props

`Tooltip`은 content wrapper에 적용할 [Box](./box.md) props를 받습니다. `bg`, `c`, `r`, `shadow`, `p` 같은 props로 개별 tooltip surface를 조정할 수 있습니다.

## Styling

Tooltip 스타일은 `component.tooltip` theme contract에서 가져옵니다.

```ts
component.tooltip = {
  content: {
    font,
    background,
    color,
    boxShadow,
    borderRadius,
    paddingX,
    paddingY,
  },
  arrow: {
    size,
  },
}
```

`content`는 tooltip surface의 typography, background, text color, shadow, radius, padding을 제어합니다. `arrow.size`는 기본 arrow의 width/height에 사용됩니다. Arrow background는 tooltip content background와 같습니다.

Animation은 `component.popup.enter`와 `component.popup.exit` timing을 사용합니다.

### Content

`content.font`는 tooltip text typography를 제어합니다. `content.background`, `content.color`, `content.boxShadow`, `content.borderRadius`, `content.paddingX`, `content.paddingY`는 tooltip surface를 구성합니다.

### Arrow

`arrow.size`는 기본 arrow의 width와 height에 적용됩니다. Arrow background는 tooltip content background를 따르므로, content background를 바꾸면 arrow도 같은 surface처럼 보입니다.

### Animation

Tooltip animation은 `component.tooltip`이 아니라 `component.popup.enter`와 `component.popup.exit` timing을 사용합니다. Placement 기반 transform으로 tooltip이 trigger 방향에서 자연스럽게 나타납니다.

## Rendering

| 이름 | 기본값 | 설명 |
| --- | --- | --- |
| `renderArrow` | `TooltipArrow` | Arrow element를 교체합니다. |

### renderArrow

`renderArrow`는 기본 사각형을 회전한 arrow element를 교체할 때 사용합니다.

## Arrow

`withArrow`가 truthy이면 Tooltip은 Floating UI `arrow` middleware를 추가합니다. `withArrow`가 숫자이면 그 숫자가 arrow padding으로 전달되고, `true`이면 padding `4`가 사용됩니다.

## Examples

### Basic Tooltip

```tsx
<Tooltip content="Delete item">
  <Button>Delete</Button>
</Tooltip>
```

### With Arrow

```tsx
<Tooltip content="Saved automatically" withArrow>
  <Button variant="secondary">Status</Button>
</Tooltip>
```

### Delayed Tooltip

```tsx
<Tooltip
  content="This action cannot be undone"
  openDelay={300}
  closeDelay={100}
  placement="top"
>
  <Button variant="ghost">Archive</Button>
</Tooltip>
```

### Styled Content

```tsx
<Tooltip
  content="Keyboard shortcut: ⌘K"
  withArrow
  bg="surface.higher"
  c="surface.contrast"
  r="md"
  shadow="lg"
>
  <Button>Command menu</Button>
</Tooltip>
```

### Custom Arrow

```tsx
<Tooltip
  content="Custom arrow"
  withArrow={8}
  renderArrow={(props) => (
    <span {...props} class="my-tooltip-arrow" />
  )}
>
  <Button>Hover</Button>
</Tooltip>
```
