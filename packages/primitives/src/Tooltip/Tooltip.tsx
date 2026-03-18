import { createEffect, createUniqueId } from 'solid-js';
import { createStore } from 'solid-js/store';
import { JSX } from 'solid-js/jsx-runtime';

import { TooltipContext } from './TooltipContext';
import { TooltipTrigger } from './TooltipTrigger';
import { TooltipContent } from './TooltipContent';
import { Popup } from '../Popup';

export type TooltipProps = {
  openDelay?: number;
  closeDelay?: number;

  children?: JSX.Element;
};
export const Tooltip = (props: TooltipProps) => {
  const [context, setContext] = createStore({
    id: createUniqueId(),
    openDelay: 0,
    closeDelay: 0,
  });

  createEffect(() => setContext('openDelay', props.openDelay ?? 0));
  createEffect(() => setContext('closeDelay', props.closeDelay ?? 0));
  
  return (
    <TooltipContext.Provider value={[context, setContext]}>
      <Popup>
        {props.children}
      </Popup>
    </TooltipContext.Provider>
  );
};

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
