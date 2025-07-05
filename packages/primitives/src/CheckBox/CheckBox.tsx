import { splitProps, ValidComponent } from 'solid-js';

import { CheckBoxLabel } from './CheckBoxLabel';
import { CheckBoxIndicator } from './CheckBoxIndicator';
import { CheckBoxContext, createCheckBoxContext } from './CheckBoxContext';

import { Polymorphic, PolymorphicProps } from '../Polymorphic';

export type CheckBoxProps<T extends ValidComponent> = PolymorphicProps<T> & {
  rootId?: string;
};
export const CheckBox = <T extends ValidComponent>(props: CheckBoxProps<T>) => {
  const [local, rest] = splitProps(props, ['children', 'rootId', 'id']);

  const value = createCheckBoxContext({
    id: local.id,
  });

  return (
    <CheckBoxContext.Provider value={value}>
      <Polymorphic
        {...rest}
        id={local.rootId}
      >
        {local.children}
      </Polymorphic>
    </CheckBoxContext.Provider>
  )
};

CheckBox.Label = CheckBoxLabel;
CheckBox.Indicator = CheckBoxIndicator;
