# RangeBar

`RangeBar`는 `@suis-ui/kit`의 스타일 two-value slider입니다. [Slider](./slider.md)와 같은 rail, label, mark, variant API를 사용하면서 두 thumb 사이를 active range로 표시합니다.

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

실제 구조는 다음처럼 볼 수 있습니다.

```text
RangeBar
├── SliderRail
│   └── SliderActiveRail (두 값 사이)
├── SliderLabel (labelAt | labelStep)
├── SliderMarks (marksAt | marksStep)
└── SliderThumb × 2
```

`RangeBar`는 controlled 컴포넌트입니다. 두 thumb 중 하나가 값을 요청하면 `onChangeValue`가 새 tuple을 받고, caller가 이를 다시 `value`로 전달해야 합니다.

## Props

### Value And Domain Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `value` | `readonly [number, number]` | 필수 | 두 thumb의 현재 값입니다. Tuple 순서와 thumb 순서가 대응합니다. |
| `onChangeValue` | `(value: readonly [number, number]) => void` | - | 한 thumb의 새 값이 요청될 때 호출됩니다. |
| `variant` | `default` 또는 `filled` | `default` | Rail과 두 thumb의 시각 variant입니다. |
| `min` | `number` | `0` | Domain 최솟값입니다. |
| `max` | `number` | `100` | Domain 최댓값입니다. |
| `step` | `number` | `1` | 입력 값을 맞출 간격입니다. |
| `to` | `right`, `left`, `top`, `bottom` 중 하나 | `right` | 값이 증가하는 방향과 orientation을 결정합니다. |
| `disabled` | `boolean` | `false` | 두 thumb의 상호작용을 비활성화합니다. |

Domain과 값 정규화는 [Slider](./slider.md)와 같습니다. 각 값은 `min`과 `max` 안으로 제한되고 `step`에 맞춰집니다.

### Labels And Marks Props

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `labelAt` | `readonly number[]` | - | 지정한 값에 text label을 렌더링합니다. `labelStep`과 함께 사용할 수 없습니다. |
| `labelStep` | `number` | - | `min`부터 `max`까지 자동 label을 생성합니다. `labelAt`과 함께 사용할 수 없습니다. |
| `marksAt` | `readonly number[]` | - | 지정한 값에 rail mark를 렌더링합니다. `marksStep`과 함께 사용할 수 없습니다. |
| `marksStep` | `number` | - | `min`부터 `max`까지 자동 mark 위치를 생성합니다. `marksAt`과 함께 사용할 수 없습니다. |

Mark는 `min`과 `max`에서 렌더링되지 않습니다. 두 값의 tuple 순서와 관계없이 작은 값과 큰 값 사이의 mark가 active 상태가 됩니다.

### Box Mixin Props

Root는 내부적으로 [Box](./box.md)를 거쳐 렌더링되어 `class`와 `style`이 RangeBar layout 위에 적용됩니다.

현재 `RangeBarProps` 타입은 primitive Slider props에서 파생되어 Box 전용 props를 선언하지 않습니다. Runtime wrapper는 해당 props를 처리하지만 TypeScript에서는 거부될 수 있으므로 `class`나 `style`을 사용하세요. 타입에 포함된 `as`도 현재 최종 root element를 바꾸지 못하며 root는 `div`로 렌더링됩니다.

## Styling

RangeBar는 Slider와 같은 `component.slider` theme contract를 사용합니다.

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

