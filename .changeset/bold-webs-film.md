---
"@suis-ui/primitives": minor
"@suis-ui/kit": minor
---

feat(select): add required mode and resolved kit callbacks

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