# Slider Primitive

Primitive Slider는 하나 이상의 값을 pointer와 keyboard로 조절할 수 있는 headless slider입니다. Rail, thumb, label의 구조와 스타일은 애플리케이션에서 직접 구성합니다.

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

`renderValue`는 `values`의 각 항목에 대응하는 thumb를 렌더링합니다. Rail과 label은 `children`에 배치합니다.

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

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `values` | <code>number[]</code> | 필수 | 각 thumb의 현재 값입니다. 배열 순서와 렌더링된 thumb 순서가 대응합니다. |
| `onChangeValues` | <code>(values: number[]) =&gt; void</code> | `-` | Pointer 또는 keyboard 입력으로 새 값 배열이 요청될 때 호출됩니다. |
| `min` | <code>number</code> | `0` | 값 domain의 최솟값입니다. |
| `max` | <code>number</code> | `100` | 값 domain의 최댓값입니다. |
| `step` | <code>number</code> | `1` | 입력 값을 맞출 간격입니다. |
| `disabled` | <code>boolean</code> | `false` | Slider 전체의 상호작용을 비활성화합니다. |
| `children` | <code>JSX.Element</code> | 필수 | Rail, label, 기타 장식 요소입니다. |
| `renderValue` | <code>(value: Accessor&lt;number&gt;, index: number) =&gt; JSX.Element</code> | 필수 | `values`의 각 항목에 대응하는 thumb를 렌더링합니다. |

Slider는 controlled 방식입니다. `onChangeValues`에서 외부 signal을 갱신하고 새 `values`를 다시 전달해야 화면의 값도 바뀝니다.

유효한 domain은 finite number인 `min`, `max`, `step`에 대해 `min < max`, `step > 0`을 만족해야 합니다. 값은 domain 안으로 제한되고 `step`에 맞춰집니다.

### Direction And Element

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `to` | <code>'right' &#124; 'left' &#124; 'top' &#124; 'bottom'</code> | `right` | 값이 증가하는 방향입니다. 수평/수직 방향과 percentage 계산, arrow key 동작을 결정합니다. |
| `as` | <code>T</code> | `div` | Root로 렌더링할 element 또는 component입니다. |
| 선택한 element props | <code>PolymorphicProps&lt;T&gt;</code> | `-` | Slider 전용 prop을 제외한 나머지 props가 root element로 전달됩니다. |

Root element에는 `role="group"`이 설정됩니다.

## Component

### `SliderRail`

Pointer 위치를 값으로 변환하는 기준 element를 등록하고, `getRanges`가 반환한 구간을 render function으로 출력합니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `getRanges` | <code>(values: number[], domain: SliderDomain) =&gt; SliderRange[]</code> | 필수 | 표시할 구간을 `[start, end]` tuple 배열로 반환합니다. |
| `children` | <code>(range: Accessor&lt;SliderRailRange&gt;) =&gt; JSX.Element</code> | `-` | 정규화된 각 구간을 렌더링합니다. |
| `onPointerDown` | <code>JSX.EventHandlerUnion&lt;HTMLElement, PointerEvent&gt;</code> | `-` | 내부 rail 동작보다 먼저 호출됩니다. `preventDefault()`로 내부 요청을 취소할 수 있습니다. |
| `as` | <code>T</code> | `div` | Rail로 렌더링할 element 또는 component입니다. |
| 선택한 element props | <code>PolymorphicProps&lt;T&gt;</code> | `-` | Rail 전용 prop을 제외한 나머지 props가 element로 전달됩니다. |

Rail의 빈 영역을 primary pointer button으로 누르면 가장 가까운 활성 thumb의 값을 갱신하고 해당 thumb에 focus합니다. Thumb 자체에서 시작한 pointer event는 rail 이동을 실행하지 않습니다.

`getRanges`가 반환한 각 구간은 finite number만 유지하고, 작은 값부터 큰 값 순서로 정렬한 뒤 domain 안으로 제한합니다.

