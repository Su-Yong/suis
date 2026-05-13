# 소개

SUIS는 SolidJS UI 라이브러리입니다. 이 저장소는 두 라이브러리 패키지를 가진 pnpm workspace로 구성되어 있습니다.

- `@suis-ui/primitives`는 동작 중심 primitive를 제공합니다.
- `@suis-ui/kit`은 primitive 위에 구축된 스타일 컴포넌트, 테마 API, SUIS CSS 엔트리포인트를 제공합니다.

바로 사용할 수 있는 스타일 컴포넌트가 필요하면 `@suis-ui/kit`을 사용하세요. 동작과 접근성을 직접 조합하고 싶다면 `@suis-ui/primitives`를 사용하세요.

## 설치

스타일 컴포넌트 라이브러리를 사용하려면 kit 패키지를 설치합니다.

```bash
pnpm add @suis-ui/kit solid-js
```

커스텀 컴포넌트를 만들 때 primitive를 직접 사용하려면 다음 패키지를 설치합니다.

```bash
pnpm add @suis-ui/primitives solid-js
```

## 기본 설정

애플리케이션에서 kit CSS 엔트리포인트를 한 번 import합니다.

```tsx
import '@suis-ui/kit/style.css';
```

`ThemeProvider`로 앱을 감싸 기본 `token`, `component`, light `vars` 테마 클래스를 `document.body`에 마운트합니다.

```tsx
import { ThemeProvider } from '@suis-ui/kit';

export const App = () => (
  <ThemeProvider>
    {/* app */}
  </ThemeProvider>
);
```

## 패키지 역할

`@suis-ui/primitives`는 상태 연결, DOM 동작, 포커스 처리, portal, popup positioning, 조합 helper를 담당합니다.

`@suis-ui/kit`은 시각적 스타일, vanilla-extract recipe, `component`, `vars`, `token`, color/space/round map, primitive를 감싼 스타일 wrapper를 담당합니다.

새 기능을 추가할 때는 이 역할을 분리해서 유지하세요. 동작 변경은 보통 primitives에 먼저 들어가고, 시각적 변경이나 토큰 변경은 kit에 들어갑니다.

## 커스터마이징 모델

일부 상호작용은 두 패키지에 모두 존재합니다. Primitives는 직접 조합할 수 있도록 `Select.Trigger`, `Select.Content`, `Select.Item` 같은 compound component를 노출합니다. Kit은 보통 같은 상호작용을 `Select`처럼 하나의 스타일 컴포넌트로 제공합니다.

Kit 컴포넌트는 내부 구조를 컴포넌트가 계속 관리해야 할 때 `*Props`와 `render*` props로 하위 요소를 커스터마이징할 수 있게 합니다. 예를 들어 `Select`는 primitive 조합을 직접 다시 만들지 않고도 생성되는 part를 커스터마이징할 수 있도록 `itemProps`, `renderItem` 및 관련 props를 제공합니다.

디자인 값을 선택할 때는 `component`, `vars`, `token` 순서로 우선 사용하세요. 전체 규칙은 [디자인 원칙](./design-principles.md)을 참고하세요.
