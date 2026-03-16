import { Accessor } from 'solid-js';

type ClickAwayElement = Element | null | undefined | Accessor<Element | null | undefined>;
type ClickAwayCleanUp = () => void;
type ClickAwayRegister = (element: ClickAwayElement) => ClickAwayCleanUp;
export const createClickAway = (
  onClickAway: (cleanUp: ClickAwayCleanUp) => void,
): ClickAwayRegister => (element) => {
  const resolveElement = () => typeof element === 'function' ? element() : element;

  const target = resolveElement();
  if (!target) return () => { };

  const onClick = (event: MouseEvent) => {
    const target = resolveElement();
    if (!target) return;

    const path = event.composedPath();
    const isInside = path.includes(target);

    if (isInside) return;

    onClickAway(cleanUp);
  };

  let isCleanUp = false;
  const cleanUp = () => {
    if (isCleanUp) return;

    document.removeEventListener('click', onClick);
    isCleanUp = true;
  };

  document.addEventListener('click', onClick);
  return cleanUp;
};