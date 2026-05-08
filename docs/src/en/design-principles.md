# Design Principles

SUIS separates behavior, styling, and design tokens so each layer can be customized at the right level.

Use `@suis-ui/primitives` when you need low-level behavior and composition. Use `@suis-ui/kit` when you want ready-to-use styled components that follow the SUIS design system.

## Design System Layers

When styling SUIS or building components with SUIS, choose exported theme values in this order:

| Priority | Export | Meaning | Use When |
| --- | --- | --- | --- |
| 1 | `component` | Tokens directly tied to a specific SUIS component | Matching Button, Tooltip, Select, Input, Item, Popup, or CheckBox styling |
| 2 | `vars` | Semantic tokens | Choosing colors, fonts, shadows, spacing, or line sizes for app-specific components and layouts |
| 3 | `token` | Raw tokens available in SUIS | Handling exceptional details that cannot be expressed with `component` or `vars` |

Prefer `component` for SUIS component overrides because those values are scoped to the component contract. Prefer `vars` for application surfaces because semantic names communicate intent. Use `token` only when a raw palette, size, or space value is required.

```tsx
import { component, vars, token } from '@suis-ui/kit';
```

## Component Layers

The same interaction may exist in both packages, but the shape is different.

`@suis-ui/primitives` exposes compound components for direct composition. For example, primitive Select is assembled from `Select.Trigger`, `Select.Value`, `Select.Content`, and `Select.Item`.

`@suis-ui/kit` exposes a styled single component for the common case. For example, kit Select accepts `data`, renders the trigger, content, groups, items, and selected indicators for you, and keeps the primitive behavior underneath.

Use primitives when structure is the customization point. Use kit when the structure is standard and styling or sub-element rendering is the customization point.

## Kit Customization Pattern

Kit components that wrap multiple primitive subcomponents should expose sub-element customization through two prop families:

- `*Props` passes props to an internal sub-element.
- `render*` replaces the rendered sub-element or part.

For example, `Select` currently exposes `indicatorProps`, `groupProps`, `itemProps`, `renderValue`, `renderIndicator`, `renderGroup`, `renderItem`, and `renderCheckIndicator`.

When adding a new kit component, keep the public component simple first. Add `*Props` and `render*` only for sub-elements users need to customize without dropping down to primitives.

## Package Responsibilities

Primitives own behavior: state, context, DOM event wiring, focus handling, portals, popup positioning, and accessibility attributes.

Kit owns presentation: styled components, vanilla-extract recipes, component tokens, semantic tokens, raw tokens, and single-component APIs built on top of primitives.

Do not put kit theme contracts into primitives. Do not duplicate primitive behavior in kit when a primitive already owns it.
