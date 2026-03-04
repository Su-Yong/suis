import { on, createEffect, onCleanup } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import { PopupAnchor } from './PopupAnchor';
import { usePopupContext } from './PopupContext';

export type PopupTriggerProps = {
  children: JSX.Element;
};
export const PopupTrigger = (props: PopupTriggerProps) => {
  const context = usePopupContext();
  
  createEffect(on(() => context.anchor(), (element) => {
    if (!element) return;
    
    const handleClick = () => {
      context.setOpen(!context.open());
    };

    element.addEventListener('click', handleClick);
    onCleanup(() => element.removeEventListener('click', handleClick));
  }));

  return (
    <PopupAnchor>
      {props.children}
    </PopupAnchor>
  );
};
