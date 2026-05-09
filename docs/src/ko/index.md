---
layout: home

hero:
  name: SUIS
  text: Solid UI System
  tagline: 동작 primitive, 스타일 컴포넌트, 테마 API를 제공하는 SolidJS UI 라이브러리입니다.
  actions:
    - theme: brand
      text: 시작하기
      link: ./introduction
    - theme: alt
      text: 컴포넌트 보기
      link: ./ui/button

features:
  - title: 동작 Primitive
    details: Popup, Select, Tooltip, CheckBox, FocusManager, polymorphic 요소를 위한 접근성 있는 상호작용을 조합합니다.
  - title: 스타일 Kit
    details: SUIS primitive, vanilla-extract 스타일, 컴포넌트 단위 테마 contract를 기반으로 한 Solid 컴포넌트를 바로 사용할 수 있습니다.
  - title: 커스터마이징 가능한 테마
    details: 컴포넌트 토큰을 먼저 사용하고, 그다음 semantic vars, 마지막으로 raw design token을 사용해 커스터마이징합니다.
---

## 시작하기

SUIS는 두 패키지로 나뉩니다.

- `@suis-ui/kit`은 스타일 컴포넌트, 테마 API, SUIS CSS 엔트리포인트를 제공합니다.
- `@suis-ui/primitives`는 커스텀 컴포넌트 조합을 위한 동작 중심 primitive를 제공합니다.

[소개](./introduction.md)를 읽고, [디자인 원칙](./design-principles.md)을 확인하거나 [커스터마이징](./customization.md)으로 바로 이동하세요.

## 패키지

바로 사용할 수 있는 UI가 필요하면 [Kit 컴포넌트](./ui/box.md)를 사용하세요. 마크업과 스타일을 직접 소유하면서 SUIS 동작만 재사용하려면 [Primitives](./primitives/polymorphic.md)를 사용하세요.