#### Range Data

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `start` | <code>number</code> | 정규화된 구간 시작 값입니다. |
| `end` | <code>number</code> | 정규화된 구간 끝 값입니다. |
| `startPercent` | <code>number</code> | `to` 방향을 반영한 시작 값의 percentage입니다. |
| `endPercent` | <code>number</code> | `to` 방향을 반영한 끝 값의 percentage입니다. |
| `offsetPercent` | <code>number</code> | 두 percentage 중 작은 값입니다. CSS inset에 사용할 수 있습니다. |
| `sizePercent` | <code>number</code> | 두 percentage 사이의 절댓값 크기입니다. |

Rail element에는 `data-orientation`과 `data-to`가 설정됩니다.

### `SliderThumb`

하나의 slider value를 조절하는 focusable thumb를 렌더링합니다. `renderValue` 안에서 value마다 하나씩 렌더링하는 것이 권장 구조입니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `disabled` | <code>boolean</code> | `false` | 이 thumb만 비활성화합니다. |
| `style` | <code>string &#124; JSX.CSSProperties</code> | `-` | 사용자 style과 계산된 `--slider-thumb-percent` custom property를 함께 적용합니다. |
| `onKeyDown` | <code>JSX.EventHandlerUnion&lt;T, KeyboardEvent&gt;</code> | `-` | 내부 keyboard 동작보다 먼저 호출됩니다. |
| `onPointerDown` | <code>JSX.EventHandlerUnion&lt;T, PointerEvent&gt;</code> | `-` | Pointer drag 시작 전에 호출됩니다. |
| `onPointerMove` | <code>JSX.EventHandlerUnion&lt;T, PointerEvent&gt;</code> | `-` | Pointer drag 갱신 전에 호출됩니다. |
| `onPointerUp` | <code>JSX.EventHandlerUnion&lt;T, PointerEvent&gt;</code> | `-` | Pointer capture를 끝내기 전에 호출됩니다. |
| `onPointerCancel` | <code>JSX.EventHandlerUnion&lt;T, PointerEvent&gt;</code> | `-` | 취소된 pointer capture를 정리하기 전에 호출됩니다. |
| `as` | <code>T</code> | `div` | Thumb로 렌더링할 element 또는 component입니다. |
| 선택한 element props | <code>PolymorphicProps&lt;T&gt;</code> | `-` | Thumb 전용 prop을 제외한 나머지 props가 element로 전달됩니다. |

Thumb에는 `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-orientation`, `aria-disabled`가 설정됩니다. `data-slider-thumb`, `data-disabled`, `data-orientation`, `data-to`, `data-value`, `data-percent`도 styling selector로 사용할 수 있습니다.

기본 `tabindex`는 `0`입니다. 현재 구현은 disabled thumb도 자동으로 tab order에서 제거하지 않으므로 필요하면 `tabindex={-1}`을 직접 전달합니다. `onKeyDown`, `onPointerDown`, `onPointerMove`에서 `preventDefault()`를 호출하면 해당 내부 동작을 취소할 수 있습니다.

### `SliderLabel`

Domain을 따라 label render function을 반복합니다. `step` 기반 자동 label 또는 명시적인 `labelAt` 중 하나만 전달합니다.

| 이름 | 타입 | 기본값 | 간단한 설명 |
| --- | --- | --- | --- |
| `step` | <code>number</code> | 조건부 필수 | `min`부터 `max`까지 자동 label을 만들 간격입니다. `max`는 간격과 정확히 맞지 않아도 포함됩니다. |
| `labelAt` | <code>readonly number[]</code> | 조건부 필수 | 직접 렌더링할 label 값입니다. Finite number이며 domain 안에 있는 값만 유지합니다. |
| `children` | <code>(label: SliderLabelRenderProps) =&gt; JSX.Element</code> | 필수 | 각 label의 값, index, percentage를 렌더링합니다. |
| `as` | <code>T</code> | `div` | Label container로 렌더링할 element 또는 component입니다. |
| 선택한 element props | <code>PolymorphicProps&lt;T&gt;</code> | `-` | Label 전용 prop을 제외한 나머지 props가 container로 전달됩니다. |

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `value` | <code>number</code> | Label 값입니다. |
| `index` | <code>number</code> | 렌더링되는 label 배열의 index입니다. |
| `percent` | <code>number</code> | `to` 방향을 반영한 label 위치입니다. |

