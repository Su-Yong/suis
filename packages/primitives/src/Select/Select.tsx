import { createEffect, on, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';

import { SelectItem } from './SelectItem';
import { SelectValue } from './SelectValue';
import { SelectContent } from './SelectContent';
import { SelectTrigger } from './SelectTrigger';
import { SelectContext, SelectContextType } from './SelectContext';

import { Popup, PopupProps } from '../Popup';

type SelectValue<R extends boolean> = R extends true ? string : (string | null);
type SelectOnlyProps<R extends boolean> = {
  value?: SelectValue<R>;
  required?: R;
  onChangeValue?: (value: SelectValue<R>) => void;
};
export type SelectProps<R extends boolean> =
  Omit<PopupProps, keyof SelectOnlyProps<R>>
  & SelectOnlyProps<R>;
export const Select = <R extends boolean>(props: SelectProps<R>) => {
  const [local, rest] = splitProps(props, ['required', 'value', 'onChangeValue']);

  const [context, setContext] = createStore<SelectContextType>({ value: null, required: local.required ?? false });

  createEffect(on(() => local.value, (value) => setContext('value', value ?? null)));
  createEffect(on(() => context.value, (value) => {
    if (value === null && local.required) {
      return;
    }
    local.onChangeValue?.(value!);
  }));

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
