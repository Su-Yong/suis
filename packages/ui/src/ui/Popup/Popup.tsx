import {
  createSignal,
  JSX,
  splitProps,
  ValidComponent
} from 'solid-js';
import {
  Popup as BasePopup,
  PopupAnchor as BasePopupAnchor,
  PopupTrigger as BasePopupTrigger,
  PopupProps as BasePopupProps,
  PopupElement,
  createPopupController,
  sx,
} from '@suis/primitives';

import { PopupAnimation } from './animation.css';
import { usePopupAnimation } from './usePopupAnimation';
import { PopupPresence, PopupPresenceProps } from './PopupPresence';

import { BoxProps } from '../Box';

import { defaultAnimation } from './Popup.css';
import { Dynamic } from 'solid-js/web';

const BasePopupOnlyProps = [
  'open',
  'placement',
  'strategy',
  'offset',
  'shift',
  'flip',
  'autoUpdate',
  'middleware',
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

  const PopupContent = () => {
    createPopupController(async (open) => {
      await runAnimation(open);

      return open;
    });

    return (
      <PopupElement>
        {(style) => (
          <PopupPresence
            {...rest as unknown as PopupPresenceProps<T, T>}
            style={sx(style(), rest.style)}
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

  const AnchorOrTrigger = () => typeof baseProps.open === 'boolean' ? BasePopupAnchor : BasePopupTrigger;

  return (
    <BasePopup {...baseProps}>
      <Dynamic component={AnchorOrTrigger()}>
        {local.children}
      </Dynamic>
      <PopupContent />
    </BasePopup>
  );
};
