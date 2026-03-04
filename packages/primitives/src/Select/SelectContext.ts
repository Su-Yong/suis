import { Accessor, createContext, useContext } from 'solid-js';
import { usePopupContext } from '../Popup/PopupContext';

export type SelectContextType = {
  value: Accessor<string | null>;
  setValue: (value: string | null) => void;
};
export const SelectContext = createContext<SelectContextType>();

export const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('useSelectContext must be used within a SelectContext.Provider');
  }

  return context;
};

export const useSelect = () => {
  const context = useSelectContext();
  const popupContext = usePopupContext();

  return {
    value: context.value,
    setValue: context.setValue,
    open: popupContext.open,
    setOpen: popupContext.setOpen,
  };
};
