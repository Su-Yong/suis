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
│   ├── SliderActiveRail × active ranges
│   └── SliderThumb × 2
├── SliderLabel (labelAt | labelStep)
└── SliderMarks (marksAt | marksStep)
```

RangeBar uses the same Rail-owned `SliderBase` structure as Slider. The Rail renders all active ranges before both Thumbs and remains the pointer rectangle and percentage containing block. Public renderer and part-prop names are unchanged.

`RangeBar` is controlled. When either thumb requests a value, `onChangeValue` receives a new tuple, which the caller must pass back as `value`.

## Props

### Value And Domain Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `readonly [number, number]` | required | Current values of the two thumbs. Tuple order corresponds to thumb order. |
| `onChangeValue` | `(value: readonly [number, number]) => void` | - | Called when either thumb requests a new value. |
| `inverted` | `boolean` | `false` | Activates the two intervals outside the lower and higher values. |
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

Marks at `min` and `max` are also rendered. Marks follow the active rail intervals: between the lower and higher value by default, or in both outer intervals when `inverted` is `true`.

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

By default, the active rail renders from the lower value to the higher value. With `inverted`, it instead renders the two outer intervals from `min` to the lower value and from the higher value to `max`. RangeBar shares Slider's root-bounded inner axis: default reserves half the Thumb size at both ends and filled reserves half the Rail size. Rail, pointer input, both Thumb centers, active endpoints, labels, and marks remain aligned inside the root in every direction.

### Marks And Direction

Marks are active within the same interval or intervals as the active rail. `to` changes both percentage direction and horizontal/vertical layout. The selected ranges continue to use the lower and higher value even when tuple order changes.

## Rendering

| Name | Default | Description |
| --- | --- | --- |
| `renderThumb` | Variant-specific `DefaultSliderThumb` or `FilledSliderThumb` | Replaces the shared component used for both thumbs. |
| `renderRail` | Variant-specific `DefaultSliderRail` or `FilledSliderRail` | Replaces the rail component. |
| `renderActiveRail` | Variant-specific `DefaultActiveRail` or `FilledActiveRail` | Replaces each active-range component. |
| `renderLabel` | `DefaultSliderLabel` | Replaces each text-label component. |
| `renderMark` | Variant-specific `DefaultSliderMarks` or `FilledSliderMarks` | Replaces each rail-mark component. |
| `thumbProps` | - | Props shared by both thumbs. |
| `railProps` | - | Props passed to the rail. `actives`, `renderActive`, and `children` are managed internally. |
| `activeRailProps` | - | Box props passed to the active rail. |
| `labelProps` | - | Box props passed to each label. |
| `markProps` | - | Props passed to each mark. |

### renderThumb

`renderThumb` uses the same component for both thumbs. Spread the provided props onto the actual thumb to preserve pointer, keyboard, ARIA, and positioning behavior. Current renderer props do not include the thumb index or value.

### renderRail

`renderRail` replaces the track wrapper. Spread the internally supplied props onto the actual Rail to preserve `actives`, `renderActive`, both Thumb children, and pointer behavior.

### renderActiveRail

`renderActiveRail` receives each normalized active `range`. It is invoked once for the inner range by default and once for each of the two outer ranges when `inverted` is `true`. The default component maps range offset and size to CSS variables.

### renderLabel

`renderLabel` receives `value`, `index`, `percent`, and the label-text child. RangeBar does not reuse it as the mark renderer.

### renderMark

`renderMark` replaces the component receiving each mark's `value`, `index`, `percent`, and `active` state.

### thumbProps

`thumbProps` is passed identically to both thumbs. Use it for shared classes, styles, event handlers, disabled state, or accessibility props.

### railProps

`railProps` is passed to the rail, but internal composition overwrites `actives`, `renderActive`, and `children`.

### activeRailProps

`activeRailProps` is passed to the active rail. The computed `range` is supplied last.

### labelProps

`labelProps` is shared by all text labels. Use it for common typography, classes, or Box props.

### markProps

`markProps` is shared by all rail marks. Computed position and active state are managed internally.

RangeBar can reuse the public default part components exported with Slider. See [Slider Rendering](./slider.md#rendering) for the full list.

## Range Behavior

`RangeBar` does not sort the tuple or prevent thumbs from crossing. Callback tuple indices continue to identify each thumb. Only active-rail and active-mark calculations use the lower and higher values.

With `inverted`, crossed values select the same outer intervals as their sorted equivalents. Equal values make the two inclusive outer intervals meet at the shared value. A thumb at `min` or `max` produces a zero-length outer interval at that boundary.

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

### Inverted Active Ranges

```tsx
<RangeBar
  aria-label="Excluded interval"
  value={range()}
  onChangeValue={setRange}
  inverted
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
