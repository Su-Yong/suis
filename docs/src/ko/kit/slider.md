# Slider

`Slider`는 `@suis-ui/kit`의 스타일 single-value slider입니다. Primitive Slider의 pointer·keyboard 동작에 rail, active rail, thumb, label, mark와 `default`·`filled` variant를 조합합니다.

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

실제 구조는 다음처럼 볼 수 있습니다.

```text
Slider
├── SliderRail
│   └── SliderActiveRail
├── SliderLabel (labelAt | labelStep)
├── SliderMarks (marksAt | marksStep)
└── SliderThumb
```

`Slider`는 controlled 컴포넌트입니다. Pointer나 keyboard 입력이 `onChangeValue`를 호출하면 외부 signal을 갱신하고 새 `value`를 다시 전달해야 화면도 바뀝니다.

## Props

### Value And Domain Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `value` | `number` | 필수 | Thumb의 현재 값입니다. |
| `onChangeValue` | `(value: number) => void` | - | 새 값이 요청될 때 호출됩니다. |
| `variant` | `default` 또는 `filled` | `default` | Rail과 thumb의 시각 variant입니다. |
| `min` | `number` | `0` | Domain 최솟값입니다. |
| `max` | `number` | `100` | Domain 최댓값입니다. |
| `step` | `number` | `1` | 입력 값을 맞출 간격입니다. |
| `to` | `right`, `left`, `top`, `bottom` 중 하나 | `right` | 값이 증가하는 방향과 orientation을 결정합니다. |
| `disabled` | `boolean` | `false` | Slider 상호작용을 비활성화합니다. |

유효한 domain은 finite number인 `min`, `max`, `step`에 대해 `min < max`, `step > 0`을 만족해야 합니다. 입력 값은 domain 안으로 제한되고 `step`에 맞춰집니다.

### Labels And Marks Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `labelAt` | `readonly number[]` | - | 지정한 값에 text label을 렌더링합니다. `labelStep`과 함께 사용할 수 없습니다. |
| `labelStep` | `number` | - | `min`부터 `max`까지 자동 label을 생성합니다. `labelAt`과 함께 사용할 수 없습니다. |
| `marksAt` | `readonly number[]` | - | 지정한 값에 rail mark를 렌더링합니다. `marksStep`과 함께 사용할 수 없습니다. |
| `marksStep` | `number` | - | `min`부터 `max`까지 자동 mark 위치를 생성합니다. `marksAt`과 함께 사용할 수 없습니다. |

자동 label은 `max`가 step에 정확히 맞지 않아도 마지막에 포함합니다. Mark는 `min`과 `max` 위치를 렌더링하지 않으며, single-value Slider에서는 `min`부터 현재 값까지 active 상태가 됩니다.

### Box Mixin Props

Root는 내부적으로 [Box](./box.md)를 거쳐 렌더링되어 `class`와 `style`이 Slider layout 위에 적용됩니다.

현재 `SliderProps` 타입은 primitive Slider props에서 파생되어 `w`, `p`, `bg` 같은 Box 전용 props를 선언하지 않습니다. Runtime wrapper는 해당 props를 처리하지만 TypeScript에서는 거부될 수 있으므로, 타입이 확장되기 전에는 `class`나 `style`을 사용하세요. 타입에 포함된 `as`도 현재 내부 adapter가 덮어써 최종 root element는 `div`로 유지됩니다.

## Styling

Slider 스타일은 `component.slider` theme contract에서 가져옵니다.

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

`sliderVars`는 contract 자체를, `DefaultSliderVars`는 기본값 구조를 공개합니다. 일반적인 theme override에서는 `component.slider`를 사용하세요.

### Size And Direction

`size`는 horizontal Slider의 최소 너비와 vertical Slider의 최소 높이입니다. `to="right"`와 `to="left"`는 horizontal, `to="top"`과 `to="bottom"`은 vertical orientation을 만듭니다.

### Rail And Active Rail

각 variant의 `rail`은 track size, radius, background를 제어합니다. `activeRail`은 `min`부터 현재 값까지의 강조 구간입니다. `filled` variant는 rail이 두껍고 끝점에서 thumb와 active rail이 track 경계 안에 맞도록 별도 위치 보정을 적용합니다.

### Thumb

`thumb`은 size, radius, surface, border를 제어합니다. `hover`, `active`, `focus` 하위 토큰은 pointer hover, drag, focus-visible 상태에 각각 적용됩니다. Thumb 위치는 primitive가 제공하는 `--slider-thumb-percent` custom property를 사용합니다.

### Labels And Marks

`label`은 label container의 gap과 크기, typography, color를 제어합니다. `mark`는 rail 위 점의 크기, radius, 기본 background와 active background를 제어합니다.

### Disabled And Transition

