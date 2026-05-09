# Tooltip Primitive

Primitive Tooltip은 Popup을 pointer-enter 및 hover-away 동작과 조합합니다.

```tsx
import { Tooltip } from '@suis-ui/primitives';

<Tooltip openDelay={300} closeDelay={100} placement="top">
  <Tooltip.Trigger>
    <button type="button">Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Tooltip content
  </Tooltip.Content>
</Tooltip>
```

## Import

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  useTooltip,
} from '@suis-ui/primitives';
```

## Tooltip Props

`Tooltip`은 Popup props와 다음 props를 받습니다.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `openDelay` | `number` | `0` | Pointer enter 이후 열리기 전 delay입니다. |
| `closeDelay` | `number` | `0` | Pointer leave 이후 닫히기 전 delay입니다. |

## Components

### `Tooltip.Trigger`

DOM child를 popup anchor로 등록하고, pointer enter 시 `openDelay` 이후 열며 hover away 시 `closeDelay` 이후 닫습니다.

활성 상태일 때 anchor는 tooltip content id를 가리키는 `aria-describedby`를 받습니다.

### `Tooltip.Content`

Popup content를 portal에 렌더링하고 `role="tooltip"`을 적용하며 생성된 `id`를 받습니다.

## Hook

`useTooltip`은 Tooltip과 Popup context 및 Popup actions를 합쳐 반환합니다. Tooltip provider 내부에서만 호출하세요.
