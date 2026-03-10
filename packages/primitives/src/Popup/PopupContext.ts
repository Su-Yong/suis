import { createContext, useContext } from 'solid-js';
import { produce, SetStoreFunction } from 'solid-js/store';
import { ComputePositionReturn } from '@floating-ui/dom';

export type PopupController = (open: boolean) => Promise<boolean>;
export type PopupContextType = {
  anchor: Element | null;
  element: HTMLElement | null;
  position: ComputePositionReturn | null;
  open: boolean;
  mount: boolean;

  _internal: {
    requestId: number;
    controller: PopupController | null;
  };
};
export const PopupContext = createContext<[PopupContextType, SetStoreFunction<PopupContextType>]>();

export const usePopupContext = () => {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error('usePopupContext must be used within a PopupContext.Provider');
  }

  return context;
};

export const usePopup = () => {
  const [context, setContext] = usePopupContext();

  const requestOpen = (open: boolean) => {
    setContext(produce((it) => {
      it.open = open;
      it._internal.requestId += 1;
    }));

    const currentRequestId = context._internal.requestId;
    const controller = context._internal.controller ?? (() => Promise.resolve(open));

    controller(open).then((mount) => {
      if (currentRequestId !== context._internal.requestId) return;
      setContext('mount', mount);
    });
  };

  return [
    context,
    {
      requestOpen,
    },
  ] as const;
};

export const createPopupController = (controller: PopupController) => {
  const [, setContext] = usePopupContext();
  setContext('_internal', (prev) => ({
    ...prev,
    controller,
  }));
};
