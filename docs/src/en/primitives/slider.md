# Slider Primitive

Primitive Slider is a headless slider for adjusting one or more values with pointer and keyboard input. Applications compose and style its rail, thumbs, and labels directly.

## Usage

```tsx
import {
  Slider,
  SliderRail,
  SliderThumb,
  SliderLabel,
  useSlider,
} from '@suis-ui/primitives';
```

`renderValue` renders a thumb for each entry in `values`. Place rails and labels in `children`.

```text
Slider
├── SliderLabel
├── SliderRail
│   └── Range
└── SliderThumb × values.length
```

```tsx
import { createSignal } from 'solid-js';
import { Slider, SliderRail, SliderThumb } from '@suis-ui/primitives';

const [values, setValues] = createSignal([40]);

<Slider
  aria-label="Volume"
  values={values()}
  onChangeValues={setValues}
  renderValue={(value) => (
    <SliderThumb
      aria-label="Volume"
      style={{ left: 'var(--slider-thumb-percent)' }}
    >
      {value()}
    </SliderThumb>
  )}
>
  <SliderRail getRanges={(values, domain) => [[domain.min, values[0]]]}>
    {(range) => (
      <div
        style={{
          left: `${range().offsetPercent}%`,
          width: `${range().sizePercent}%`,
        }}
      />
    )}
  </SliderRail>
</Slider>
```

## Props

### State And Content

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `values` | <code>number[]</code> | Required | Current value for each thumb. Array order corresponds to rendered thumb order. |
| `onChangeValues` | <code>(values: number[]) =&gt; void</code> | `-` | Called when pointer or keyboard input requests a new value array. |
| `min` | <code>number</code> | `0` | Minimum value of the domain. |
| `max` | <code>number</code> | `100` | Maximum value of the domain. |
| `step` | <code>number</code> | `1` | Interval used to align requested values. |
| `disabled` | <code>boolean</code> | `false` | Disables interaction for the entire Slider. |
| `children` | <code>JSX.Element</code> | Required | Rails, labels, and other decorative elements. |
| `renderValue` | <code>(value: Accessor&lt;number&gt;, index: number) =&gt; JSX.Element</code> | Required | Renders a thumb corresponding to each entry in `values`. |

Slider is controlled. Update external state in `onChangeValues` and pass the new `values` back for the rendered value to change.

A valid domain requires finite `min`, `max`, and `step` values with `min < max` and `step > 0`. Values are clamped to the domain and aligned to `step`.

### Direction And Element

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `to` | <code>'right' &#124; 'left' &#124; 'top' &#124; 'bottom'</code> | `right` | Direction in which values increase. It determines orientation, percentage calculations, and arrow-key behavior. |
| `as` | <code>T</code> | `div` | Element or component rendered as the root. |
| Selected element props | <code>PolymorphicProps&lt;T&gt;</code> | `-` | Props other than Slider-specific props are forwarded to the root element. |

The root element receives `role="group"`.

## Component

### `SliderRail`

Registers the reference element used to convert pointer positions into values and renders the ranges returned by `getRanges`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `getRanges` | <code>(values: number[], domain: SliderDomain) =&gt; SliderRange[]</code> | Required | Returns displayed ranges as an array of `[start, end]` tuples. |
| `children` | <code>(range: Accessor&lt;SliderRailRange&gt;) =&gt; JSX.Element</code> | `-` | Renders each normalized range. |
| `onPointerDown` | <code>JSX.EventHandlerUnion&lt;HTMLElement, PointerEvent&gt;</code> | `-` | Runs before internal rail behavior. Call `preventDefault()` to cancel the internal request. |
| `as` | <code>T</code> | `div` | Element or component rendered as the rail. |
| Selected element props | <code>PolymorphicProps&lt;T&gt;</code> | `-` | Props other than rail-specific props are forwarded to the element. |

Pressing an empty rail area with the primary pointer button updates the nearest enabled thumb and focuses it. Pointer events starting on a thumb do not run the rail move.

Each range returned by `getRanges` keeps only finite numbers, sorts its endpoints from low to high, and clamps them to the domain.

#### Range Data

| Name | Type | Description |
| --- | --- | --- |
| `start` | <code>number</code> | Normalized range start value. |
| `end` | <code>number</code> | Normalized range end value. |
| `startPercent` | <code>number</code> | Start value percentage adjusted for `to`. |
| `endPercent` | <code>number</code> | End value percentage adjusted for `to`. |
| `offsetPercent` | <code>number</code> | Smaller of the two percentages, suitable for a CSS inset. |
| `sizePercent` | <code>number</code> | Absolute size between the two percentages. |

