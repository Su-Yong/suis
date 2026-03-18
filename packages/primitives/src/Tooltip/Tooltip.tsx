import { createEffect, createUniqueId, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';

import { TooltipContext } from './TooltipContext';
import { TooltipTrigger } from './TooltipTrigger';
import { TooltipContent } from './TooltipContent';
import { Popup, PopupProps } from '../Popup';

export type TooltipOnlyProps = {
  openDelay?: number;
  closeDelay?: number;
};
export type TooltipProps = Omit<PopupProps, keyof TooltipOnlyProps> & TooltipOnlyProps;
export const Tooltip = (props: TooltipProps) => {
  const [local, rest] = splitProps(props, ['openDelay', 'closeDelay']);

  const [context, setContext] = createStore({
    id: createUniqueId(),
    openDelay: 0,
    closeDelay: 0,
  });

  createEffect(() => setContext('openDelay', local.openDelay ?? 0));
  createEffect(() => setContext('closeDelay', local.closeDelay ?? 0));

  return (
    <TooltipContext.Provider value={[context, setContext]}>
      <Popup {...rest}>
        {props.children}
      </Popup>
    </TooltipContext.Provider>
  );
};

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
