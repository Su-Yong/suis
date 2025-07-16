import { onCleanup } from 'solid-js';

type ClickAwayRegister = (element: HTMLElement | null | undefined) => void;
export const createClickAway = (onClickAway: () => void): ClickAwayRegister => {
  return (element: HTMLElement | null | undefined) => {
    if (!element) return;

    const onClick = (event: MouseEvent) => {
      const path = event.composedPath();
      const isInside = path.includes(element);

      if (isInside) return;

      onClickAway();
      cleanUp();
    };

    let isCleanUp = false;
    const cleanUp = () => {
      if (isCleanUp) return;

      document.removeEventListener('click', onClick);
      isCleanUp = true;
    };

    document.addEventListener('click', onClick);
    onCleanup(cleanUp);
  };
};
