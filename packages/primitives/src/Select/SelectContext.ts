import { createContext, mergeProps, useContext } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';

import { usePopup } from '../Popup';

export type SelectContextType = {
  required: boolean;
  value: string | null;
};
export const SelectContext = createContext<[SelectContextType, SetStoreFunction<SelectContextType>]>();

export const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('useSelectContext must be used within a SelectContext.Provider');
  }

  return context;
};

export const useSelect = () => {
  const [context, setSelectContext] = useSelectContext();
  const [popupContext, popupActions] = usePopup();

  return [
    mergeProps(context, popupContext),
    {
      setValue: (value: string | null) => setSelectContext('value', value),
      requestOpen: popupActions.requestOpen,
    },
  ] as const;
};
