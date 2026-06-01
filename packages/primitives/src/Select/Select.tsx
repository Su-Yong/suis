import { createEffect, on, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';

import { SelectItem } from './SelectItem';
import { SelectValue } from './SelectValue';
import { SelectContent } from './SelectContent';
import { SelectTrigger } from './SelectTrigger';
import { SelectContext, SelectContextType } from './SelectContext';

import { Popup, PopupProps } from '../Popup';

type SelectValue<Required extends boolean> = Required extends true ? string : string | null;
type SelectOnlyProps<Required extends boolean = false> = {
  value?: SelectValue<Required>;
  onChangeValue?: (value: SelectValue<Required>) => void;
  required?: Required;
};
export type SelectProps<Required extends boolean = false> =
  Omit<PopupProps, keyof SelectOnlyProps<Required>>
  & SelectOnlyProps<Required>;
export const Select = <Required extends boolean = false>(props: SelectProps<Required>) => {
  const [local, rest] = splitProps(props, ['value', 'onChangeValue', 'required']);

  const [context, setContext] = createStore<SelectContextType>({ value: null, required: false });

  createEffect(on(() => local.value, (value) => setContext('value', value ?? null)));
  createEffect(on(() => local.required, (required) => setContext('required', required ?? false)));
  createEffect(on(() => context.value, (value) => {
    if (local.required && value === null) return;
    local.onChangeValue?.(value as SelectValue<Required>);
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
