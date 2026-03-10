import { on, createEffect, onCleanup } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import { PopupAnchor } from './PopupAnchor';
import { usePopup } from './PopupContext';

export type PopupTriggerProps = {
  children?: JSX.Element;
};
export const PopupTrigger = (props: PopupTriggerProps) => {
  const [context, { requestOpen }] = usePopup();
  
  createEffect(on(() => context.anchor, (element) => {
    if (!element) return;
    
    const handleClick = () => requestOpen(!context.open);

    element.addEventListener('click', handleClick);
    onCleanup(() => element.removeEventListener('click', handleClick));
  }));

  return (
    <PopupAnchor>
      {props.children}
    </PopupAnchor>
  );
};
