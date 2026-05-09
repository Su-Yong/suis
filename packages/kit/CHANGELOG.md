# @suis-ui/kit

## 0.2.0

### Minor Changes

- b0fba13: Add the `Item` component to `@suis-ui/kit` with media, title, description, action, and size support.

### Patch Changes

- 27d17dc: Add motion and z-index design tokens.

  - Add raw `token.motion` and `token.zIndex` scales.
  - Add semantic `vars.motion` and `vars.zIndex` aliases.
  - Wire Popup, CheckBox, and Select motion defaults to semantic motion vars.
  - Update docs to include motion and z-index in token layer descriptions.

- 4543595: Update radius token usage to use vars.size.round instead of spacing tokens. Add round options to the kit example Box playground so radius controls use the new round semantic tokens.

## 0.1.1

### Patch Changes

- b67c633: Suppport Tooltip arrows, allow numeric `withArrow` values to customize arrow padding.
- edaec4a: Add Select customization props for content and check indicators
- 0ae9096: add `textarea` variant for `Input`
- 7e71f39: Add new Box styling props for border, position, z-index, shadow, and overflow.
- Updated dependencies [0ae9096]
  - @suis-ui/primitives@0.1.1
