import { Accessor, createContext, useContext } from 'solid-js';
import { ComputePositionReturn } from '@floating-ui/dom';

export type PopupContextType = {
  anchor: Accessor<Element | null>;
  setAnchor: (element: Element | null) => void;
  element: Accessor<Element | null>;
  setElement: (element: Element | null) => void;

  position: Accessor<ComputePositionReturn | null>;
  open: Accessor<boolean>;
  setOpen: (open: boolean) => void;
  onTrigger: () => void;
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
    open: context.open,
    setOpen: context.setOpen,
    anchor: context.anchor,
    element: context.element,
    position: context.position,
  };
};

export const usePopupTrigger = (onTriggered: () => boolean | void) => {
  const context = usePopupContext();

  const defaultBehavior = context.onTrigger;
  context.onTrigger = () => {
    const preceedDefaultBehavior = onTriggered();
    if (preceedDefaultBehavior === false) return;

    defaultBehavior();
  };
};
