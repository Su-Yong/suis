import { createStore } from 'solid-js/store';

export const usePopupAnimation = (
  animationElement: () => HTMLElement | null,
) => {
  const [state, setState] = createStore({
    exit: false,
    enter: false,
  });

  const runOpenAnimation = () => new Promise<void>((resolve) => {
    setState({
      enter: true,
      exit: false,
    });

    requestAnimationFrame(() => {
      const target = animationElement();
      if (!target) {
        setState('enter', false);
        resolve();
        return;
      }

      requestAnimationFrame(() => {
        const onEnd = () => {
          resolve();
          setState('enter', false);

          target.removeEventListener('animationend', onEnd);
          target.removeEventListener('animationcancel', onEnd);
        };

        target.addEventListener('animationend', onEnd);
        target.addEventListener('animationcancel', onEnd);
      });
    });
  });
  const runCloseAnimation = () => new Promise<void>((resolve) => {
    const target = animationElement();
    if (!target) {
      resolve();
      return;
    }

    setState({
      enter: false,
      exit: true,
    });

    requestAnimationFrame(() => {
      const onEnd = () => {
        resolve();
        setState('exit', false);

        target.removeEventListener('animationend', onEnd);
        target.removeEventListener('animationcancel', onEnd);
      };

      target.addEventListener('animationend', onEnd, { once: true });
      target.addEventListener('animationcancel', onEnd, { once: true });
    });
  });

  const runAnimation = async (isOpen: boolean) => {
    if (isOpen) runOpenAnimation();
    else await runCloseAnimation();
  };

  return {
    state,
    runAnimation,
  };
};
