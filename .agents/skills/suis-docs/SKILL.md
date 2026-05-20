---
name: suis-docs
description: SUIS documentation workflows for this repository. Use when the user invokes `/suis-docs kit`, `$suis-docs kit`, `/suis-docs primitives`, or `$suis-docs primitives`, or asks to document or restructure `@suis-ui/kit` or `@suis-ui/primitives` docs while keeping Korean and English pages consistent with source code.
---

# SUIS Docs

Use this skill for SUIS documentation workflows. Supported subcommands:

- `/suis-docs kit`: document SUIS `@suis-ui/kit` components from source code.
- `/suis-docs primitives`: document SUIS `@suis-ui/primitives` primitives from source code.

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

### `/suis-docs primitives`

Use this subcommand for `@suis-ui/primitives` documentation. Treat requests such as `/suis-docs primitives Popup 문서 수정해줘` as instructions to inspect primitive source code and update Korean and English primitive docs.

Required behavior:

1. Locate the primitive module in `packages/primitives/src/{Primitive}` and inspect its `index.ts` first.
2. Inspect exported component/function/hook implementations in that primitive module.
3. Identify public hooks from `index.ts`: names starting with `use` or `create`. Treat `create*` exports as hooks.
4. Update both `docs/src/ko/primitives/{primitive}.md` and `docs/src/en/primitives/{primitive}.md`.
5. Add table-of-contents entries only when adding a new primitive page.
6. Run the primitive validation checks in this skill before finishing.

If the user invokes `/suis-docs kit`, follow the kit workflow below. If the user invokes `/suis-docs primitives`, follow the primitive workflow below.

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

## Primitive Source-First Workflow

Before writing primitive docs, inspect the implementation:

1. `packages/primitives/src/{Primitive}/index.ts` to determine the public API.
2. `packages/primitives/src/index.ts` to confirm package-level export reachability when needed.
3. Component files in `packages/primitives/src/{Primitive}`.
4. Context/helper files only to understand behavior of exported APIs.
5. Similar docs in `docs/src/{ko,en}/primitives`.

Document only APIs and behavior that exist in code. Do not invent props, exported parts, hook return fields, or idealized behavior. Do not mention internal context helpers or implementation-only hooks that are not exported from the primitive `index.ts`.

## Primitive Target Files

- Korean docs: `docs/src/ko/primitives/{primitive}.md`
- English docs: `docs/src/en/primitives/{primitive}.md`
- If adding a new page, update `docs/src/ko/table-of-contents.md` and `docs/src/en/table-of-contents.md` when needed.

Use the Korean and English docs with the same section order and the same technical content. Localize prose naturally.

## Primitive Required Structure

Use this section order, omitting sections that do not apply:

```md
# Primitive

## Usage
## Props
## Component
## Hooks
## [Custom Section]
## Examples
```

- `Component` is singular. Use it for exported compound subcomponents such as `Select.Trigger` or `Popup.Element`.
- Put root component props in `Props`; put subcomponent props under `Component`.
- Include `Hooks` only when the primitive `index.ts` exports public hooks.
- Treat exported names starting with `use` or `create` as hooks.
- Place custom sections after `Hooks` and before `Examples`.

## Primitive Usage

Show import, a minimal real usage example, and a lightweight tree of the recommended primitive structure.

Use a `text` tree, not JSX pseudo-implementation:

```text
Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    └── SelectItem
```

Tree rules:

- Prefer understandable public structure over exact implementation detail.
- Show alternatives with compact labels such as `PopupAnchor | PopupTrigger`.
- Do not include private implementation components or context providers.

## Primitive Props

Start with a table and group props with `###` subsections when useful.

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

Type formatting rules:

