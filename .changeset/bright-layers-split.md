---
"@suis-ui/kit": minor
---

feat(kit): split core, reset, and global CSS entrypoints

- Make `style.css` core-only and add opt-in `reset.css` and `global.css` package exports.
- Export stable `layers` and readonly `defaultLayerOrder` metadata from `@suis-ui/kit/css`.
- Replace the broad reset with a minimal reset and remove global viewport and root font-size overrides.
- Convert kit-owned rem sizing values to equivalent pixel values to preserve rendered sizes without a 10px root.
