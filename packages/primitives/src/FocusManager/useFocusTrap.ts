import { tabbable } from 'tabbable';

export const useFocusTrap = () => {
  const onSetup = (parent: Element) => {
    const listener = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      event.preventDefault();

      const focusableElements = tabbable(parent);
      if (focusableElements.length === 0) return;

      const currentIndex = focusableElements.findIndex((it) => it === document.activeElement);
      const targetIndex = ((event.shiftKey ? currentIndex - 1 : currentIndex + 1) + focusableElements.length) % focusableElements.length;
      focusableElements[targetIndex]?.focus();
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  };

  return onSetup;
};
