---
"@suis-ui/kit": minor
"@suis-ui/primitives": minor
---

Migrate package builds from Vite library mode to tsdown ESM-only outputs.

- Remove CommonJS and UMD package export conditions.
- Emit ESM package entrypoints and preserve the kit stylesheet export.
- Externalize runtime dependencies during library builds.