`disabled.opacity`은 root 전체에 적용되고 `disabled.background`는 disabled thumb에 적용됩니다. `transition`은 active rail과 thumb 상태 전환에 사용됩니다.

## Rendering

| 이름 | 기본값 | 설명 |
| --- | --- | --- |
| `renderThumb` | Variant에 따른 `DefaultSliderThumb` 또는 `FilledSliderThumb` | Thumb component를 교체합니다. |
| `renderRail` | Variant에 따른 `DefaultSliderRail` 또는 `FilledSliderRail` | Rail component를 교체합니다. |
| `renderActiveRail` | Variant에 따른 `DefaultActiveRail` 또는 `FilledActiveRail` | Active range component를 교체합니다. |
| `renderLabel` | `DefaultSliderLabel` | 각 text label component를 교체합니다. 현재 Slider에서는 custom mark renderer로도 사용됩니다. |
| `renderMark` | - | API에는 있지만 single-value Slider의 mark 렌더링에는 현재 사용되지 않습니다. |
| `thumbProps` | - | Thumb에 공통으로 전달할 props입니다. |
| `railProps` | - | Rail에 전달할 props입니다. `children`과 `getRanges`는 내부에서 관리합니다. |
| `activeRailProps` | - | Active rail에 전달할 Box props입니다. |
| `labelProps` | - | 각 label에 전달할 Box props입니다. |
| `markProps` | - | 각 mark에 전달할 props입니다. |

### renderThumb

`renderThumb`는 기본 thumb를 교체합니다. 전달된 props를 실제 thumb element에 spread해야 pointer, keyboard, ARIA와 위치 동작이 유지됩니다.

### renderRail

`renderRail`은 track wrapper를 교체합니다. 전달된 `getRanges`와 render-function `children`을 유지해야 rail click과 active range가 동작합니다.

### renderActiveRail

`renderActiveRail`은 계산된 `range`를 받는 강조 구간을 교체합니다. 기본 component는 `offsetPercent`와 `sizePercent`를 CSS variable로 연결합니다.

### renderLabel

`renderLabel`은 `value`, `index`, `percent`와 label text child를 받습니다. 현재 single-value Slider 구현은 mark가 있을 때도 `renderLabel`을 custom mark component로 사용하므로, label과 mark를 동시에 활성화하면 두 형태의 props를 처리해야 합니다.

### renderMark

`renderMark` prop은 public 타입에 포함되어 있지만 현재 single-value Slider의 mark 경로에는 연결되지 않습니다. Mark를 교체하려면 현재는 `renderLabel`을 사용해야 합니다. `RangeBar`에서는 `renderMark`가 정상적으로 mark를 교체합니다.

### thumbProps

`thumbProps`는 thumb에 전달됩니다. `aria-label` 또는 `aria-labelledby`가 있으면 root의 접근성 이름보다 우선합니다. `class`, `style`, event handler, primitive thumb props도 전달할 수 있습니다.

### railProps

`railProps`는 rail에 전달되지만 `children`과 `getRanges`는 내부 계산이 덮어씁니다. Class, style, pointer handler를 조정할 때 사용합니다.

### activeRailProps

`activeRailProps`는 active rail component에 전달됩니다. 계산된 `range`는 내부에서 마지막에 전달되므로 호출자가 바꿀 수 없습니다.

### labelProps

`labelProps`는 생성된 모든 text label에 공통으로 전달됩니다. Typography, class, Box props를 일괄 조정할 때 사용합니다.

### markProps

`markProps`는 생성된 모든 rail mark에 공통으로 전달됩니다. 계산된 `value`, `index`, `percent`, active 상태는 내부에서 결정됩니다.

기본 part component인 `DefaultSliderThumb`, `FilledSliderThumb`, `DefaultSliderRail`, `FilledSliderRail`, `DefaultActiveRail`, `FilledActiveRail`, `DefaultSliderLabel`, `DefaultSliderMarks`, `FilledSliderMarks`도 공개되어 custom renderer 안에서 재사용할 수 있습니다.

## Accessibility

Root는 `role="group"`, thumb는 `role="slider"`와 value·orientation ARIA 속성을 받습니다. Root에 전달한 `aria-label` 또는 `aria-labelledby`는 `thumbProps`에 명시적인 이름이 없을 때 single thumb의 이름으로도 사용됩니다.

Keyboard는 `Home`, `End`, `PageUp`, `PageDown`과 orientation에 맞는 arrow key를 지원합니다. 자세한 low-level 동작은 primitive [Slider](../primitives/slider.md)를 참고하세요.

현재 primitive thumb의 기본 `tabindex`는 disabled 상태에서도 `0`입니다. Disabled Slider를 tab order에서 제거하려면 `thumbProps.tabindex`를 `-1`로 설정합니다.

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
