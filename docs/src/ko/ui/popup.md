# Popup

`Popup`은 `@suis-ui/kit`의 스타일 popup 컴포넌트입니다. Primitive Popup을 animated presence와 스타일 content placement로 감쌉니다.

```tsx
import { Popup, Button, Box } from '@suis-ui/kit';

<Popup
  placement="bottom-start"
  element={<Box p="md">Popup content</Box>}
>
  <Button>Open</Button>
</Popup>
```

## Import

```tsx
import { Popup } from '@suis-ui/kit';
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `JSX.Element` | Anchor 또는 trigger element입니다. |
| `element` | `JSX.Element` | Portal에 렌더링되는 popup content입니다. |
| `open` | `boolean` | 제공되면 open state를 외부에서 제어합니다. |
| `placement` | Floating UI `Placement` | 선호 placement입니다. |
| `strategy` | Floating UI `Strategy` | Positioning strategy입니다. |
| `offset` | Floating UI `OffsetOptions` | Offset middleware config입니다. |
| `shift` | `ShiftOptions | boolean` | Shift middleware를 활성화하거나 설정합니다. |
| `flip` | `FlipOptions | boolean` | Flip middleware를 활성화하거나 설정합니다. |
| `autoUpdate` | `AutoUpdateOptions | boolean` | Automatic positioning update를 활성화하거나 설정합니다. |
| `middleware` | `Middleware[]` | 추가 Floating UI middleware입니다. |
| `animation` | `PopupAnimation` | Custom enter/exit animation class입니다. |

`Popup`은 popup content wrapper에 적용할 Box props도 받습니다.

Popup은 primitive `Popup.Anchor`, `Popup.Trigger`, `Popup.Element`를 하나의 스타일 컴포넌트 뒤에 둡니다. Content wrapper를 커스터마이징하려면 Box props를 전달하고, 렌더링할 popup content에는 `element`를 사용하세요.

## Trigger Behavior

`open`이 제공되지 않으면 child는 click trigger로 사용되어 popup을 toggle합니다.

`open`이 제공되면 child는 anchor로만 사용됩니다. 자신의 state에서 `open` 값을 업데이트하세요.

```tsx
<Popup
  open={isOpen()}
  placement="right"
  element={<Box p="md">Controlled content</Box>}
>
  <Button onClick={() => setIsOpen(!isOpen())}>Toggle</Button>
</Popup>
```

## Positioning

Positioning은 `@floating-ui/dom`이 처리합니다. 기본 `autoUpdate` 동작은 primitive Popup에서 가져옵니다. Popup에 collision handling이나 custom sizing이 필요하면 `offset`, `shift`, `flip`, `middleware`를 전달하세요.
