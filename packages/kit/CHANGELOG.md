# @suis-ui/kit

## 0.3.1

### Patch Changes

- 14cb6f9: fix: remove semicolon in ThemeProvider
- 7e9574c: docs: add README.md
- b5bd519: feat(kit): update focus ring styles

  - Adjust focus ring tokens across kit components to use no offset and the
    higher surface color.

- 029b04e: fix(input): apply state-specific styles

  - Use hover, active, and disabled state tokens for Input styles

- 2670120: feat(kit): change disabled styles
- Updated dependencies [7e9574c]
  - @suis-ui/primitives@0.1.2

## 0.3.0

### Minor Changes

- 9087306: fix(kit): allow Box default styles to be skipped with null

  - Move Box defaults into prop resolution so null can explicitly opt out
  - Prevent Box direction/color defaults from overriding Button base styles
  - Keep user-provided Box props taking precedence over Button defaults
  - Update the button playground to cover icon/text child combinations

- 71edd6f: fix(kit): wire component styling contracts

  - apply Box mr style prop
  - use component.button.font tokens by size
  - use component.input.focus for all input focus states
  - forward controlled open state through Select

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
