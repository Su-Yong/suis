import { ValidComponent } from 'solid-js';

import { PolymorphicProps } from '../Polymorphic';

import { PopupElement } from '../Popup';

type SelectContentOnlyProps = {};
export type SelectContentProps<T extends ValidComponent> =
  Omit<PolymorphicProps<T>, keyof SelectContentOnlyProps>
  & SelectContentOnlyProps;
export const SelectContent = <T extends ValidComponent>(props: SelectContentProps<T>) => (
  <PopupElement
    {...props}
    as={props.as ?? 'ul'}
  />
);