import { Polymorphic, CheckBox, Popup } from '@suis/primitives';
import { createSignal } from 'solid-js';

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
        <CheckBox.Indicator/>
        <CheckBox.Label>Check me!</CheckBox.Label>
      </CheckBox>

      <Popup offset={8}>
        <Popup.Trigger>
          <button>popup</button>
        </Popup.Trigger>
        <Popup.Element style={{ background: 'red' }}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Popup.Element>
      </Popup>

      <Popup offset={8}>
        <Popup.Anchor>
          <button onClick={() => setOpen(!open())}>controlled popup</button>
        </Popup.Anchor>
        <Popup.Element style={{ background: 'red' }}>
          <div>Controlled Item 1</div>
          <div>Controlled Item 2</div>
          <div>Controlled Item 3</div>
        </Popup.Element>
      </Popup>
    </div>
  );
};
