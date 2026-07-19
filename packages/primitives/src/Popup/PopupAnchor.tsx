import { children, createEffect, JSX } from 'solid-js';

import { usePopupContext } from './PopupContext';

export type PopupAnchorProps = {
  children: JSX.Element;
};
export const PopupAnchor = (props: PopupAnchorProps) => {
  const child = children(() => props.children);
  const [, setContext] = usePopupContext();

  createEffect(() => {
    const targets = child.toArray().filter((target): target is Element => target instanceof Element);

    if (targets.length !== 1) {
      setContext('anchor', null);
      console.warn('PopupAnchor must be used with a valid DOM element as a child.');
      return;
    }

    setContext('anchor', targets[0]);
  });

  return child();
};
