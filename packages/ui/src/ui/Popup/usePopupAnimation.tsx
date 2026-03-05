import { onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';

export const usePopupAnimation = (
  animationElement: () => HTMLElement | null,
) => {
  const [state, setState] = createStore({
    state: 'closed',
    open: false,
    exit: false,
    enter: false,
  });

  let cleanUp: (() => void) | null = null;
  const runOpenAnimation = () => {
    cleanUp?.();

    setState({
      state: 'opening',
      open: false,
      exit: false,
      enter: true,
    });
    requestAnimationFrame(() => {
      setState({
        state: 'opened',
        open: true,
        exit: false,
        enter: true,
      });
    });
  };
  const runCloseAnimation = () => new Promise<void>((resolve) => {
    setState({
      state: 'closing',
      enter: false,
      exit: true,
    });

    const target = animationElement();
    if (!target) return;

    cleanUp?.();

    let ignore = false;
    cleanUp = () => {
      ignore = true;

      target.removeEventListener('animationend', listener);
      target.removeEventListener('animationcancel', listener);
      setState({
        state: 'closed',
        open: false,
        exit: false,
      });

      cleanUp = null;
      resolve();
    };

    const listener = () => {
      cleanUp?.();

      setState({
        state: 'closed',
        open: false,
        exit: false,
      });
    };

    requestAnimationFrame(() => {
      if (ignore) return;

      target.addEventListener('animationend', listener, { once: true });
      target.addEventListener('animationcancel', listener, { once: true });
    });
  });

  const runAnimation = async (isOpen: boolean) => {
    if (isOpen) runOpenAnimation();
    else await runCloseAnimation();
  };

  onCleanup(() => cleanUp?.());

  return {
    state,
    runAnimation,
  };
};
