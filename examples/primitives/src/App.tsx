import { createSignal } from 'solid-js';

import { Polymorphic, CheckBox, Popup, Select, sx } from '@suis/primitives';

export const App = () => {
  const [open, setOpen] = createSignal(false);

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
        <Popup.Element>
          {(style) => (
            <div style={sx(style(), { background: 'red' })}>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
            </div>
          )}
        </Popup.Element>
      </Popup>

      <Popup offset={8} open={open()}>
        <Popup.Anchor>
          <button onClick={() => setOpen(!open())}>controlled popup</button>
        </Popup.Anchor>
        <Popup.Element>
          {(style) => (
            <div style={sx(style(), { background: 'red' })}>
              <div>Controlled Item 1</div>
              <div>Controlled Item 2</div>
              <div>Controlled Item 3</div>
            </div>
          )}
        </Popup.Element>
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
    </div>
  );
};
