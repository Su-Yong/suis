# @suis-ui/primitives

## 0.2.0

### Minor Changes

- 1738074: feat(select): add required mode and resolved kit callbacks

  - allow optional Select values to clear when the selected item is chosen again
  - add required mode to primitives and kit Select to prevent clearing
  - add aria-required to Select trigger and content when required
  - narrow value and onChangeValue types when required is literal true
  - keep dynamic boolean required values on the nullable fallback type
  - expose ResolvedSelectData from kit Select data helpers
  - make kit renderValue receive ResolvedSelectData
  - keep kit onChangeValue emitting the raw string value
  - add kit onChange for ResolvedSelectData callbacks
  - guard required callbacks from receiving null at runtime

## 0.1.2

### Patch Changes

- 7e9574c: docs: add README.md

## 0.1.1

### Patch Changes

- 0ae9096: add `textarea` variant for `Input`
