# Popup Primitive

Primitive Popup은 popup state, anchor 등록, trigger 동작, portal 렌더링, Floating UI positioning을 제공합니다.

## Usage

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

권장 primitive 구조는 anchor 또는 trigger와 portal에 렌더링되는 popup element를 조합하는 형태입니다.

```text
Popup
├── PopupAnchor | PopupTrigger
│   └── HTMLElement child
└── PopupElement
    └── Portal
        └── popup content
```

```tsx
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

## Props

### State And Content

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `open` | <code>boolean</code> | `false` | Controlled open request value입니다. 값이 바뀌면 popup open state에 반영됩니다. |
| `children` | <code>JSX.Element</code> | 필수 | Popup composition입니다. |

### Positioning

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `placement` | <code>Placement</code> | Floating UI default | 선호 placement입니다. |
| `strategy` | <code>Strategy</code> | Floating UI default | CSS positioning strategy입니다. |
| `offset` | <code>OffsetOptions</code> | `-` | Offset middleware를 활성화합니다. |
| `shift` | <code>ShiftOptions &#124; boolean</code> | `-` | Shift middleware를 활성화합니다. `true`이면 기본 옵션으로 실행합니다. |
| `flip` | <code>FlipOptions &#124; boolean</code> | `-` | Flip middleware를 활성화합니다. `true`이면 기본 옵션으로 실행합니다. |
| `autoUpdate` | <code>AutoUpdateOptions &#124; boolean</code> | `true` | Layout이 바뀔 때 position을 다시 계산합니다. |
| `middleware` | <code>Middleware[]</code> | `-` | 추가 Floating UI middleware입니다. |

## Component

### `Popup.Anchor`

DOM child를 positioning anchor로 등록합니다. Controlled popup이나 custom trigger 동작에 사용하세요.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `children` | <code>JSX.Element</code> | 필수 | Anchor로 등록할 단일 DOM element입니다. |

Child가 DOM `Element`가 아니면 warning을 기록합니다.

### `Popup.Trigger`

`Popup.Anchor`를 감싸고 anchor가 클릭될 때 popup을 toggle합니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `children` | <code>JSX.Element</code> | `-` | Trigger anchor로 등록할 DOM element입니다. |

### `Popup.Element`

마운트된 popup content를 portal에 렌더링합니다. Child는 계산된 style accessor를 받는 render function입니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `children` | <code>(style: Accessor&lt;JSX.CSSProperties&gt;) =&gt; JSX.Element</code> | 필수 | Popup content를 렌더링하는 함수입니다. 반환한 첫 DOM element가 popup element로 등록됩니다. |

```tsx
<Popup.Element>
  {(style) => <div style={style()}>Content</div>}