The rail element receives `data-orientation` and `data-to`.

### `SliderThumb`

Renders a focusable thumb that adjusts one slider value. The recommended structure renders one inside `renderValue` for each value.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | <code>boolean</code> | `false` | Disables only this thumb. |
| `style` | <code>string &#124; JSX.CSSProperties</code> | `-` | Applies user styles together with the computed `--slider-thumb-percent` custom property. |
| `onKeyDown` | <code>JSX.EventHandlerUnion&lt;T, KeyboardEvent&gt;</code> | `-` | Runs before internal keyboard behavior. |
| `onPointerDown` | <code>JSX.EventHandlerUnion&lt;T, PointerEvent&gt;</code> | `-` | Runs before pointer dragging starts. |
| `onPointerMove` | <code>JSX.EventHandlerUnion&lt;T, PointerEvent&gt;</code> | `-` | Runs before a pointer drag update. |
| `onPointerUp` | <code>JSX.EventHandlerUnion&lt;T, PointerEvent&gt;</code> | `-` | Runs before pointer capture ends. |
| `onPointerCancel` | <code>JSX.EventHandlerUnion&lt;T, PointerEvent&gt;</code> | `-` | Runs before canceled pointer capture is cleaned up. |
| `as` | <code>T</code> | `div` | Element or component rendered as the thumb. |
| Selected element props | <code>PolymorphicProps&lt;T&gt;</code> | `-` | Props other than thumb-specific props are forwarded to the element. |

The thumb receives `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-orientation`, and `aria-disabled`. Styling selectors can also use `data-slider-thumb`, `data-disabled`, `data-orientation`, `data-to`, `data-value`, and `data-percent`.

The default `tabindex` is `0`. The current implementation does not automatically remove a disabled thumb from the tab order, so pass `tabindex={-1}` when needed. Calling `preventDefault()` in `onKeyDown`, `onPointerDown`, or `onPointerMove` cancels the corresponding internal behavior.

### `SliderLabel`

Repeats a label render function across the domain. Pass either an automatic label `step` or explicit `labelAt` values, but not both.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `step` | <code>number</code> | Conditionally required | Interval used to create automatic labels from `min` through `max`. `max` is included even when it does not align exactly. |
| `labelAt` | <code>readonly number[]</code> | Conditionally required | Explicit label values. Only finite values inside the domain are retained. |
| `children` | <code>(label: SliderLabelRenderProps) =&gt; JSX.Element</code> | Required | Renders each label's value, index, and percentage. |
| `as` | <code>T</code> | `div` | Element or component rendered as the label container. |
| Selected element props | <code>PolymorphicProps&lt;T&gt;</code> | `-` | Props other than label-specific props are forwarded to the container. |

| Name | Type | Description |
| --- | --- | --- |
| `value` | <code>number</code> | Label value. |
| `index` | <code>number</code> | Index in the rendered label array. |
| `percent` | <code>number</code> | Label position adjusted for `to`. |

The order and duplicates in `labelAt` are preserved. No labels render when the domain is invalid.

## Hooks

### `useSlider`

Use `useSlider` under a Slider provider to read normalized public state and calculate values or ranges in custom slider parts.

#### Signature

```ts
const [state, actions] = useSlider();
```

```ts
const [state, actions]: [SliderState, SliderActions] = useSlider();
```

Calling it outside a Slider provider fails because there is no context to read.

#### State

| Name | Type | Description |
| --- | --- | --- |
| `state.values` | <code>number[]</code> | Current values clamped and step-aligned when the domain is valid. |
| `state.min` | <code>number</code> | Current minimum. |
| `state.max` | <code>number</code> | Current maximum. |
| `state.step` | <code>number</code> | Current step. |
| `state.to` | <code>'right' &#124; 'left' &#124; 'top' &#124; 'bottom'</code> | Effective increase direction. Defaults to `right` when the prop is absent. |
| `state.orientation` | <code>'horizontal' &#124; 'vertical'</code> | Orientation derived from `to`. |
| `state.disabled` | <code>boolean</code> | Disabled state of the root Slider. |

#### Actions

