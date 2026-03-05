import { onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';

export const usePopupAnimation = (
  animationElement: () => HTMLElement | null,
) => {
  const [state, setState] = createStore({
    open: false,
    exit: false,
    enter: false,
  });

  let cleanUp: (() => void) | null = null;
  const runOpenAnimation = () => {
    cleanUp?.();

    setState({
      open: false,
      exit: false,
      enter: true,
    });
    requestAnimationFrame(() => {
      setState({
        open: true,
        exit: false,
        enter: true,
      });
    });
  };
  const runCloseAnimation = () => {
    setState({
      enter: false,
      exit: true,
    });

    const target = animationElement();
    if (!target) return;

    cleanUp?.();

    let ignore = false;
    cleanUp = () => {
      ignore = true;

      target.removeEventListener('transitionend', listener);
      target.removeEventListener('transitioncancel', listener);
      setState({
        open: false,
        exit: false,
      });

      cleanUp = null;
    };

    const listener = () => {
      cleanUp?.();

      setState({
        open: false,
        exit: false,
      });
    };

    requestAnimationFrame(() => {
      if (ignore) return;

      target.addEventListener('animationend', listener, { once: true });
      target.addEventListener('animationcancel', listener, { once: true });
    });
  };

  const runAnimation = async (isOpen: boolean) => {
    if (isOpen) runOpenAnimation();
    else runCloseAnimation();
  };

  onCleanup(() => cleanUp?.());

  return {
    state,
    runAnimation,
  };
};