</Popup.Element>
```

## Hooks

### `usePopup`

`usePopup`은 Popup provider 아래에서 현재 popup 상태와 open action을 읽을 때 사용합니다. `Popup` 내부에 렌더링되는 custom trigger, close button, content component에서만 호출하세요.

#### Signature

```ts
const [context, actions] = usePopup();
```

```ts
const [context, actions]: readonly [
  {
    anchor: Element | null;
    element: HTMLElement | null;
    position: ComputePositionReturn | null;
    open: boolean;
    mount: boolean;
  },
  {
    requestOpen: (open: boolean) => void;
  },
] = usePopup();
```

Popup provider 밖에서 호출하면 context를 찾을 수 없어 error가 발생합니다.

#### Context

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `context.anchor` | <code>Element &#124; null</code> | `Popup.Anchor` 또는 `Popup.Trigger`가 등록한 positioning 기준 element입니다. |
| `context.element` | <code>HTMLElement &#124; null</code> | `Popup.Element` 안에서 렌더링된 popup content의 첫 DOM element입니다. |
| `context.position` | <code>ComputePositionReturn &#124; null</code> | Floating UI가 계산한 `x`, `y`, `placement`, `strategy`, middleware data입니다. Position 계산 전에는 `null`입니다. |
| `context.open` | <code>boolean</code> | 가장 최근에 요청된 open state입니다. `requestOpen`이 호출되면 즉시 갱신됩니다. |
| `context.mount` | <code>boolean</code> | `Popup.Element`가 portal content를 실제로 렌더링할지 결정하는 mount state입니다. Controller가 있으면 controller 결과에 따라 갱신됩니다. |

Public customization에서 의존할 필드는 위 표의 상태 필드입니다.

#### Actions

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `actions.requestOpen` | <code>(open: boolean) =&gt; void</code> | Popup open state를 요청합니다. 요청마다 id를 증가시켜 오래된 async controller 결과가 최신 요청을 덮어쓰지 못하게 합니다. |

#### Behavior

`open`은 의도한 상태이고, `mount`는 실제 렌더링 여부입니다. Animation처럼 닫힘 요청 뒤에도 잠시 DOM을 유지해야 할 때는 controller로 `mount` 갱신을 지연시킬 수 있습니다.

`position`은 `mount`가 true이고 anchor와 popup element가 모두 등록된 뒤 계산됩니다. 따라서 custom content에서 position을 읽을 때는 `null`일 수 있음을 고려하세요.

`requestOpen(false)`는 popup을 닫도록 요청하지만 document click-away나 hover-away listener를 자동으로 설치하지 않습니다. 바깥 click, hover away 같은 닫힘 조건은 `createClickAway`, `createHoverAway`, 또는 직접 작성한 event handler에서 `requestOpen(false)`를 호출해 연결합니다.

#### Example

```tsx
const CloseButton = () => {
  const [, { requestOpen }] = usePopup();

  return (
    <button type="button" onClick={() => requestOpen(false)}>
      Close
    </button>
  );
};
```

### `createPopupController`

`createPopupController`는 Popup provider 아래에서 open request와 실제 mount state 사이에 async controller를 끼워 넣을 때 사용합니다. Enter/exit animation처럼 닫힘 요청 이후에도 content를 잠시 유지해야 할 때 적합합니다.

#### Signature

```ts
createPopupController(controller: (open: boolean) => Promise<boolean>): void;
```

#### Parameters

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `controller` | <code>(open: boolean) =&gt; Promise&lt;boolean&gt;</code> | `requestOpen(open)`이 호출될 때 실행됩니다. Promise가 resolve한 boolean이 다음 `mount` state가 됩니다. |

#### Behavior

Popup provider 아래에서 호출해야 합니다. Controller가 없으면 `mount`는 요청된 `open` 값과 동일하게 갱신됩니다.

`controller`는 요청된 open state를 인자로 받습니다. `true`를 resolve하면 `Popup.Element`가 mount되고, `false`를 resolve하면 unmount됩니다.

여러 open request가 빠르게 이어지면 가장 최신 request만 반영됩니다. 이전 request의 Promise가 늦게 resolve되어도 최신 request의 `mount` state를 덮어쓰지 않습니다.

#### Example

```tsx
const AnimatedMount = () => {
  createPopupController(async (open) => {
    if (open) return true;

    await new Promise((resolve) => window.setTimeout(resolve, 150));
    return false;
  });

  return null;
};
```

### `createClickAway`

`createClickAway`는 target element 바깥에서 document click이 발생했을 때 dismissal handler를 실행합니다.

#### Signature

```ts
const register = createClickAway(
  onClickAway: (cleanUp: () => void) => void,
);

