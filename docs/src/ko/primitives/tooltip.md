# Tooltip Primitive

Primitive Tooltip은 Popup을 pointer-enter 및 hover-away 동작과 조합합니다.

## Usage

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  useTooltip,
} from '@suis-ui/primitives';
```

권장 primitive 구조는 trigger anchor와 portal에 렌더링되는 tooltip content를 조합하는 형태입니다.

```text
Tooltip
├── TooltipTrigger
│   └── HTMLElement child
└── TooltipContent
    └── Portal
        └── tooltip content
```

```tsx
<Tooltip openDelay={300} closeDelay={100} placement="top">
  <Tooltip.Trigger>
    <button type="button">Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Tooltip content
  </Tooltip.Content>
</Tooltip>
```

## Props

### Delay

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `openDelay` | <code>number</code> | `0` | Pointer enter 이후 열리기 전 delay입니다. |
| `closeDelay` | <code>number</code> | `0` | Pointer leave 이후 닫히기 전 delay입니다. |
| `children` | <code>JSX.Element</code> | 필수 | Tooltip composition입니다. |

### Popup State And Positioning

`Tooltip`은 Popup 위에 구성되므로 Popup의 state와 positioning props를 함께 받습니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `open` | <code>boolean</code> | `false` | Popup open request value입니다. |
| `placement` | <code>Placement</code> | Floating UI default | 선호 placement입니다. |
| `strategy` | <code>Strategy</code> | Floating UI default | CSS positioning strategy입니다. |
| `offset` | <code>OffsetOptions</code> | `-` | Offset middleware를 활성화합니다. |
| `shift` | <code>ShiftOptions &#124; boolean</code> | `-` | Shift middleware를 활성화합니다. |
| `flip` | <code>FlipOptions &#124; boolean</code> | `-` | Flip middleware를 활성화합니다. |
| `autoUpdate` | <code>AutoUpdateOptions &#124; boolean</code> | `true` | Layout이 바뀔 때 position을 다시 계산합니다. |
| `middleware` | <code>Middleware[]</code> | `-` | 추가 Floating UI middleware입니다. |

## Component

### `Tooltip.Trigger`

DOM child를 popup anchor로 등록하고, pointer enter 시 `openDelay` 이후 열며 hover away 시 `closeDelay` 이후 닫습니다.

Trigger가 anchor를 등록하면 anchor는 tooltip content id를 가리키는 `aria-describedby`를 받습니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `children` | <code>JSX.Element</code> | `-` | Trigger anchor로 등록할 DOM element입니다. |

### `Tooltip.Content`

Popup content를 portal에 렌더링하고 `role="tooltip"`을 적용하며 생성된 `id`를 받습니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `as` | <code>T</code> | `div` | Content로 렌더링할 element 또는 component입니다. |
| `children` | <code>JSX.Element</code> | `-` | Tooltip 안에 렌더링할 내용입니다. |
| 선택한 element props | <code>Omit&lt;ComponentProps&lt;T&gt;, 'children' &#124; 'style'&gt;</code> | `-` | Content element로 전달되는 props입니다. 계산된 popup style과 함께 merge됩니다. |

## Hooks

### `useTooltip`

`useTooltip`은 Tooltip provider 아래에서 tooltip id, delay 설정, popup 상태와 open action을 함께 읽을 때 사용합니다.

#### Signature

```ts
const [context, actions] = useTooltip();
```

```ts
const [context, actions]: readonly [
  {
    id: string;
    openDelay?: number;
    closeDelay?: number;
    anchor: Element | null;
    element: HTMLElement | null;
    position: ComputePositionReturn | null;
    open: boolean;
    mount: boolean;
  },
  {
    requestOpen: (open: boolean) => void;
  },
] = useTooltip();
```

Tooltip provider 밖에서 호출하면 context를 찾을 수 없어 error가 발생합니다.

#### Context

`context`는 Tooltip context와 Popup context를 merge한 값입니다.

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `context.id` | <code>string</code> | Tooltip content에 적용되고 trigger의 `aria-describedby`가 참조하는 고유 id입니다. |
| `context.openDelay` | <code>number</code> | Pointer enter 이후 열리기 전 delay입니다. |
| `context.closeDelay` | <code>number</code> | Pointer leave 이후 닫히기 전 delay입니다. |
| `context.anchor` | <code>Element &#124; null</code> | `Tooltip.Trigger`가 등록한 popup anchor입니다. |
| `context.element` | <code>HTMLElement &#124; null</code> | `Tooltip.Content`가 portal에 렌더링한 tooltip element입니다. |
| `context.position` | <code>ComputePositionReturn &#124; null</code> | Floating UI가 계산한 tooltip position입니다. |
| `context.open` | <code>boolean</code> | 가장 최근에 요청된 tooltip open state입니다. |
| `context.mount` | <code>boolean</code> | Tooltip content가 실제로 portal에 렌더링되는지 나타냅니다. |

Tooltip을 확장할 때는 위 표의 id, delay, popup 상태만 사용하세요.

#### Actions

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `actions.requestOpen` | <code>(open: boolean) =&gt; void</code> | Tooltip popup의 open state를 요청합니다. |

#### Behavior

기본 `Tooltip.Trigger`가 pointer enter와 hover away 동작을 이미 처리합니다. `useTooltip`은 그 동작을 재사용하면서 custom trigger나 content에서 상태를 읽거나 open state를 직접 제어해야 할 때 사용하세요.

`openDelay`와 `closeDelay`는 기본 `Tooltip.Trigger`의 pointer 동작에서 사용됩니다. 직접 `requestOpen(true)` 또는 `requestOpen(false)`를 호출하면 delay 없이 즉시 open request를 보냅니다.

`id`는 `Tooltip.Content`에 적용되고 trigger의 `aria-describedby`에 연결됩니다. Custom content를 만들 때도 같은 id를 유지해야 screen reader 연결이 유지됩니다.

#### Example

```tsx
const TooltipStateLabel = () => {
  const [context] = useTooltip();

  return (
    <span data-open={context.open}>
      {context.open ? 'Open' : 'Closed'}
    </span>
  );
};
```

## Examples

### Basic Tooltip

```tsx
<Tooltip placement="top" offset={6}>
  <Tooltip.Trigger>
    <button type="button">Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Tooltip content
  </Tooltip.Content>
</Tooltip>
```

### Delayed Tooltip

```tsx
<Tooltip openDelay={300} closeDelay={100} placement="right">
  <Tooltip.Trigger>
    <button type="button">Help</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Opens after a short delay.
  </Tooltip.Content>
</Tooltip>
```

### Custom Content Element

```tsx
<Tooltip placement="bottom" shift flip>
  <Tooltip.Trigger>
    <button type="button">Status</button>
  </Tooltip.Trigger>
  <Tooltip.Content as="section" aria-label="Status details">
    The job is running.
  </Tooltip.Content>
</Tooltip>
```
