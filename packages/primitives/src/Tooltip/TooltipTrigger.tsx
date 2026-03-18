import { createEffect, getOwner, onCleanup, runWithOwner } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import { useTooltip } from './TooltipContext';
import { createHoverAway, PopupAnchor } from '../Popup';

export type TooltipTriggerProps = {
  children?: JSX.Element;
};
export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const [context, { requestOpen }] = useTooltip();

  const register = createHoverAway(() => requestOpen(false));

  createEffect(() => {
    const anchor = context.anchor;
    if (!anchor) return;

    let timeoutId: number | null = null;
    const handleOpen = () => {
      if (typeof timeoutId === 'number') clearTimeout(timeoutId);

      const owner = getOwner();
      timeoutId = window.setTimeout(() => runWithOwner(owner, () => requestOpen(true)), context.openDelay);
    };

    anchor.setAttribute('aria-describedby', context.id);
    anchor.addEventListener('pointerenter', handleOpen);
    const cleanUp = register(anchor, { delay: context.closeDelay });

    onCleanup(() => {
      anchor.removeAttribute('aria-describedby');
      anchor.removeEventListener('pointerenter', handleOpen);
      cleanUp();
    });
  });

  return (
    <PopupAnchor>
      {props.children}
    </PopupAnchor>
  );
};
