# Slider

`Slider` is the styled single-value slider in `@suis-ui/kit`. It combines primitive Slider pointer and keyboard behavior with a rail, active rail, thumb, labels, marks, and `default` or `filled` variants.

## Usage

```tsx
import { createSignal } from 'solid-js';
import { Slider } from '@suis-ui/kit';

const [value, setValue] = createSignal(40);

<Slider
  aria-label="Volume"
  value={value()}
  onChangeValue={setValue}
/>;
```

The actual structure can be read as a lightweight tree:

```text
Slider
├── SliderRail
│   └── SliderActiveRail
├── SliderLabel (labelAt | labelStep)
├── SliderMarks (marksAt | marksStep)
└── SliderThumb
```

`Slider` is controlled. Pointer or keyboard input calls `onChangeValue`; update external state and pass the new `value` back for the rendered value to change.

## Props

### Value And Domain Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | required | Current thumb value. |
| `onChangeValue` | `(value: number) => void` | - | Called when a new value is requested. |
| `variant` | `default` or `filled` | `default` | Visual rail and thumb variant. |
| `min` | `number` | `0` | Domain minimum. |
| `max` | `number` | `100` | Domain maximum. |
| `step` | `number` | `1` | Interval used to align requested values. |
| `to` | one of `right`, `left`, `top`, `bottom` | `right` | Determines the increase direction and orientation. |
| `disabled` | `boolean` | `false` | Disables Slider interaction. |

A valid domain requires finite `min`, `max`, and `step` values with `min < max` and `step > 0`. Requested values are clamped to the domain and aligned to `step`.

### Labels And Marks Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `labelAt` | `readonly number[]` | - | Renders text labels at explicit values. Cannot be combined with `labelStep`. |
| `labelStep` | `number` | - | Generates labels from `min` through `max`. Cannot be combined with `labelAt`. |
| `marksAt` | `readonly number[]` | - | Renders rail marks at explicit values. Cannot be combined with `marksStep`. |
| `marksStep` | `number` | - | Generates mark positions from `min` through `max`. Cannot be combined with `marksAt`. |

Automatic labels include `max` even when it does not align exactly with the step. Marks at `min` and `max` are not rendered. In single-value Slider, marks from `min` through the current value are active.

### Box Mixin Props

The root renders through [Box](./box.md), so `class` and `style` apply on top of Slider layout.

The current `SliderProps` type derives from primitive Slider props and does not declare Box-only props such as `w`, `p`, or `bg`. The runtime wrapper consumes those props, but TypeScript may reject them; use `class` or `style` until the type is widened. The typed `as` prop is also overwritten by the internal adapter, so the final root element currently remains a `div`.

## Styling

Slider styles read from the `component.slider` theme contract.

```ts
component.slider = {
  size,
  transition,
  disabled: { opacity, background },
  variants: {
    default: {
      rail: { size, radius, background },
      activeRail: { background, size, radius },
      thumb: {
        size,
        radius,
        background,
        borderWidth,
        borderColor,
        hover: { background, borderWidth, borderColor },
        active: { background, borderWidth, borderColor, scale },
        focus: { offset, color, width },
      },
    },
    filled: {
      rail: { size, radius, background },
      activeRail: { background, size, radius },
      thumb: {
        size,
        radius,
        background,
        borderWidth,
        borderColor,
        hover: { background, borderWidth, borderColor },
        active: { background, borderWidth, borderColor, scale },
        focus: { offset, color, width },
      },
    },
  },
  label: { gap, width, height, font, color },
  mark: { size, radius, background, active: { background } },
}
```

`sliderVars` exposes the contract itself, while `DefaultSliderVars` exposes the default value structure. Use `component.slider` for ordinary theme overrides.

### Size And Direction

`size` is the minimum width of a horizontal Slider and the minimum height of a vertical Slider. `to="right"` and `to="left"` create a horizontal orientation; `to="top"` and `to="bottom"` create a vertical orientation.

### Rail And Active Rail

Each variant's `rail` controls track size, radius, and background. `activeRail` highlights the segment from `min` to the current value. The thicker `filled` variant applies endpoint corrections so the thumb and active rail stay within the track bounds.

### Thumb

`thumb` controls size, radius, surface, and border. The `hover`, `active`, and `focus` groups apply to pointer hover, dragging, and focus-visible states. Thumb positioning uses the `--slider-thumb-percent` custom property supplied by the primitive.

### Labels And Marks

`label` controls label-container gap and size, typography, and color. `mark` controls rail-dot size, radius, default background, and active background.

### Disabled And Transition

`disabled.opacity` applies to the root, while `disabled.background` applies to disabled thumbs. `transition` is used for active-rail and thumb state changes.

