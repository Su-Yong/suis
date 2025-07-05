import { Polymorphic, CheckBox } from '@suis/primitives';

export const App = () => {
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
    </div>
  )
};
