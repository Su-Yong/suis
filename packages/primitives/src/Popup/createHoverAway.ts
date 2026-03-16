import { Accessor } from 'solid-js';

type HoverAwayElement = Element | null | undefined | Accessor<Element | null | undefined>;
type HoverAwayCleanUp = () => void;
type HoverAwayRegister = (element: HoverAwayElement) => HoverAwayCleanUp;
type HoverAwayOptions = {
  delay?: number;
};
export const createHoverAway = (
  onHoverAway: (cleanUp: HoverAwayCleanUp) => void,
  { delay = 0 }: HoverAwayOptions = {},
): HoverAwayRegister => (element) => {
  const resolveElement = () => typeof element === 'function' ? element() : element;

  const target = resolveElement();
  if (!target) return () => { };

  let timeoutId: number | null = null;
  const onPointerLeave = () => {
    timeoutId = window.setTimeout(() => {
      onHoverAway(cleanUp);
    }, delay);
  };

  const onPointerEnter = () => {
    if (typeof timeoutId !== 'number') return;

    clearTimeout(timeoutId);
    timeoutId = null;
  };

  let isCleanUp = false;
  const cleanUp = () => {
    if (isCleanUp) return;

    target.removeEventListener('pointerleave', onPointerLeave);
    target.removeEventListener('pointerenter', onPointerEnter);
    isCleanUp = true;
  };

  target.addEventListener('pointerleave', onPointerLeave);
  target.addEventListener('pointerenter', onPointerEnter);

  return cleanUp;
};
