import { createSignal } from 'solid-js';

import { SelectItem } from './SelectItem';
import { SelectValue } from './SelectValue';
import { SelectContent } from './SelectContent';
import { SelectTrigger } from './SelectTrigger';
import { SelectContext } from './SelectContext';

import { Popup, PopupProps } from '../Popup';

type SelectOnlyProps = {};
export type SelectProps =
  Omit<PopupProps, keyof SelectOnlyProps>
  & SelectOnlyProps;
export const Select = (props: SelectProps) => {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <SelectContext.Provider value={{ value, setValue }}>
      <Popup {...props} />
    </SelectContext.Provider>
  );
};

Select.Trigger = SelectTrigger;
Select.Value = SelectValue;
Select.Content = SelectContent;
Select.Item = SelectItem;
