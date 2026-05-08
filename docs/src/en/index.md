---
layout: home

hero:
  name: SUIS
  text: Solid UI System
  tagline: A SolidJS UI library with behavior primitives, styled components, and theme APIs.
  actions:
    - theme: brand
      text: Get Started
      link: ./introduction
    - theme: alt
      text: View Components
      link: ./ui/button

features:
  - title: Behavior Primitives
    details: Compose accessible interactions with primitives for popups, selects, tooltips, checkboxes, focus management, and polymorphic elements.
  - title: Styled Kit
    details: Use ready-to-use Solid components backed by SUIS primitives, vanilla-extract styles, and component-level theme contracts.
  - title: Customizable Themes
    details: Customize through component tokens first, semantic vars second, and raw design tokens only when needed.
---

## Start Here

SUIS is split into two packages:

- `@suis-ui/kit` provides styled components, theme APIs, and the SUIS CSS entrypoint.
- `@suis-ui/primitives` provides behavior-focused primitives for custom component composition.

Read the [Introduction](./introduction.md), review the [Design Principles](./design-principles.md), or jump into [Customization](./customization.md).

## Packages

Use [Kit components](./ui/box.md) when you want ready-to-use UI. Use [Primitives](./primitives/polymorphic.md) when you want to own markup and styling while reusing SUIS behavior.
