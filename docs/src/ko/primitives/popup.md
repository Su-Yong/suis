# Popup Primitive

Primitive Popup은 popup state, anchor 등록, trigger 동작, portal 렌더링, Floating UI positioning을 제공합니다.

```tsx
import { Popup } from '@suis-ui/primitives';

<Popup placement="bottom-start" offset={4} flip>
  <Popup.Trigger>
    <button type="button">Open</button>
  </Popup.Trigger>
  <Popup.Element>
    {(style) => (
      <div style={style()}>
        Popup content
      </div>
    )}
  </Popup.Element>
</Popup>
```

## Import

```tsx
import {
  Popup,
  PopupAnchor,
  PopupTrigger,
  PopupElement,
  usePopup,
  createPopupController,
  createClickAway,
  createHoverAway,
} from '@suis-ui/primitives';
```

## Popup Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Controlled open request value입니다. |
| `placement` | Floating UI `Placement` | Floating UI default | 선호 placement입니다. |
| `strategy` | Floating UI `Strategy` | Floating UI default | CSS positioning strategy입니다. |
| `offset` | `OffsetOptions` | none | Offset middleware를 활성화합니다. |
| `shift` | `ShiftOptions | boolean` | none | Shift middleware를 활성화합니다. |
| `flip` | `FlipOptions | boolean` | none | Flip middleware를 활성화합니다. |
| `autoUpdate` | `AutoUpdateOptions | boolean` | `true` | Layout이 바뀔 때 position을 다시 계산합니다. |
| `middleware` | `Middleware[]` | none | 추가 Floating UI middleware입니다. |
| `children` | `JSX.Element` | required | Popup composition입니다. |

## Components

### `Popup.Anchor`

DOM child를 positioning anchor로 등록합니다. Controlled popup이나 custom trigger 동작에 사용하세요.

### `Popup.Trigger`

`Popup.Anchor`를 감싸고 anchor가 클릭될 때 popup을 toggle합니다.

### `Popup.Element`

마운트된 popup content를 portal에 렌더링합니다. Child는 계산된 style accessor를 받는 render function입니다.

```tsx
<Popup.Element>
  {(style) => <div style={style()}>Content</div>}
</Popup.Element>
```

## State Hooks

`usePopup`은 `[context, actions]`를 반환합니다.

Context에는 `anchor`, `element`, `position`, `open`, `mount`가 포함됩니다. Action object에는 `requestOpen(open)`이 포함됩니다.

`createPopupController(controller)`는 async controller를 등록합니다. Controller는 요청된 open state를 받고 popup을 mount해야 하는지 반환합니다. Kit은 enter/exit animation에 이것을 사용합니다.

## Away Helpers

`createClickAway(onClickAway)`는 document click listener를 등록하고 target 밖에서 click이 발생하면 `onClickAway(cleanUp)`을 호출합니다.

`createHoverAway(onHoverAway)`는 target에 `pointerleave`와 `pointerenter` listener를 등록합니다. Pointer가 다시 들어오지 않으면 선택적 delay 후 `onHoverAway(cleanUp)`을 호출합니다.

두 helper 모두 cleanup function을 반환합니다. 소유한 컴포넌트가 dispose될 때 항상 cleanup을 호출하세요.
