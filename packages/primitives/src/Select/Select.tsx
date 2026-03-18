import { createEffect, on, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';

import { SelectItem } from './SelectItem';
import { SelectValue } from './SelectValue';
import { SelectContent } from './SelectContent';
import { SelectTrigger } from './SelectTrigger';
import { SelectContext, SelectContextType } from './SelectContext';

import { Popup, PopupProps } from '../Popup';

type SelectOnlyProps = {
  value?: string | null;
  onChangeValue?: (value: string | null) => void;
};
export type SelectProps =
  Omit<PopupProps, keyof SelectOnlyProps>
  & SelectOnlyProps;
export const Select = (props: SelectProps) => {
  const [local, rest] = splitProps(props, ['value', 'onChangeValue']);

  const [context, setContext] = createStore<SelectContextType>({ value: null });

  createEffect(on(() => local.value, (value) => setContext('value', value ?? null)));
  createEffect(on(() => context.value, (value) => local.onChangeValue?.(value)));

  return (
    <SelectContext.Provider value={[context, setContext]}>
      <Popup {...rest} />
    </SelectContext.Provider>
  );
};

Select.Trigger = SelectTrigger;
Select.Value = SelectValue;
Select.Content = SelectContent;
Select.Item = SelectItem;
