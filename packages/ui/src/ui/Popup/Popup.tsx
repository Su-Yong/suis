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
  PopupElement as BasePopupElement,
  PopupProps as BasePopupProps,
  usePopup as useBasePopup,
  createClickAway,
} from '@suis/primitives';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { clx, sx } from '@/theme/util';

import { PopupAnimation } from './animation';
import { usePlacement } from './usePlacement';
import { usePopupAnimation } from './usePopupAnimation';

import { Box, BoxProps } from '../Box';

import {
  animationStyle,
  defaultAnimation,
  placementX,
  placementY,
  popupXAlignStyle,
  popupYAlignStyle
} from './Popup.css';

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

  const { state, onOpenChange } = usePopupAnimation(animationElement);

  createEffect(on(() => baseProps.open === undefined, (isTrigger) => {
    if (isTrigger) return;

    onOpenChange(baseProps.open ?? false);
  }));

  const PopupContent = () => {
    const { anchor, element } = useBasePopup();
    const placementOffset = usePlacement();

    createEffect(on(() => [baseProps.open === undefined, anchor()] as const, ([isTrigger, anchor]) => {
      if (!isTrigger) return;
      if (!anchor) return;

      const listener = () => onOpenChange(true);
      anchor.addEventListener('click', listener);

      onCleanup(() => anchor.removeEventListener('click', listener));
    }));
    createEffect(on(() => [baseProps.open === undefined, element()] as const, ([isTrigger, element]) => {
      if (!isTrigger) return;
      if (!element) return;

      onCleanup(
        createClickAway((cleanUp) => {
          onOpenChange(false);
          cleanUp();
        })(element),
      );
    }));

    return (
      <BasePopupElement
        {...rest as BoxProps<T>}
        as={Box}
        class={clx({
          [popupXAlignStyle[placementOffset().x]]: true,
          [popupYAlignStyle[placementOffset().y]]: true,
        }, rest.classList, rest.class)}
        style={sx(
          assignInlineVars({
            [placementX]: `${placementOffset().x}`,
            [placementY]: `${placementOffset().y}`,
          }),
          rest.style,
        )}
      >
        <div
          ref={setAnimationElement}
          classList={{
            [animationStyle]: true,
            [animation().enter]: state.enter,
            [animation().exit]: state.exit,
          }}
        >
          {local.element}
        </div>
      </BasePopupElement>
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
