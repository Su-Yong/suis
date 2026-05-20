# FocusManager

`FocusManager`는 단일 DOM child 주변에 keyboard focus 동작을 설치합니다.

## Usage

```tsx
import { FocusManager } from '@suis-ui/primitives';
```

`FocusManager`는 단일 DOM element child에 focus trap 또는 floating focus 동작을 연결합니다.

```text
FocusManager
└── DOM element child
    └── focusable descendants
```

```tsx
<FocusManager enable trap>
  <div role="dialog">
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</FocusManager>
```

## Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `enable` | <code>boolean</code> | `false` | `true`일 때 focus 동작을 활성화합니다. |
| `trap` | <code>boolean</code> | `false` | Child element 내부에 `Tab` navigation을 가둡니다. |
| `floating` | <code>HTMLElement[]</code> | `-` | Arrow-key 스타일 이동을 위한 순서 있는 focus target입니다. |
| `floatingMapper` | <code>FloatingFocusMapper</code> | `-` | Keyboard key를 focus action에 매핑합니다. |
| `children` | <code>JSX.Element</code> | `-` | Focus 동작을 설치할 단일 DOM element child입니다. |

`children`이 DOM `Element`로 해석되지 않으면 `FocusManager`는 warning을 기록하고 setup을 건너뜁니다.

## Focus Trap

`trap`이 true이면 `Tab`과 `Shift+Tab`이 child element의 tabbable descendant 안에서 순환합니다.

Focus trap은 document-level `keydown` listener를 등록하고 `FocusManager`가 dispose될 때 listener를 제거합니다.

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

Setup은 처음에 첫 target에 focus를 둡니다. `Escape` action은 현재 focus를 blur하고 setup 전 active element로 focus를 되돌립니다.

## Examples

### Focus Trap

```tsx
<FocusManager enable trap>
  <div role="dialog" aria-modal="true">
    <button type="button">Cancel</button>
    <button type="button">Confirm</button>
  </div>
</FocusManager>
```

### Floating List

```tsx
let first!: HTMLButtonElement;
let second!: HTMLButtonElement;

const mapper = (move, enter, escape) => ({
  ArrowDown: () => move((index, max) => Math.min(index + 1, max - 1)),
  ArrowUp: () => move((index) => Math.max(index - 1, 0)),
  Home: () => move(() => 0),
  End: () => move((_, max) => max - 1),
  Enter: enter,
  Escape: escape,
});

<FocusManager enable floating={[first, second]} floatingMapper={mapper}>
  <div role="menu">
    <button ref={first} type="button" role="menuitem">Edit</button>
    <button ref={second} type="button" role="menuitem">Delete</button>
  </div>
</FocusManager>
```
