import { Accessor, createContext, useContext } from 'solid-js';
import { ComputePositionReturn } from '@floating-ui/dom';

export type PopupContextType = {
  anchor: Accessor<Element | null>;
  setAnchor: (element: Element | null) => void;
  element: Accessor<HTMLElement | null>;
  setElement: (element: HTMLElement | null) => void;

  position: Accessor<ComputePositionReturn | null>;
  open: Accessor<boolean>;
};
export const PopupContext = createContext<PopupContextType>();

export const usePopupContext = () => {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error('usePopupContext must be used within a PopupContext.Provider');
  }

  return context;
};

export const usePopup = () => {
  const context = usePopupContext();

  return {
    anchor: context.anchor,
    element: context.element,
    position: context.position,
  };
};
