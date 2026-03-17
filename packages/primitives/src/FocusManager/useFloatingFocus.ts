import { Accessor } from 'solid-js';

type MoveFunction = (offset: (now: number, max: number) => number) => void;
type EnterFunction = () => void;
type EscapeFunction = () => void;
export type FloatingFocusMapper = (move: MoveFunction, enter: EnterFunction, escape: EscapeFunction) => Record<string, () => void>;

export const VerticalFloatingFocusMapper: FloatingFocusMapper = (move) => ({
  Tab: () => { }, // ignore Tab
  ArrowDown: () => move((i, max) => Math.min(i + 1, max - 1)),
  ArrowUp: () => move((i) => Math.max(i - 1, 0)),
  Home: () => move(() => 0),
  End: () => move((_, max) => max - 1),
});
export const HorizontalFloatingFocusMapper: FloatingFocusMapper = (move) => ({
  Tab: () => { }, // ignore Tab
  ArrowRight: () => move((i, max) => Math.min(i + 1, max - 1)),
  ArrowLeft: () => move((i) => Math.max(i - 1, 0)),
  Home: () => move(() => 0),
  End: () => move((_, max) => max - 1),
});
export const EnterableFloatingFocusMapper: FloatingFocusMapper = (_, enter, escape) => ({
  Tab: () => { }, // ignore Tab
  Enter: enter,
  Escape: escape,
  ' ': enter,
});

export const useFloatingFocus = (mapper: FloatingFocusMapper) => {
  const onSetup = (targets: Accessor<HTMLElement[]>) => {
    const lastActiveElement = document.activeElement;

    const onMove = (offset: (now: number, max: number) => number) => {
      const list = targets();
      if (list.length === 0) return;

      const currentIndex = list.findIndex((it) => it === document.activeElement);
      const targetIndex = (offset(currentIndex, list.length) + list.length) % list.length;
      list[targetIndex]?.focus();
    };
    const onEnter = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement?.click();
      }
    };
    const onEscape = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement?.blur();
        if (lastActiveElement instanceof HTMLElement) lastActiveElement.focus();
      }
    };

    const runnerMap = mapper(onMove, onEnter, onEscape);
    const listener = (event: KeyboardEvent) => {
      const runner = runnerMap[event.key];
      if (!runner) return;

      event.preventDefault();
      runner();
    };

    onMove(() => 0);
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  };

  return onSetup;
};
