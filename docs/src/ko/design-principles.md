# 디자인 원칙

SUIS는 동작, 스타일, 디자인 토큰을 분리해 각 layer를 적절한 수준에서 커스터마이징할 수 있게 합니다.

낮은 수준의 동작과 조합이 필요하면 `@suis-ui/primitives`를 사용하세요. SUIS 디자인 시스템을 따르는 바로 사용할 수 있는 스타일 컴포넌트가 필요하면 `@suis-ui/kit`을 사용하세요.

## 디자인 시스템 Layer

SUIS를 스타일링하거나 SUIS로 컴포넌트를 만들 때는 export된 테마 값을 다음 순서로 선택하세요.

| 우선순위 | Export | 의미 | 사용할 때 |
| --- | --- | --- | --- |
| 1 | `component` | 특정 SUIS 컴포넌트에 직접 연결된 토큰 | Button, Tooltip, Select, Input, Item, Popup, CheckBox 스타일을 맞출 때 |
| 2 | `vars` | Semantic token | 앱 전용 컴포넌트와 레이아웃의 색상, 폰트, 그림자, 간격, 선 크기, z-index, motion을 선택할 때 |
| 3 | `token` | SUIS에서 사용할 수 있는 raw token | `component`나 `vars`로 표현할 수 없는 예외적인 세부 값을 다룰 때 |

SUIS 컴포넌트 override에는 `component`를 선호하세요. 이 값들은 컴포넌트 contract에 scope가 한정되어 있습니다. 애플리케이션 surface에는 의도를 전달하는 semantic name을 가진 `vars`를 선호하세요. Raw palette, size, z-index, motion 값이 꼭 필요할 때만 `token`을 사용하세요.

```tsx
import { component, vars, token } from '@suis-ui/kit';
```

## 컴포넌트 Layer

같은 상호작용이 두 패키지에 모두 있을 수 있지만 형태는 다릅니다.

`@suis-ui/primitives`는 직접 조합할 수 있는 compound component를 노출합니다. 예를 들어 primitive Select는 `Select.Trigger`, `Select.Value`, `Select.Content`, `Select.Item`으로 조립합니다.

`@suis-ui/kit`은 일반적인 사용 사례를 위해 스타일이 적용된 단일 컴포넌트를 노출합니다. 예를 들어 kit Select는 `data`를 받고 trigger, content, group, item, selected indicator를 렌더링하며, 내부에서는 primitive 동작을 유지합니다.

구조 자체가 커스터마이징 지점이면 primitives를 사용하세요. 구조는 표준이고 스타일이나 하위 요소 렌더링이 커스터마이징 지점이면 kit을 사용하세요.

## Kit 커스터마이징 패턴

여러 primitive 하위 컴포넌트를 감싸는 Kit 컴포넌트는 두 prop family로 하위 요소 커스터마이징을 제공해야 합니다.

- `*Props`는 내부 하위 요소에 props를 전달합니다.
- `render*`는 렌더링되는 하위 요소나 part를 교체합니다.

예를 들어 현재 `Select`는 `indicatorProps`, `contentProps`, `groupProps`, `itemProps`, `checkIndicatorProps`, `renderValue`, `renderIndicator`, `renderContent`, `renderGroup`, `renderItem`, `renderCheckIndicator`를 노출합니다.

새 kit 컴포넌트를 추가할 때는 먼저 public component를 단순하게 유지하세요. 사용자가 primitives로 내려가지 않고 커스터마이징해야 하는 하위 요소에만 `*Props`와 `render*`를 추가하세요.

## 패키지 책임

Primitives는 동작을 담당합니다. 상태, context, DOM event wiring, focus handling, portal, popup positioning, 접근성 attribute가 여기에 속합니다.

Kit은 표현을 담당합니다. 스타일 컴포넌트, vanilla-extract recipe, component token, semantic token, raw token, primitive 위에 구축된 단일 컴포넌트 API가 여기에 속합니다.

Kit 테마 contract를 primitives에 넣지 마세요. 이미 primitive가 담당하는 동작을 kit에서 중복 구현하지 마세요.
