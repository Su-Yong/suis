import { children, createEffect, onCleanup } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import { useFocusTrap } from './useFocusTrap';
import { FloatingFocusMapper, useFloatingFocus } from './useFloatingFocus';

export type FocusManagerProps = {
  enable?: boolean;
  trap?: boolean;
  floating?: HTMLElement[];
  floatingMapper?: FloatingFocusMapper;

  children?: JSX.Element;
};
export const FocusManager = (props: FocusManagerProps) => {
  const child = children(() => props.children);

  const onSetupTrap = useFocusTrap();

  createEffect(() => {
    if (!props.enable) return;

    const target = child();
    if (!target) return;
    if (!(target instanceof Element)) {
      console.warn('FocusManager must be used with a valid DOM element as a child.');
      return;
    }

    if (props.trap) onCleanup(onSetupTrap(target));
    if (props.floating && props.floatingMapper) {
      const onSetupFloating = useFloatingFocus(props.floatingMapper);
      onCleanup(onSetupFloating(() => props.floating ?? []));
    };
  });

  return child();
};
