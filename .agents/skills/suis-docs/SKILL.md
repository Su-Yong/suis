---
name: suis-docs
description: SUIS documentation workflows for this repository. Use when the user invokes `/suis-docs kit` or `$suis-docs kit`, or asks to document new or changed `@suis-ui/kit` components, restructure kit docs, add props/styling/rendering examples, or keep Korean and English kit docs consistent with component code.
---

# SUIS Docs

Use this skill for SUIS documentation workflows. The current supported subcommand is `/suis-docs kit`, which documents SUIS `@suis-ui/kit` components from source code.

## Subcommands

### `/suis-docs kit`

Use this subcommand for `@suis-ui/kit` component documentation. Treat requests such as `/suis-docs kit 스킬을 확인해서 이번에 추가된 ComponentA 문서 작성해줘` as instructions to inspect the kit component implementation and write or update its Korean and English docs.

Required behavior:

1. Locate the component in `packages/kit/src/ui/{Component}` and inspect its exports.
2. Inspect related primitives in `packages/primitives/src/{Primitive}` when the kit component wraps primitives.
3. Inspect styling contracts in `vars.css.ts` and rendered styles in `{Component}.css.ts`.
4. Update both `docs/src/ko/kit/{component}.md` and `docs/src/en/kit/{component}.md`.
5. Add table-of-contents entries if the component page is new.
6. Run the validation checks in this skill before finishing.

Future subcommands should get their own section here. If the user invokes `/suis-docs kit`, follow the kit workflow below.

## Source-First Workflow

Before writing docs, inspect the implementation:

1. `packages/kit/src/ui/{Component}/{Component}.tsx`
2. `packages/kit/src/ui/{Component}/vars.css.ts`
3. `packages/kit/src/ui/{Component}/{Component}.css.ts`
4. `packages/kit/src/ui/{Component}/index.ts`
5. If the component wraps primitives, inspect `packages/primitives/src/{Primitive}`.
6. Compare with similar docs in `docs/src/{ko,en}/kit`.

Document only API and behavior that exist in code. Do not invent props, exported parts, token keys, or idealized behavior. If the current implementation has a limitation, document the current behavior clearly.

## Target Files

- Korean docs: `docs/src/ko/kit/{component}.md`
- English docs: `docs/src/en/kit/{component}.md`
- If adding a new page, update `docs/src/ko/table-of-contents.md` and `docs/src/en/table-of-contents.md` when needed.

Use the Korean and English docs with the same section order and the same technical content. Localize prose naturally.

## Required Structure

Use this section order, omitting sections that do not apply:

```md
# Component

## Usage
## Props
## Styling
## Rendering
## [Custom Section]
## Examples
```

- Include `Styling` only when the component has a `component.*` theme contract.
- Include `Rendering` only when the component exposes `render*` or `*Props` for inner parts.
- Place custom sections after `Styling` or `Rendering` and before `Examples`.

## Usage

Show import, a minimal real usage example, and a lightweight tree of the actual primitive/component structure.

Use a `text` tree, not JSX pseudo-implementation:

```text
Select
├── SelectTrigger
│   ├── SelectValue
│   └── SelectIndicator
└── SelectContent
    └── PopupPresence
        └── SelectGroup
            └── SelectItem
                └── SelectCheckIndicator
```

Tree rules:

- Prefer understandable structure over exact implementation detail.
- Show conditional structure with compact labels such as `PopupTrigger | PopupAnchor`.
- Do not include implementation snippets like `<PrimitiveSelect ...>` in Usage.

## Props

Start with a table and group props with `###` subsections when the component has several prop categories.

Korean table:

```md
| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
```

English table:

```md
| Name | Type | Default | Description |
| --- | --- | --- | --- |
```

Recommended groups:

- `Element Props`: `as`, `props`, polymorphic/native element props
- `Layout Props`: `pos`, `direction`, `justify`, `align`, `wrap`, `gap`
- `Spacing Props`: padding and margin shorthands
- `Size And Position Props`: `w`, `h`, `minW`, `maxW`, `flex`, inset props, `z`
- `Color Props`: `c`, `bg`, border color props
- `Border Props`: border width props
- `Radius, Text, And Effect Props`: radius, text, shadow, overflow
- `Positioning Props`: Floating UI props such as `placement`, `offset`, `shift`, `flip`, `autoUpdate`, `middleware`
- `Box Mixin Props`: when the component is built on `Box`

