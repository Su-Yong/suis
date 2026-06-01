import { ValidComponent } from 'solid-js';

import { PopupTrigger } from '../Popup';
import { Polymorphic, PolymorphicProps } from '../Polymorphic';
import { useSelect } from './SelectContext';

type SelectTriggerOnlyProps = {};
export type SelectTriggerProps<T extends ValidComponent> =
  Omit<PolymorphicProps<T>, keyof SelectTriggerOnlyProps>
  & SelectTriggerOnlyProps;
export const SelectTrigger = <T extends ValidComponent>(props: SelectTriggerProps<T>) => {
  const [context] = useSelect();

  return (
    <PopupTrigger>
      <Polymorphic
        {...props as PolymorphicProps<T>}
        as={props.as ?? 'button'}
        role={'combobox'}
        aria-required={context.required ? 'true' : undefined}
      />
    </PopupTrigger>
  );
};