`labelAt`의 순서와 중복은 그대로 유지됩니다. Domain이 유효하지 않으면 label을 렌더링하지 않습니다.

## Hooks

### `useSlider`

`useSlider`는 Slider provider 아래에서 정규화된 공개 상태를 읽고 custom slider part에서 값이나 range를 계산할 때 사용합니다.

#### Signature

```ts
const [state, actions] = useSlider();
```

```ts
const [state, actions]: [SliderState, SliderActions] = useSlider();
```

Slider provider 밖에서 호출하면 context를 찾을 수 없어 error가 발생합니다.

#### State

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `state.values` | <code>number[]</code> | 유효한 domain에서는 제한 및 step 정규화를 적용한 현재 값 배열입니다. |
| `state.min` | <code>number</code> | 현재 최솟값입니다. |
| `state.max` | <code>number</code> | 현재 최댓값입니다. |
| `state.step` | <code>number</code> | 현재 step입니다. |
| `state.to` | <code>'right' &#124; 'left' &#124; 'top' &#124; 'bottom'</code> | 유효한 증가 방향입니다. Prop이 없으면 `right`입니다. |
| `state.orientation` | <code>'horizontal' &#124; 'vertical'</code> | `to`에서 파생한 방향입니다. |
| `state.disabled` | <code>boolean</code> | Root Slider의 disabled 상태입니다. |

#### Actions

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| `actions.valueToPercent` | <code>(value: number) =&gt; number</code> | 값을 `to` 방향을 반영한 0–100 percentage로 변환합니다. Slider 구성이 유효하지 않으면 `0`입니다. |
| `actions.normalizeRanges` | <code>(ranges: SliderRange[]) =&gt; SliderRange[]</code> | Finite range를 정렬하고 domain 안으로 제한합니다. Slider 구성이 유효하지 않으면 빈 배열입니다. |
| `actions.requestValue` | <code>(index: number, value: number) =&gt; void</code> | 지정한 thumb의 새 값을 제한 및 step 정규화한 뒤 `onChangeValues`로 요청합니다. |

#### Behavior

값 요청과 percentage/range 계산이 활성화되려면 유효한 domain, finite `values`, 하나 이상의 thumb, 동일한 `values`와 thumb 개수가 필요합니다. Root 또는 대상 thumb가 disabled이면 `requestValue`가 값을 요청하지 않습니다.

`requestValue`는 내부에서 `values` prop을 직접 바꾸지 않습니다. Controlled state를 갱신하는 책임은 `onChangeValues`에 있습니다.

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

| 입력 | 결과 |
| --- | --- |
| Rail의 빈 영역을 primary pointer로 누름 | 가장 가까운 활성 thumb를 이동하고 focus합니다. 거리가 같으면 최근 focus된 thumb를 우선합니다. |
| Thumb를 pointer로 drag | Rail의 수평 또는 수직 위치를 값으로 변환해 갱신합니다. |
| `Home` / `End` | 최솟값 / 최댓값을 요청합니다. |
| `PageUp` / `PageDown` | 현재 값에서 `step × 10`만큼 증가 / 감소합니다. |
| 방향에 맞는 arrow key | `to`가 가리키는 증가 방향으로 `step`만큼 조절합니다. |

각 thumb에는 목적을 설명하는 `aria-label` 또는 `aria-labelledby`를 전달하세요. 여러 thumb가 있으면 각 thumb의 의미를 구분할 수 있는 이름을 사용합니다.

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

`Slider`는 값 배열을 자동으로 정렬하거나 thumb가 서로 교차하지 못하게 제한하지 않습니다. Range 정책이 필요하면 `onChangeValues`에서 적용합니다.

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