For mixins, do not copy every inherited prop. Link to the relevant component doc, then list representative props and explain how they affect this component.

Explain token value types after each group:

- Color props accept color tokens.
- Spacing props accept space tokens.
- Radius props accept radius tokens.
- Border width props accept line-size tokens.
- Text props accept font tokens.
- Shadow props accept shadow tokens.
- Arbitrary CSS size/position props accept CSS length strings, not token keys.

## Styling

Use this section only when a `component.*` token exists. Show the contract shape first, then explain each meaningful subsection.

Styling rules:

- Base the structure on `vars.css.ts`.
- Do not add token keys that do not exist.
- Explain what each token group changes in the rendered component.
- Add `###` subsections for token groups.

Common subsections:

- Button: `Size`, `Font`, `Variants`, `Focus And Disabled`
- CheckBox: `Indicator`, `Check`, `Active And Transition`
- Input: `Default, Hover, Active`, `Placeholder`, `File`, `Focus`
- Item: `Row Surface`, `Size`, `Focus`
- Popup: `Enter`, `Exit`
- Select: `Focus`, `Trigger`, `Indicator`, `Content`, `Group, Check, Placeholder`
- Tooltip: `Content`, `Arrow`, `Animation`

Do not create `Styling` for `Box` unless a real `component.box` contract is added.

## Rendering

Use this section for inner rendering APIs: `render*` and `*Props`.

Korean table:

```md
| 이름 | 기본값 | 설명 |
| --- | --- | --- |
```

English table:

```md
| Name | Default | Description |
| --- | --- | --- |
```

Rendering rules:

- Do not include a Type column.
- Move `render*` and `*Props` out of the general Props section.
- After the table, add one `###` subsection per rendering prop.
- For `render*`, state which inner part it replaces.
- For `*Props`, state which inner part receives the props.
- If a prop exists but is not currently forwarded, document that limitation.

## Custom Sections

Add custom sections only when they clarify component-specific behavior.

Common sections:

- `Accessibility`: aria labels, disabled behavior, keyboard focus, screen reader behavior
- `Composition`: slots, interactive rendering, custom content patterns
- `Trigger Behavior`: controlled/uncontrolled trigger behavior
- `Data`: simple/labeled/grouped data, value-label mapping
- `Arrow`: tooltip or popup arrow behavior

Keep custom sections before `Examples`.

## Examples

Provide several practical examples with `###` subsections.

Example categories:

- Basic usage
- Variants and sizes
- Controlled state
- Custom rendering
- Positioning
- Polymorphic rendering
- Composition with other kit components

Examples must use the current public API. Avoid extra dependencies unless the repo already uses them or the example clearly needs them.

## Language Rules

Korean docs:

- Props table columns: `이름`, `타입`, `기본값`, `간단한 설명`
- Rendering table columns: `이름`, `기본값`, `설명`
- Keep API terms in English when they map directly to code, such as `trigger`, `content`, `hover`, `active`, `placement`.
- Keep prose direct and concise.

English docs:

- Props table columns: `Name`, `Type`, `Default`, `Description`
- Rendering table columns: `Name`, `Default`, `Description`
- Use the same structure and technical content as the Korean page.

## Validation

Before finishing, run targeted checks:

```bash
for f in docs/src/ko/kit/*.md docs/src/en/kit/*.md; do
  printf '%s\n' "$f"
  rg '^## |^### ' "$f"
done

rg '<Primitive|<Polymorphic|classList=|as=\{props\.as|itemStyle\(|inputStyle\.' docs/src/ko/kit docs/src/en/kit -n

rg '^## Styling' docs/src/ko/kit/box.md docs/src/en/kit/box.md -n

pnpm docs:build
```

Expected results:

- Usage sections use `text` trees, not JSX pseudo-implementation.
- `Box` has no `Styling` section unless `component.box` exists.
- Rendering props are in `Rendering`, not mixed into general Props.
- Korean and English section structures match.
- `pnpm docs:build` passes.

Avoid inline `{{ ... }}` in Markdown prose because VitePress may parse it as Vue mustache syntax. Put such examples in fenced code blocks or rephrase them.