## Rendering

| Name | Default | Description |
| --- | --- | --- |
| `renderThumb` | Variant-specific `DefaultSliderThumb` or `FilledSliderThumb` | Replaces the thumb component. |
| `renderRail` | Variant-specific `DefaultSliderRail` or `FilledSliderRail` | Replaces the rail component. |
| `renderActiveRail` | Variant-specific `DefaultActiveRail` or `FilledActiveRail` | Replaces the active-range component. |
| `renderLabel` | `DefaultSliderLabel` | Replaces each text-label component. It is also used as the custom mark renderer in the current Slider implementation. |
| `renderMark` | - | Present in the API, but not currently used by single-value Slider marks. |
| `thumbProps` | - | Props passed to the thumb. |
| `railProps` | - | Props passed to the rail. `children` and `getRanges` are managed internally. |
| `activeRailProps` | - | Box props passed to the active rail. |
| `labelProps` | - | Box props passed to each label. |
| `markProps` | - | Props passed to each mark. |

### renderThumb

`renderThumb` replaces the default thumb. Spread the provided props onto the actual thumb element to preserve pointer, keyboard, ARIA, and positioning behavior.

### renderRail

`renderRail` replaces the track wrapper. Preserve the provided `getRanges` and render-function `children` for rail clicking and the active range to work.

### renderActiveRail

`renderActiveRail` replaces the highlighted segment and receives the computed `range`. The default component maps `offsetPercent` and `sizePercent` to CSS variables.

### renderLabel

`renderLabel` receives `value`, `index`, `percent`, and the label-text child. The current single-value Slider implementation also uses `renderLabel` as the custom mark component, so a renderer must handle both shapes when labels and marks are enabled together.

### renderMark

`renderMark` is present in the public type, but it is not connected to the single-value Slider mark path. Currently, use `renderLabel` to replace marks. `RangeBar` connects `renderMark` normally.

### thumbProps

`thumbProps` is passed to the thumb. An explicit `aria-label` or `aria-labelledby` takes priority over the root accessible name. Classes, styles, event handlers, and primitive thumb props are also forwarded.

### railProps

`railProps` is passed to the rail, but internal range calculation overwrites `children` and `getRanges`. Use it for classes, styles, or pointer handlers.

### activeRailProps

`activeRailProps` is passed to the active-rail component. The computed `range` is supplied last and cannot be overridden by the caller.

### labelProps

`labelProps` is shared by all generated text labels. Use it for common typography, classes, or Box props.

### markProps

`markProps` is shared by all generated rail marks. Computed `value`, `index`, `percent`, and active state are managed internally.

The default part components are also public and reusable inside custom renderers: `DefaultSliderThumb`, `FilledSliderThumb`, `DefaultSliderRail`, `FilledSliderRail`, `DefaultActiveRail`, `FilledActiveRail`, `DefaultSliderLabel`, `DefaultSliderMarks`, and `FilledSliderMarks`.

## Accessibility

The root receives `role="group"`; the thumb receives `role="slider"` and value/orientation ARIA attributes. A root `aria-label` or `aria-labelledby` is also used as the single thumb's name when `thumbProps` does not provide an explicit name.

Keyboard support includes `Home`, `End`, `PageUp`, `PageDown`, and orientation-appropriate arrow keys. See primitive [Slider](../primitives/slider.md) for low-level interaction details.

The primitive thumb keeps its default `tabindex` of `0` while disabled. Set `thumbProps.tabindex` to `-1` to remove a disabled Slider from the tab order.

## Examples

### Basic Slider

```tsx
import { createSignal } from 'solid-js';
import { Slider } from '@suis-ui/kit';

const [volume, setVolume] = createSignal(35);

<Slider
  aria-label="Volume"
  value={volume()}
  onChangeValue={setVolume}
/>;
```

### Filled With Labels And Marks

```tsx
<Slider
  aria-label="Progress"
  variant="filled"
  value={value()}
  onChangeValue={setValue}
  labelStep={20}
  marksStep={10}
/>;
```

### Vertical Slider

```tsx
<Slider
  aria-label="Level"
  min={0}
  max={10}
  step={0.5}
  to="top"
  value={value()}
  onChangeValue={setValue}
  style={{ height: '240px' }}
/>;
```

### Custom Thumb

```tsx
import { DefaultSliderThumb, Slider } from '@suis-ui/kit';

<Slider
  aria-label="Brightness"
  value={value()}
  onChangeValue={setValue}
  renderThumb={(props) => (
    <DefaultSliderThumb {...props} class="brightness-thumb" />
  )}
/>;
```
