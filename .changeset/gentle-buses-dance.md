---
"@suis-ui/kit": minor
---

fix(kit): allow Box default styles to be skipped with null

- Move Box defaults into prop resolution so null can explicitly opt out
- Prevent Box direction/color defaults from overriding Button base styles
- Keep user-provided Box props taking precedence over Button defaults
- Update the button playground to cover icon/text child combinations
