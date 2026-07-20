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
│   ├── SliderActiveRail
│   └── SliderThumb
├── SliderLabel (labelAt | labelStep)
└── SliderMarks (marksAt | marksStep)
```

`SliderRail` is the shared 0–100% pointer rectangle and containing block. It renders active ranges before the Thumb. The public `renderThumb`, `renderRail`, `renderActiveRail`, and part-prop names are unchanged.

`Slider` is controlled. Pointer or keyboard input calls `onChangeValue`; update external state and pass the new `value` back for the rendered value to change.

## Props

### Value And Domain Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | required | Current thumb value. |
| `onChangeValue` | `(value: number) => void` | - | Called when a new value is requested. |
| `startAt` | `number` | `min` | Value that anchors the active rail interval. |
| `variant` | `default` or `filled` | `default` | Visual rail and thumb variant. |
| `min` | `number` | `0` | Domain minimum. |
| `max` | `number` | `100` | Domain maximum. |
| `step` | `number` | `1` | Interval used to align requested values. |
| `to` | one of `right`, `left`, `top`, `bottom` | `right` | Determines the increase direction and orientation. |
| `disabled` | `boolean` | `false` | Disables Slider interaction. |

A valid domain requires finite `min`, `max`, and `step` values with `min < max` and `step > 0`. Requested values are clamped to the domain and aligned to `step`.

The active rail spans the interval between `startAt` and the current value, whether the current value is below or above the anchor. Omitting `startAt` uses `min`, preserving the default active interval from `min` to the current value. A finite `startAt` outside the domain is clamped to the domain; a non-finite `startAt` renders no active rail or active marks.

### Labels And Marks Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `labelAt` | `readonly number[]` | - | Renders text labels at explicit values. Cannot be combined with `labelStep`. |
| `labelStep` | `number` | - | Generates labels from `min` through `max`. Cannot be combined with `labelAt`. |
| `marksAt` | `readonly number[]` | - | Renders rail marks at explicit values. Cannot be combined with `marksStep`. |
| `marksStep` | `number` | - | Generates mark positions from `min` through `max`. Cannot be combined with `marksAt`. |

Automatic labels and marks include `max` even when it does not align exactly with the step. Marks at `min` and `max` are also rendered. In single-value Slider, marks within the active interval between `startAt` and the current value are active.

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

Each variant's `rail` controls track size, radius, and background. `activeRail` highlights the interval between `startAt` and the current value. The root reserves internal active-axis space at both ends: half the default Thumb size for `default`, and half the Rail size for `filled`. Rail percentages, pointer input, Thumb centers, active endpoints, labels, and marks all use the resulting inner axis, so their boxes remain inside the root rectangle in horizontal, vertical, and reversed directions.

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
| `renderLabel` | `DefaultSliderLabel` | Replaces each text-label component. |
| `renderMark` | Variant-specific `DefaultSliderMarks` or `FilledSliderMarks` | Replaces each rail-mark component. |
| `thumbProps` | - | Props passed to the thumb. |
| `railProps` | - | Props passed to the rail. `actives`, `renderActive`, and `children` are managed internally. |
| `activeRailProps` | - | Box props passed to the active rail. |
| `labelProps` | - | Box props passed to each label. |
| `markProps` | - | Props passed to each mark. |

### renderThumb

`renderThumb` replaces the default thumb. Spread the provided props onto the actual thumb element to preserve pointer, keyboard, ARIA, and positioning behavior.

### renderRail

`renderRail` replaces the track wrapper. Spread the provided props onto the actual Rail to preserve `actives`, `renderActive`, Thumb children, and pointer behavior.

### renderActiveRail

`renderActiveRail` replaces the highlighted segment and receives the computed `range`. The default component maps `offsetPercent` and `sizePercent` to CSS variables.

### renderLabel

`renderLabel` receives `value`, `index`, `percent`, and the label-text child.

### renderMark

`renderMark` replaces generated rail marks and receives their computed `value`, `index`, `percent`, and active state.

### thumbProps

`thumbProps` is passed to the thumb. An explicit `aria-label` or `aria-labelledby` takes priority over the root accessible name. Classes, styles, event handlers, and primitive thumb props are also forwarded.

### railProps

`railProps` is passed to the rail, but internal composition overwrites `actives`, `renderActive`, and `children`. Use it for classes, styles, or pointer handlers.

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

### Start The Active Rail At A Value

```tsx
<Slider
  aria-label="Balance"
  value={value()}
  onChangeValue={setValue}
  startAt={50}
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
