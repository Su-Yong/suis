---
name: suis-docs
description: SUIS documentation workflows for this repository. Use when the user invokes `/suis-docs kit` or `/suis-docs primitives`, or asks Claude Code to document `@suis-ui/kit` or `@suis-ui/primitives` APIs using the project docs rules.
---

# SUIS Docs

This is the Claude Code adapter for the project-local `suis-docs` skill.

## Invocation

User request:

```text
$ARGUMENTS
```

Treat `/suis-docs kit ...` as a request to document or update `@suis-ui/kit` component docs. Treat `/suis-docs primitives ...` as a request to document or update `@suis-ui/primitives` docs. The word after `/suis-docs` is an argument, not a separate nested slash command. If the first argument is `kit`, run the kit component documentation workflow. If the first argument is `primitives`, run the primitive documentation workflow.

## Source Of Truth

Before doing any documentation work, read and follow:

```text
.agents/skills/suis-docs/SKILL.md
```

That Codex skill file is the shared source of truth for SUIS docs rules. Do not duplicate or reinterpret the rules here. In particular, follow its kit or primitive workflow sections for source inspection, structure, usage, props, hooks, examples, and validation.

## Required Behavior

When handling kit documentation:

1. Inspect the component source in `packages/kit/src/ui/{Component}`.
2. Inspect related primitives in `packages/primitives/src/{Primitive}` when applicable.
3. Inspect styling contracts in `vars.css.ts` and rendered styles in `{Component}.css.ts`.
4. Update both Korean and English docs under `docs/src/ko/kit` and `docs/src/en/kit`.
5. Add table-of-contents entries if the component page is new.
6. Run the validation commands from `.agents/skills/suis-docs/SKILL.md` before finishing.

When handling primitive documentation:

1. Inspect the primitive module under `packages/primitives/src/{Primitive}`.
2. Inspect `index.ts` first to determine the public API and public hooks.
3. Treat public `use*` and `create*` exports as hooks.
4. Update both Korean and English docs under `docs/src/ko/primitives` and `docs/src/en/primitives`.
5. Add table-of-contents entries if the primitive page is new.
6. Run the primitive validation commands from `.agents/skills/suis-docs/SKILL.md` before finishing.

Keep `.agents/skills/suis-docs/SKILL.md` as the only canonical rule document. If the SUIS docs rules change, update that file rather than expanding this adapter.
