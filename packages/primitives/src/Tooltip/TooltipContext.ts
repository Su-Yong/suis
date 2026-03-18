import { createContext, mergeProps, useContext } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';
import { usePopup } from '../Popup';

export type TooltipContextType = {
  id: string;
  openDelay?: number;
  closeDelay?: number;
};
export const TooltipContext = createContext<[TooltipContextType, SetStoreFunction<TooltipContextType>]>();

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error('useTooltipContext must be used within a TooltipContext.Provider');
  }

  return context;
};

export const useTooltip = () => {
  const [context] = useTooltipContext();
  const [popupContext, popupActions] = usePopup();

  return [
    mergeProps(context, popupContext),
    popupActions,
  ] as const;
};