const cleanUp = register(
  element: Element | null | undefined | Accessor<Element | null | undefined>,
);
```

#### Parameters And Return

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `onClickAway` | <code>(cleanUp: () =&gt; void) =&gt; void</code> | Target 밖 click이 발생하면 호출됩니다. 전달받은 `cleanUp`으로 listener를 제거할 수 있습니다. |
| `element` | <code>Element &#124; null &#124; undefined &#124; Accessor&lt;Element &#124; null &#124; undefined&gt;</code> | Click-away 기준 target입니다. Accessor를 넘기면 click event마다 최신 target을 다시 확인합니다. |
| `cleanUp` | <code>() =&gt; void</code> | 등록된 document click listener를 제거하는 함수입니다. Target이 없으면 no-op cleanup을 반환합니다. |

#### Behavior

등록 시점에 target이 없으면 listener를 설치하지 않고 no-op cleanup을 반환합니다. Target이 있으면 document에 click listener를 설치하고, click event의 composed path에 target이 없을 때 `onClickAway(cleanUp)`을 호출합니다.

소유한 컴포넌트가 dispose될 때 cleanup을 호출하세요. Popup을 한 번 닫은 뒤 listener도 제거해야 한다면 `onClickAway` 안에서 전달받은 `cleanUp`을 호출하면 됩니다.

#### Example

```tsx
const ClickAwayCloser = () => {
  const [context, { requestOpen }] = usePopup();
  const register = createClickAway((cleanUp) => {
    requestOpen(false);
    cleanUp();
  });

  createEffect(() => {
    if (!context.element) return;

    const cleanUp = register(() => context.element);
    onCleanup(cleanUp);
  });

  return null;
};
```

### `createHoverAway`

`createHoverAway`는 target element에서 pointer가 떠난 뒤 다시 들어오지 않으면 dismissal handler를 실행합니다.

#### Signature

```ts
const register = createHoverAway(
  onHoverAway: (cleanUp: () => void) => void,
);

const cleanUp = register(
  element: Element | null | undefined | Accessor<Element | null | undefined>,
  options?: { delay?: number },
);
```

#### Parameters And Return

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `onHoverAway` | <code>(cleanUp: () =&gt; void) =&gt; void</code> | Pointer가 target을 떠나고 delay 안에 다시 들어오지 않으면 호출됩니다. 전달받은 `cleanUp`으로 listener를 제거할 수 있습니다. |
| `element` | <code>Element &#124; null &#124; undefined &#124; Accessor&lt;Element &#124; null &#124; undefined&gt;</code> | Hover-away 기준 target입니다. |
| `options.delay` | <code>number</code> | `pointerleave` 이후 handler를 실행하기 전 대기 시간입니다. 기본값은 `0`입니다. |
| `cleanUp` | <code>() =&gt; void</code> | Target에 등록된 `pointerleave`, `pointerenter` listener를 제거하는 함수입니다. Target이 없으면 no-op cleanup을 반환합니다. |

#### Behavior

등록 시점에 target이 없으면 listener를 설치하지 않고 no-op cleanup을 반환합니다. Target이 있으면 `pointerleave`에서 delay timer를 시작하고, delay 전에 `pointerenter`가 발생하면 timer를 취소합니다.

`onHoverAway(cleanUp)`은 delay가 끝난 뒤 호출됩니다. Tooltip처럼 hover가 끝나면 닫고 listener도 제거하려면 handler 안에서 `requestOpen(false)`와 `cleanUp()`을 함께 호출하세요.

#### Example

```tsx
const HoverAwayCloser = () => {
  const [context, { requestOpen }] = usePopup();
  const register = createHoverAway((cleanUp) => {
    requestOpen(false);
    cleanUp();
  });

  createEffect(() => {
    if (!context.anchor) return;

    const cleanUp = register(() => context.anchor, { delay: 120 });
    onCleanup(cleanUp);
  });

  return null;
};
```

## Examples

### Basic Trigger

```tsx
<Popup placement="bottom-start" offset={4}>
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

### Custom Anchor

```tsx
const ManualTrigger = () => {
  const [, { requestOpen }] = usePopup();

  return (
    <Popup.Anchor>
      <button type="button" onClick={() => requestOpen(true)}>
        Open manually
      </button>
    </Popup.Anchor>
  );
};

<Popup placement="right" shift>
  <ManualTrigger />
  <Popup.Element>
    {(style) => <div style={style()}>Manual popup</div>}
  </Popup.Element>
</Popup>
```

### Positioning Middleware

```tsx
<Popup
  placement="top-start"
  offset={8}
  shift
  flip
  autoUpdate={{ animationFrame: true }}
>
  <Popup.Trigger>
    <button type="button">Open</button>
  </Popup.Trigger>
  <Popup.Element>
    {(style) => <div style={style()}>Positioned popup</div>}
  </Popup.Element>
</Popup>
```
