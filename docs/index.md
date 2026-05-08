---
layout: home

hero:
  name: SUIS
  text: Solid UI System
  tagline: A SolidJS UI library with behavior primitives, styled components, and theme APIs.
  actions:
    - theme: brand
      text: Get Started
      link: /en/v0.1/introduction
    - theme: alt
      text: llms.txt
      link: /suis/llms.txt

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

Read the [Introduction](/en/v0.1/introduction), review the [Design Principles](/en/v0.1/design-principles), or jump into [Customization](/en/v0.1/customization).

## Packages

Use [Kit components](/en/v0.1/ui/box) when you want ready-to-use UI. Use [Primitives](/en/v0.1/primitives/polymorphic) when you want to own markup and styling while reusing SUIS behavior.
