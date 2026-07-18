# RangeBar

`RangeBar` is the styled two-value slider in `@suis-ui/kit`. It shares the rail, label, mark, and variant API of [Slider](./slider.md), while displaying the segment between two thumbs as the active range.

## Usage

```tsx
import { createSignal } from 'solid-js';
import { RangeBar } from '@suis-ui/kit';

const [value, setValue] = createSignal<readonly [number, number]>([25, 75]);

<RangeBar
  aria-label="Price range"
  value={value()}
  onChangeValue={setValue}
/>;
```

The actual structure can be read as a lightweight tree:

```text
RangeBar
├── SliderRail
│   └── SliderActiveRail (between the two values)
├── SliderLabel (labelAt | labelStep)
├── SliderMarks (marksAt | marksStep)
└── SliderThumb × 2
```

`RangeBar` is controlled. When either thumb requests a value, `onChangeValue` receives a new tuple, which the caller must pass back as `value`.

## Props

### Value And Domain Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `readonly [number, number]` | required | Current values of the two thumbs. Tuple order corresponds to thumb order. |
| `onChangeValue` | `(value: readonly [number, number]) => void` | - | Called when either thumb requests a new value. |
| `variant` | `default` or `filled` | `default` | Visual variant for the rail and both thumbs. |
| `min` | `number` | `0` | Domain minimum. |
| `max` | `number` | `100` | Domain maximum. |
| `step` | `number` | `1` | Interval used to align requested values. |
| `to` | one of `right`, `left`, `top`, `bottom` | `right` | Determines the increase direction and orientation. |
| `disabled` | `boolean` | `false` | Disables interaction for both thumbs. |

Domain and value normalization match [Slider](./slider.md). Each value is clamped between `min` and `max` and aligned to `step`.

### Labels And Marks Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `labelAt` | `readonly number[]` | - | Renders text labels at explicit values. Cannot be combined with `labelStep`. |
| `labelStep` | `number` | - | Generates labels from `min` through `max`. Cannot be combined with `labelAt`. |
| `marksAt` | `readonly number[]` | - | Renders rail marks at explicit values. Cannot be combined with `marksStep`. |
| `marksStep` | `number` | - | Generates mark positions from `min` through `max`. Cannot be combined with `marksAt`. |

Marks at `min` and `max` are not rendered. Marks between the lower and higher value are active regardless of tuple order.

### Box Mixin Props

The root renders through [Box](./box.md), so `class` and `style` apply on top of RangeBar layout.

The current `RangeBarProps` type derives from primitive Slider props and does not declare Box-only props. The runtime wrapper consumes them, but TypeScript may reject them; use `class` or `style`. The typed `as` prop also does not currently change the final root element, which renders as a `div`.

## Styling

RangeBar uses the same `component.slider` theme contract as Slider.

```ts
component.slider = {
  size,
  transition,
  disabled: { opacity, background },
  variants: {
    default: { rail, activeRail, thumb },
    filled: { rail, activeRail, thumb },
  },
  label: { gap, width, height, font, color },
  mark: { size, radius, background, active: { background } },
}
```

See [Slider Styling](./slider.md#styling) for every nested key and thumb-state token.

### Range Rail

The active rail renders from the lower value to the higher value. The `default` variant uses the computed offset and size directly; the `filled` variant adjusts the bounds to align thumb centers and segment endpoints within the thicker track.

### Marks And Direction

Marks are active only between the two values. `to` changes both percentage direction and horizontal/vertical layout. The active range stays between the lower and higher value even when tuple order changes.

## Rendering

| Name | Default | Description |
| --- | --- | --- |
| `renderThumb` | Variant-specific `DefaultSliderThumb` or `FilledSliderThumb` | Replaces the shared component used for both thumbs. |
| `renderRail` | Variant-specific `DefaultSliderRail` or `FilledSliderRail` | Replaces the rail component. |
| `renderActiveRail` | Variant-specific `DefaultActiveRail` or `FilledActiveRail` | Replaces the active-range component between the two values. |
| `renderLabel` | `DefaultSliderLabel` | Replaces each text-label component. |
| `renderMark` | Variant-specific `DefaultSliderMarks` or `FilledSliderMarks` | Replaces each rail-mark component. |
| `thumbProps` | - | Props shared by both thumbs. |
| `railProps` | - | Props passed to the rail. `children` and `getRanges` are managed internally. |
| `activeRailProps` | - | Box props passed to the active rail. |
| `labelProps` | - | Box props passed to each label. |
| `markProps` | - | Props passed to each mark. |

### renderThumb

`renderThumb` uses the same component for both thumbs. Spread the provided props onto the actual thumb to preserve pointer, keyboard, ARIA, and positioning behavior. Current renderer props do not include the thumb index or value.

### renderRail

`renderRail` replaces the track wrapper. Preserve the internally supplied `getRanges` and render-function `children` for rail clicking and range display to work.

### renderActiveRail

`renderActiveRail` receives the normalized `range` between the two values. The default component maps range offset and size to CSS variables.

### renderLabel

`renderLabel` receives `value`, `index`, `percent`, and the label-text child. RangeBar does not reuse it as the mark renderer.

### renderMark

`renderMark` replaces the component receiving each mark's `value`, `index`, `percent`, and `active` state.

### thumbProps

`thumbProps` is passed identically to both thumbs. Use it for shared classes, styles, event handlers, disabled state, or accessibility props.

### railProps

`railProps` is passed to the rail, but internal range calculation overwrites `children` and `getRanges`.

### activeRailProps

`activeRailProps` is passed to the active rail. The computed `range` is supplied last.

### labelProps

`labelProps` is shared by all text labels. Use it for common typography, classes, or Box props.

### markProps

`markProps` is shared by all rail marks. Computed position and active state are managed internally.

RangeBar can reuse the public default part components exported with Slider. See [Slider Rendering](./slider.md#rendering) for the full list.

## Range Behavior

`RangeBar` does not sort the tuple or prevent thumbs from crossing. Callback tuple indices continue to identify each thumb. Only active-rail and active-mark calculations use the lower and higher values.

Pressing an empty rail area moves and focuses the nearest enabled thumb. The most recently focused thumb wins a distance tie.

## Accessibility

Each thumb receives `role="slider"` and value/orientation ARIA attributes. The current kit API applies `thumbProps` and `renderThumb` identically to both thumbs and does not expose index or value to the renderer. As a result, distinct accessible names cannot be assigned through kit `RangeBar` alone. When per-thumb names are required, use primitive [Slider](../primitives/slider.md), which provides a per-value renderer.

The primitive thumbs retain their default `tabindex` of `0` while disabled. Set `thumbProps.tabindex` to `-1` to remove them from the tab order.

## Examples

### Basic RangeBar

```tsx
import { createSignal } from 'solid-js';
import { RangeBar } from '@suis-ui/kit';

const [price, setPrice] = createSignal<readonly [number, number]>([20, 80]);

<RangeBar
  aria-label="Price range"
  value={price()}
  onChangeValue={setPrice}
/>;
```

### Filled With Labels And Marks

```tsx
<RangeBar
  aria-label="Selected interval"
  variant="filled"
  value={range()}
  onChangeValue={setRange}
  labelAt={[0, 25, 50, 75, 100]}
  marksStep={10}
/>;
```

### Vertical RangeBar

```tsx
<RangeBar
  aria-label="Allowed level range"
  min={0}
  max={10}
  step={1}
  to="top"
  value={range()}
  onChangeValue={setRange}
  style={{ height: '240px' }}
/>;
```
