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
  const [context, { setValue }] = useSelect();

  const onSetup = (element: Element) => {
    const listener = () => {
      if (!context.required && local.value === context.value) setValue(null);
      else setValue(local.value);
    };

    element.addEventListener('click', listener);
    onCleanup(() => element.removeEventListener('click', listener));
  };

  return (
    <Polymorphic
      role={'option'}
      data-value={local.value}
      aria-selected={local.value === context.value}
      tabindex={-1}
      {...rest as PolymorphicProps<T>}
      as={rest.as ?? 'li'}
      ref={forwardRef(onSetup, rest.ref)}
    >
      {rest.children}
    </Polymorphic>
  )
};
