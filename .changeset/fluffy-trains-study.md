---
"@suis-ui/kit": minor
---

feat(kit): expose popupAnimation via css subpath

- move popupAnimation into a plain TS helper
- add @suis-ui/kit/css package export and subpath build output
- keep component contract reusable while isolating default theme creation
- document the vanilla-extract helper export decision