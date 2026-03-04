import { ValidComponent } from 'solid-js';

import { PopupTrigger } from '../Popup';
import { Polymorphic, PolymorphicProps } from '../Polymorphic';

type SelectTriggerOnlyProps = {};
export type SelectTriggerProps<T extends ValidComponent> =
  Omit<PolymorphicProps<T>, keyof SelectTriggerOnlyProps>
  & SelectTriggerOnlyProps;
export const SelectTrigger = <T extends ValidComponent>(props: SelectTriggerProps<T>) => (
  <PopupTrigger>
    <Polymorphic
      {...props as PolymorphicProps<T>}
      as={props.as ?? 'button'}
    />
  </PopupTrigger>
);