- Use TypeScript types from source, not prose approximations.
- In table cells, prefer HTML code tags for all types: `<code>...</code>`.
- Escape table-breaking characters inside code tags: `|` as `&#124;`, `<` as `&lt;`, `>` as `&gt;`, and `=>` as `=&gt;`.
- If a type is too long, group it by behavior instead of listing every inherited prop. Example: `Selected element props` can use `<code>Omit&lt;ComponentProps&lt;T&gt;, 'children'&gt;</code>` and explain that remaining selected-element props are forwarded.
- Use actual defaults from source. Use `필수` / `Required` for required props and `-` when no default exists.

Common prop groups:

- `State And Content`: `open`, `value`, `children`
- `Positioning`: Floating UI props such as `placement`, `strategy`, `offset`, `shift`, `flip`, `autoUpdate`, `middleware`
- `Element Props`: `as`, polymorphic/native element props
- Component-specific groups such as `Delay`, `Value`, or `Input Attributes`

## Primitive Component

For each exported subcomponent:

1. Add a `###` heading using the public compound name, such as `### \`Popup.Element\``.
2. Explain what it renders and what behavior it wires.
3. Add a props table when it accepts meaningful props.
4. Mention generated DOM attributes only when they are important for behavior or accessibility.

Omit this section when the primitive has no exported subcomponents.

## Primitive Hooks

Include only hooks exported from the primitive `index.ts`. Treat both `use*` and `create*` exports as hooks.

Do not document or name internal context helpers, implementation-only hooks, or non-exported helpers. Do not write prose such as "exported from `packages/.../index.ts`"; the section itself is enough to show public availability.

Each hook should include relevant subsections:

```md
### `useSomething`

Short purpose sentence.

#### Signature
#### Context
#### Actions
#### Parameters And Return
#### Behavior
#### Example
```

Rules:

- `use*` hooks returning tuples should document the tuple shape and the public fields callers should use.
- `create*` hooks should document parameters, return value, cleanup behavior, lifecycle expectations, and an example.
- Hide internal fields even if present in the implementation. Document only stable public customization fields.
- State provider/scope requirements when a hook must run under a primitive provider.
- Keep examples practical and use only current public APIs.

## Primitive Custom Sections

Add custom sections only when they clarify primitive-specific behavior.

Common sections:

- `Focus Trap`
- `Floating Focus`
- `Notes` / `참고`
- `Accessibility`
- `Composition`

Keep custom sections before `Examples`.

## Primitive Examples

Provide several practical examples with `###` subsections.

Example categories:

- Basic usage
- Controlled state
- Custom trigger/content/item
- Positioning
- Polymorphic rendering
- Custom hook usage

Examples must use the current public API. Avoid extra dependencies unless the repo already uses them or the example clearly needs them.

## Primitive Language Rules

Korean docs:

- Props table columns: `이름`, `타입`, `기본값`, `간단한 설명`
- Hook detail tables may use `이름`, `타입`, `설명`
- Keep API terms in English when they map directly to code, such as `trigger`, `content`, `open`, `mount`, `placement`.
- Keep prose direct and concise.

English docs:

- Props table columns: `Name`, `Type`, `Default`, `Description`
- Hook detail tables may use `Name`, `Type`, `Description`
- Use the same structure and technical content as the Korean page.

## Primitive Validation

Before finishing primitive docs, run targeted checks:

```bash
for f in docs/src/ko/primitives/*.md docs/src/en/primitives/*.md; do
  printf '%s\n' "$f"
  rg '^## |^### |^#### ' "$f"
done

rg '## Import|## Components|## .* Props|## Hook$|## State Hooks|## Away Helpers|## Popup Controller' docs/src/ko/primitives docs/src/en/primitives -n

rg 'use.*Context|useFocusTrap|useFloatingFocus|packages/primitives/src|외부로 export|exported from' docs/src/ko/primitives docs/src/en/primitives -n

pnpm docs:build
```

Expected results:

- Usage sections include import, real usage, and `text` trees.
- Props tables use required columns and Type cells render as code.
- Only hooks exported from primitive `index.ts` appear in `Hooks`.
- `create*` public exports are documented as hooks.
- Internal context helpers and source path/export-location prose are not visible.
- Korean and English section structures match.
- `pnpm docs:build` passes.
