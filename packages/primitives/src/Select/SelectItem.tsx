import { onCleanup, splitProps, ValidComponent } from 'solid-js';

import { forwardRef, Polymorphic, PolymorphicProps } from '../Polymorphic';
import { useSelect } from './SelectContext';

type SelectItemOnlyProps = {
  value: string;
};
export type SelectItemProps<T extends ValidComponent> =
  Omit<PolymorphicProps<T>, keyof SelectItemOnlyProps>
  & SelectItemOnlyProps;
export const SelectItem = <T extends ValidComponent>(props: SelectItemProps<T>) => {
  const [local, rest] = splitProps(props, ['value']);
  const { setValue } = useSelect();
  
  const onSetup = (element: Element) => {
    const listener = () => {
      setValue(local.value);
      console.log('selected', local.value);
    };

    element.addEventListener('click', listener);
    onCleanup(() => element.removeEventListener('click', listener));
  };

  return (
    <Polymorphic
      role={'option'}
      data-value={local.value}
      {...rest as PolymorphicProps<T>}
      as={rest.as ?? 'li'}
      ref={forwardRef(onSetup, rest.ref)}
    >
      {rest.children}
    </Polymorphic>
  )
};
