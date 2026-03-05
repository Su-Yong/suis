import {
  createEffect,
  createSignal,
  JSX,
  on,
  onCleanup,
  splitProps,
  ValidComponent
} from 'solid-js';
import {
  Popup as BasePopup,
  PopupAnchor as BasePopupAnchor,
  PopupProps as BasePopupProps,
  usePopup as useBasePopup,
  createClickAway,
  PopupElement,
  sx,
} from '@suis/primitives';

import { PopupAnimation } from './animation';
import { usePopupAnimation } from './usePopupAnimation';
import { PopupPresence, PopupPresenceProps } from './PopupPresence';

import { BoxProps } from '../Box';

import { defaultAnimation } from './Popup.css';

const BasePopupOnlyProps = [
  'open',
  'placement',
  'strategy',
  'offset',
  'shift',
  'flip',
] as const;

type PopupOnlyProps = {
  element: JSX.Element;
  children: JSX.Element;

  animation?: PopupAnimation;
};
export type PopupProps<T extends ValidComponent> =
  Omit<BoxProps<T>, keyof PopupOnlyProps | keyof BasePopupProps>
  & Omit<BasePopupProps, keyof PopupOnlyProps>
  & PopupOnlyProps;
export const Popup = <T extends ValidComponent>(props: PopupProps<T>) => {
  const [local, baseProps, rest] = splitProps(props, ['children', 'element', 'animation'], BasePopupOnlyProps);

  const [animationElement, setAnimationElement] = createSignal<HTMLElement | null>(null);
  const animation = () => (local.animation ?? defaultAnimation);

  const { state, runAnimation } = usePopupAnimation(animationElement);

  createEffect(on(() => baseProps.open === undefined, (isTrigger) => {
    if (isTrigger) return;

    runAnimation(baseProps.open ?? false);
  }));

  const PopupContent = () => {
    const { anchor, element } = useBasePopup();

    createEffect(on(() => [baseProps.open === undefined, anchor()] as const, ([isTrigger, anchor]) => {
      if (!isTrigger) return;
      if (!anchor) return;

      const listener = () => runAnimation(true);
      anchor.addEventListener('click', listener);

      onCleanup(() => anchor.removeEventListener('click', listener));
    }));
    createEffect(on(() => [baseProps.open === undefined, element()] as const, ([isTrigger, element]) => {
      if (!isTrigger) return;
      if (!element) return;

      onCleanup(
        createClickAway((cleanUp) => {
          runAnimation(false);
          cleanUp();
        })(element),
      );
    }));

    return (
      <PopupElement>
        {(style) => (
          <PopupPresence
            {...rest as unknown as PopupPresenceProps<T, T>}
            style={sx(style, rest.style)}
            enter={state.enter}
            exit={state.exit}
            animation={animation()}
            animationWrapperProps={{ ref: setAnimationElement }}
          >
            {local.element}
          </PopupPresence>
        )}
      </PopupElement>
    );
  };

  return (
    <BasePopup {...baseProps} open={state.open}>
      <BasePopupAnchor>
        {local.children}
      </BasePopupAnchor>
      <PopupContent />
    </BasePopup>
  );
};