| Name | Type | Description |
| --- | --- | --- |
| `actions.valueToPercent` | <code>(value: number) =&gt; number</code> | Converts a value to a 0–100 percentage adjusted for `to`. Returns `0` when the Slider configuration is invalid. |
| `actions.normalizeRanges` | <code>(ranges: SliderRange[]) =&gt; SliderRange[]</code> | Sorts finite ranges and clamps them to the domain. Returns an empty array when the Slider configuration is invalid. |
| `actions.requestValue` | <code>(index: number, value: number) =&gt; void</code> | Clamps and step-aligns a new value for the selected thumb, then requests it through `onChangeValues`. |

#### Behavior

Value requests and percentage/range calculations require a valid domain, finite `values`, one or more thumbs, and equal `values` and thumb counts. `requestValue` does not request a value when the root or target thumb is disabled.

`requestValue` does not mutate the `values` prop internally. `onChangeValues` is responsible for updating controlled state.

#### Example

```tsx
import { useSlider } from '@suis-ui/primitives';

const CurrentValues = () => {
  const [state, actions] = useSlider();

  return (
    <output>
      {state.values.map((value) => (
        `${value} (${actions.valueToPercent(value)}%)`
      )).join(', ')}
    </output>
  );
};
```

## Interaction And Accessibility

| Input | Result |
| --- | --- |
| Press an empty rail area with the primary pointer | Moves and focuses the nearest enabled thumb. The most recently focused thumb wins a distance tie. |
| Drag a thumb with the pointer | Converts the horizontal or vertical rail position into a new value. |
| `Home` / `End` | Requests the minimum / maximum. |
| `PageUp` / `PageDown` | Increases / decreases the current value by `step × 10`. |
| Arrow key matching the orientation | Adjusts by one `step` in the increase direction defined by `to`. |

Pass an `aria-label` or `aria-labelledby` that describes the purpose of each thumb. For multiple thumbs, use names that distinguish their meanings.

## Examples

### Basic Slider

```tsx
import { createSignal } from 'solid-js';
import { Slider, SliderRail, SliderThumb } from '@suis-ui/primitives';

const [values, setValues] = createSignal([25]);

<Slider
  values={values()}
  onChangeValues={setValues}
  renderValue={(value) => (
    <SliderThumb
      aria-label="Volume"
      style={{
        position: 'absolute',
        left: 'var(--slider-thumb-percent)',
        transform: 'translateX(-50%)',
      }}
    >
      {value()}
    </SliderThumb>
  )}
>
  <SliderRail getRanges={(values, domain) => [[domain.min, values[0]]]}>
    {(range) => (
      <div
        style={{
          position: 'absolute',
          left: `${range().offsetPercent}%`,
          width: `${range().sizePercent}%`,
        }}
      />
    )}
  </SliderRail>
</Slider>
```

### Multiple Values And Ranges

```tsx
import { createSignal } from 'solid-js';

const [range, setRange] = createSignal([20, 70]);

<Slider
  values={range()}
  onChangeValues={setRange}
  renderValue={(value, index) => (
    <SliderThumb
      aria-label={index === 0 ? 'Minimum price' : 'Maximum price'}
      style={{ left: 'var(--slider-thumb-percent)' }}
    >
      {value()}
    </SliderThumb>
  )}
>
  <SliderRail getRanges={(values) => [[values[0], values[1]]]}>
    {(segment) => (
      <div
        style={{
          left: `${segment().offsetPercent}%`,
          width: `${segment().sizePercent}%`,
        }}
      />
    )}
  </SliderRail>
</Slider>
```

`Slider` does not sort the value array or prevent thumbs from crossing automatically. Apply any range policy in `onChangeValues`.

### Labels

```tsx
<SliderLabel step={20}>
  {({ value, percent }) => (
    <span style={{ left: `${percent}%` }}>{value}</span>
  )}
</SliderLabel>

<SliderLabel labelAt={[0, 25, 75, 100]}>
  {({ value, percent }) => (
    <span style={{ left: `${percent}%` }}>{value}</span>
  )}
</SliderLabel>
```

### Vertical Slider

```tsx
<Slider
  min={0}
  max={10}
  step={0.5}
  to="top"
  values={values()}
  onChangeValues={setValues}
  renderValue={(value) => (
    <SliderThumb
      aria-label="Level"
      style={{ bottom: 'var(--slider-thumb-percent)' }}
    >
      {value()}
    </SliderThumb>
  )}
>
  <SliderRail getRanges={(values, domain) => [[domain.min, values[0]]]} />
</Slider>
```
