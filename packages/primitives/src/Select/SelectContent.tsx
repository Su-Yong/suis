import { ValidComponent } from 'solid-js';

import { Polymorphic, PolymorphicProps } from '../Polymorphic';

import { PopupElement } from '../Popup';
import { sx } from '../helper';

type SelectContentOnlyProps = {};
export type SelectContentProps<T extends ValidComponent> =
  Omit<PolymorphicProps<T>, keyof SelectContentOnlyProps>
  & SelectContentOnlyProps;
export const SelectContent = <T extends ValidComponent>(props: SelectContentProps<T>) => (
  <PopupElement>
    {(style) => (
      <Polymorphic
        {...props as PolymorphicProps<T>}
        as={props.as ?? 'ul'}
        style={sx(style, props.style)}
      />
    )}
  </PopupElement>
);