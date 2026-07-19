import { createSignal } from 'solid-js';

import {
  CheckBox,
  Polymorphic,
  Popup,
  Select,
  SliderRail,
  SliderThumb,
  Slider,
  SliderLabel,
  sx,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@suis-ui/primitives';

export const App = () => {
  const [open, setOpen] = createSignal(false);
  const [values, setValues] = createSignal([10]);

  return (
    <div>
      <Polymorphic as={'div'}>
        This is a polymorphic component. (div)
      </Polymorphic>
      <Polymorphic as={'span'}>
        Me Too! (span)
      </Polymorphic>

      <CheckBox>
        <CheckBox.Indicator />
        <CheckBox.Label>Check me!</CheckBox.Label>
      </CheckBox>

      <Popup offset={8}>
        <Popup.Trigger>
          <button>popup</button>
        </Popup.Trigger>
        <Popup.Content>
          {(style) => (
            <div style={sx(style(), { background: 'red' })}>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
            </div>
          )}
        </Popup.Content>
      </Popup>

      <Popup offset={8} open={open()}>
        <Popup.Anchor>
          <button onClick={() => setOpen(!open())}>controlled popup</button>
        </Popup.Anchor>
        <Popup.Content>
          {(style) => (
            <div style={sx(style(), { background: 'red' })}>
              <div>Controlled Item 1</div>
              <div>Controlled Item 2</div>
              <div>Controlled Item 3</div>
            </div>
          )}
        </Popup.Content>
      </Popup>

      <Select>
        <Select.Trigger>
          <Select.Value>
            {(value) => value ? `Select: ${value}` : 'Select an option'}
          </Select.Value>
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="1">Option 1</Select.Item>
          <Select.Item value="2">Option 2</Select.Item>
          <Select.Item value="3">Option 3</Select.Item>
        </Select.Content>
      </Select>

      <Tooltip closeDelay={5000}>
        <TooltipTrigger>
          <button>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>
          This is a tooltip content.
        </TooltipContent>
      </Tooltip>

      <Slider
        aria-label="Volume"
        values={values()}
        onChangeValues={setValues}
        style={{
          position: 'relative',
          width: '240px',
          height: '20px',
        }}
        renderValue={(value) => (
          <SliderThumb
            aria-label="Volume"
            style={{
              position: 'absolute',
              top: '0',
              left: `calc(${value()}% - 12px)`,
              background: 'blue',
              height: '100%',
              'aspect-ratio': '1 / 1',
            }}
          />
        )}
      >
        <SliderLabel step={20}>
          {({ value, index, percent }) => (
            <div
              data-index={index}
              style={{ position: 'absolute', left: `${percent}%`, top: '24px' }}
            >
              {value}
            </div>
          )}
        </SliderLabel>
        <SliderLabel labelAt={[0, 25, 75, 100]}>
          {({ value, percent }) => (
            <div style={{ position: 'absolute', left: `${percent}%`, top: '44px' }}>
              {value}
            </div>
          )}
        </SliderLabel>
        <SliderRail
          getRanges={(values, domain) => [[domain.min, values[0]]]}
          style={{
            width: '100%',
            height: '100%',
            background: 'gray',
          }}
        >
          {(range) => (
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: `${range().startPercent}%`,
                width: `${range().sizePercent}%`,
                height: '100%',
                background: 'green',
              }}
            />
          )}
        </SliderRail>
      </Slider>
    </div>
  );
};
