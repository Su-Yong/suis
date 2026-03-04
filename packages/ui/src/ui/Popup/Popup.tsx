import {
  batch,
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

import { Box, BoxProps } from '../Box';

import { PopupAnimation } from './animation';

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
  const [open, setOpen] = createSignal(baseProps.open);
  const [enter, setEnter] = createSignal(false);
  const [exit, setExit] = createSignal(false);

  const animation = () => (local.animation ?? defaultAnimation);

  // animation logic
  let cleanUp: (() => void) | null = null;
  const onOpenChange = async (isOpen: boolean) => {
    if (isOpen) {
      cleanUp?.();

      batch(() => {
        setOpen(false);
        setExit(false);
        setEnter(true);
      });
      requestAnimationFrame(() => {
        batch(() => {
          setOpen(true);
          setExit(false);
          setEnter(true);
        });
      });
    } else {
      batch(() => {
        setEnter(false);
        setExit(true);
      });

      const target = animationElement();
      if (target) {
        cleanUp?.();

        let ignore = false;
        cleanUp = () => {
          ignore = true;

          target.removeEventListener('transitionend', listener);
          target.removeEventListener('transitioncancel', listener);
          batch(() => {
            setOpen(false);
            setExit(false);
          });

          cleanUp = null;
        };

        const listener = () => {
          cleanUp?.();

          batch(() => {
            setOpen(false);
            setExit(false);
          });
        };

        requestAnimationFrame(() => {
          if (ignore) return;

          target.addEventListener('animationend', listener, { once: true });
          target.addEventListener('animationcancel', listener, { once: true });
        });
      }
    }
  };

  createEffect(on(() => baseProps.open === undefined, (isTrigger) => {
    if (isTrigger) return;

    onOpenChange(baseProps.open ?? false);
  }));

  onCleanup(() => {
    cleanUp?.();
  });

  const PopupContent = () => {
    const { position, anchor, element } = useBasePopup();

    const placementOffset = (): [0 | 0.5 | 1, 0 | 0.5 | 1] => {
      const placement = position()?.placement;
      if (!placement) return [0.5, 0.5];

      let x: 0 | 0.5 | 1 = 0.5;
      let y: 0 | 0.5 | 1 = 0.5;

      if (placement.startsWith('top')) y = 1;
      if (placement.startsWith('bottom')) y = 0;
      if (placement.startsWith('left')) x = 1;
      if (placement.startsWith('right')) x = 0;

      if (placement.endsWith('-start')) {
        if (placement.startsWith('top') || placement.startsWith('bottom')) x = 0;
        else y = 0;
      }
      if (placement.endsWith('-end')) {
        if (placement.startsWith('top') || placement.startsWith('bottom')) x = 1;
        else y = 1;
      }

      return [x, y];
    };

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
        classList={{
          [popupXAlignStyle[placementOffset()[0]]]: true,
          [popupYAlignStyle[placementOffset()[1]]]: true,
        }}
        style={assignInlineVars({
          [placementX]: `${placementOffset()[0]}`,
          [placementY]: `${placementOffset()[1]}`,
        })}
      >
        <div
          ref={setAnimationElement}
          classList={{
            [animationStyle]: true,
            [animation().enter]: enter(),
            [animation().exit]: exit(),
          }}
        >
          {local.element}
        </div>
      </BasePopupElement>
    );
  };

  return (
    <BasePopup {...baseProps} open={open()}>
      <BasePopupAnchor>
        {local.children}
      </BasePopupAnchor>
      <PopupContent />
    </BasePopup>
  );
};
