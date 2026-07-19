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
    const cancelPendingOpen = () => {
      if (typeof timeoutId !== 'number') return;

      clearTimeout(timeoutId);
      timeoutId = null;
    };
    const handleOpen = () => {
      cancelPendingOpen();

      const owner = getOwner();
      timeoutId = window.setTimeout(() => runWithOwner(owner, () => requestOpen(true)), context.openDelay);
    };

    anchor.setAttribute('aria-describedby', context.id);
    anchor.addEventListener('pointerenter', handleOpen);
    anchor.addEventListener('pointerleave', cancelPendingOpen);
    const cleanUp = register(anchor, { delay: context.closeDelay });

    onCleanup(() => {
      anchor.removeAttribute('aria-describedby');
      anchor.removeEventListener('pointerenter', handleOpen);
      anchor.removeEventListener('pointerleave', cancelPendingOpen);
      cancelPendingOpen();
      cleanUp();
    });
  });

  return (
    <PopupAnchor>
      {props.children}
    </PopupAnchor>
  );
};
