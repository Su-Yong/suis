type HoverAwayCleanUp = () => void;
type HoverAwayRegister = (element: Element | null | undefined) => HoverAwayCleanUp;
type HoverAwayOptions = {
  delay?: number;
};
export const createHoverAway = (
  onHoverAway: (cleanUp: HoverAwayCleanUp) => void,
  { delay = 0 }: HoverAwayOptions = {},
): HoverAwayRegister => (element) => {
  if (!element) return () => { };

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

    element.removeEventListener('pointerleave', onPointerLeave);
    element.removeEventListener('pointerenter', onPointerEnter);
    isCleanUp = true;
  };

  element.addEventListener('pointerleave', onPointerLeave);
  element.addEventListener('pointerenter', onPointerEnter);

  return cleanUp;
};
