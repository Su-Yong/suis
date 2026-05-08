# Tooltip

`Tooltip`은 `@suis-ui/kit`의 스타일 tooltip 컴포넌트입니다. Primitive Tooltip을 스타일 content, animated presence, 선택적 arrow로 감쌉니다.

```tsx
import { Tooltip, Button } from '@suis-ui/kit';

<Tooltip content="Delete item" withArrow>
  <Button aria-label="Delete">Delete</Button>
</Tooltip>
```

## Import

```tsx
import { Tooltip } from '@suis-ui/kit';
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `content` | `JSX.Element` | Tooltip content입니다. 필수입니다. |
| `withArrow` | `boolean` | `true`이면 기본 arrow를 렌더링합니다. |
| `renderArrow` | `(props) => JSX.Element` | Custom arrow renderer입니다. |
| `openDelay` | `number` | Pointer enter 시 열리기 전 delay입니다. |
| `closeDelay` | `number` | Pointer leave 후 닫히기 전 delay입니다. |
| `placement` | Floating UI `Placement` | 선호 placement입니다. |
| `strategy` | Floating UI `Strategy` | Positioning strategy입니다. |
| `offset` | Floating UI `OffsetOptions` | Offset middleware config입니다. |
| `shift` | `ShiftOptions | boolean` | Shift middleware를 활성화하거나 설정합니다. |
| `flip` | `FlipOptions | boolean` | Flip middleware를 활성화하거나 설정합니다. |
| `autoUpdate` | `AutoUpdateOptions | boolean` | Automatic positioning update를 활성화하거나 설정합니다. |
| `middleware` | `Middleware[]` | 추가 Floating UI middleware입니다. |

`Tooltip`은 content element에 적용할 Box props도 받습니다.

## Defaults

- `flip`의 기본값은 `true`입니다.
- `offset`의 기본값은 `4`입니다.
- `openDelay`와 `closeDelay`의 기본값은 `0`입니다.

Tooltip 동작이 활성화되어 있는 동안 trigger는 `aria-describedby`를 받습니다.