전체 nested key와 thumb 상태 token은 [Slider Styling](./slider.md#styling)을 참고하세요.

### Range Rail

Active rail은 두 값의 작은 쪽부터 큰 쪽까지 렌더링됩니다. `default` variant는 계산된 offset과 size를 그대로 사용하고, `filled` variant는 두꺼운 rail 안에서 thumb 중심과 구간 끝을 맞추도록 경계를 보정합니다.

### Marks And Direction

Mark active 상태는 두 값 사이에서만 적용됩니다. `to`는 percentage 방향과 horizontal/vertical layout을 함께 바꾸며, active range 자체는 tuple 순서가 바뀌어도 작은 값과 큰 값 사이를 유지합니다.

## Rendering

| 이름 | 기본값 | 설명 |
| --- | --- | --- |
| `renderThumb` | Variant에 따른 `DefaultSliderThumb` 또는 `FilledSliderThumb` | 두 thumb에 공통으로 사용할 component를 교체합니다. |
| `renderRail` | Variant에 따른 `DefaultSliderRail` 또는 `FilledSliderRail` | Rail component를 교체합니다. |
| `renderActiveRail` | Variant에 따른 `DefaultActiveRail` 또는 `FilledActiveRail` | 두 값 사이 active range component를 교체합니다. |
| `renderLabel` | `DefaultSliderLabel` | 각 text label component를 교체합니다. |
| `renderMark` | Variant에 따른 `DefaultSliderMarks` 또는 `FilledSliderMarks` | 각 rail mark component를 교체합니다. |
| `thumbProps` | - | 두 thumb에 공통으로 전달할 props입니다. |
| `railProps` | - | Rail에 전달할 props입니다. `children`과 `getRanges`는 내부에서 관리합니다. |
| `activeRailProps` | - | Active rail에 전달할 Box props입니다. |
| `labelProps` | - | 각 label에 전달할 Box props입니다. |
| `markProps` | - | 각 mark에 전달할 props입니다. |

### renderThumb

`renderThumb`는 두 thumb 모두에 같은 component를 사용합니다. 전달된 props를 실제 thumb에 spread해야 pointer, keyboard, ARIA, 위치 동작이 유지됩니다. 현재 renderer props에는 thumb index나 value가 포함되지 않습니다.

### renderRail

`renderRail`은 track wrapper를 교체합니다. 내부에서 전달하는 `getRanges`와 render-function `children`을 유지해야 rail click과 range 표시가 동작합니다.

### renderActiveRail

`renderActiveRail`은 정규화된 두 값 사이의 `range`를 받습니다. 기본 component는 range offset과 size를 CSS variable로 연결합니다.

### renderLabel

`renderLabel`은 `value`, `index`, `percent`와 label text child를 받습니다. RangeBar에서는 mark renderer로 재사용되지 않습니다.

### renderMark

`renderMark`는 각 mark의 `value`, `index`, `percent`, `active` 상태를 받는 component를 교체합니다.

### thumbProps

`thumbProps`는 두 thumb에 동일하게 전달됩니다. Class, style, event handler, disabled와 접근성 props를 공통으로 지정할 수 있습니다.

### railProps

`railProps`는 rail에 전달되지만 `children`과 `getRanges`는 내부 range 계산이 덮어씁니다.

### activeRailProps

`activeRailProps`는 active rail에 전달됩니다. 계산된 `range`는 내부에서 마지막에 전달됩니다.

### labelProps

`labelProps`는 모든 text label에 공통으로 전달됩니다. Typography, class, Box props를 일괄 조정할 때 사용합니다.

### markProps

`markProps`는 모든 rail mark에 공통으로 전달됩니다. 계산된 위치와 active 상태는 내부에서 결정됩니다.

RangeBar는 Slider가 공개하는 기본 part component를 그대로 재사용할 수 있습니다. 전체 목록은 [Slider Rendering](./slider.md#rendering)을 참고하세요.

## Range Behavior

`RangeBar`는 tuple을 자동으로 정렬하지 않으며 두 thumb가 서로 교차할 수 있습니다. Callback tuple의 index는 계속 각 thumb의 index를 나타냅니다. Active rail과 active mark 계산만 두 값의 작은 쪽과 큰 쪽을 사용합니다.

Rail의 빈 영역을 누르면 가장 가까운 활성 thumb가 이동하고 focus됩니다. 두 thumb와 거리가 같으면 최근 focus된 thumb를 우선합니다.

## Accessibility

두 thumb는 각각 `role="slider"`와 value·orientation ARIA 속성을 받습니다. 현재 kit API는 `thumbProps`와 `renderThumb`를 두 thumb에 공통 적용하며 index나 value를 renderer에 제공하지 않습니다. 따라서 서로 다른 접근성 이름을 kit `RangeBar`만으로 지정할 수 없습니다. 각 thumb를 구분하는 이름이 필수인 경우에는 per-thumb renderer를 제공하는 primitive [Slider](../primitives/slider.md)를 사용하세요.

Disabled 상태에서도 primitive thumb의 기본 `tabindex`는 `0`입니다. Tab order에서 제거하려면 `thumbProps.tabindex`를 `-1`로 설정합니다.

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
