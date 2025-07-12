import { children, createEffect, JSX } from 'solid-js';

import { usePopupContext } from './PopupContext';

export type PopupAnchorProps = {
  children: JSX.Element;
};
export const PopupAnchor = (props: PopupAnchorProps) => {
  const child = children(() => props.children);
  const context = usePopupContext();

  createEffect(() => {
    const target = child();
    if (!target) return;
    if (!(target instanceof Element)) {
      console.warn('PopupAnchor must be used with a valid DOM element as a child.');
    }

    context.setAnchor(target as Element);
  });

  return child();
};
