import { createContext, createUniqueId, useContext } from 'solid-js';

export type CheckBoxContextType = {
  id: string;
};

export const CheckBoxContext = createContext<CheckBoxContextType>();

export const useCheckBoxContext = () => {
  const context = useContext(CheckBoxContext);

  if (!context) {
    throw new Error('useCheckBoxContext must be used within a CheckBoxContext.Provider');
  }

  return context;
};

export const createCheckBoxContext = (params: Partial<CheckBoxContextType> = {}): CheckBoxContextType => {
  const id = createUniqueId();

  return {
    id: params.id ?? id,
  };
};
