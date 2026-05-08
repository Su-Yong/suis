# FocusManager

`FocusManager`는 단일 DOM child 주변에 keyboard focus 동작을 설치합니다.

```tsx
import { FocusManager } from '@suis-ui/primitives';

<FocusManager enable trap>
  <div role="dialog">
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</FocusManager>
```

## Import

```tsx
import { FocusManager } from '@suis-ui/primitives';
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `enable` | `boolean` | `true`일 때 focus 동작을 활성화합니다. |
| `trap` | `boolean` | Child element 내부에 `Tab` navigation을 가둡니다. |
| `floating` | `HTMLElement[]` | Arrow-key 스타일 이동을 위한 순서 있는 floating target입니다. |
| `floatingMapper` | `(move, enter, escape) => Record<string, () => void>` | Keyboard key를 focus action에 매핑합니다. |
| `children` | `JSX.Element` | 단일 DOM element child입니다. |

`children`이 DOM `Element`로 해석되지 않으면 `FocusManager`는 warning을 기록하고 setup을 건너뜁니다.

## Focus Trap

`trap`이 true이면 `Tab`과 `Shift+Tab`이 child element의 tabbable descendant 안에서 순환합니다.

## Floating Focus

`floating`과 `floatingMapper`는 함께 동작합니다. `floating`은 focus target을 제공하고, `floatingMapper`는 keyboard key를 이동 또는 활성화 동작에 매핑합니다.

```tsx
const mapper = (move, enter, escape) => ({
  ArrowDown: () => move((index, max) => Math.min(index + 1, max - 1)),
  ArrowUp: () => move((index) => Math.max(index - 1, 0)),
  Enter: enter,
  Escape: escape,
});
```

Setup은 처음에 첫 target에 focus를 둡니다. Cleanup은 document-level keydown listener를 제거합니다.
