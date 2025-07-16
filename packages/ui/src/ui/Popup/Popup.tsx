import {
  batch,
  children,
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
  PopupProps as BasePopupProps,
  usePopup as useBasePopup,
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
  const [local, baseProps, rest] = splitProps(props, ['open', 'children', 'element', 'animation'], BasePopupOnlyProps);
  const child = children(() => local.children);

  const [animationElement, setAnimationElement] = createSignal<HTMLElement | null>(null);
  const [open, setOpen] = createSignal(local.open ?? false);
  const [enter, setEnter] = createSignal(false);
  const [exit, setExit] = createSignal(false);

  const animation = () => (local.animation ?? defaultAnimation);

  // animation logic
  let cleanUp: (() => void) | null = null;
  createEffect(on(() => local.open, async () => {
    if (local.open) {
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
  }));

  onCleanup(() => {
    cleanUp?.();
  });

  const PopupContent = () => {
    const { position } = useBasePopup();

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

    return (
      <BasePopup.Element
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
        <Box
          ref={setAnimationElement}
          classList={{
            [animationStyle]: true,
            [animation().enter]: enter(),
            [animation().exit]: exit(),
          }}
        >
          {local.element}
        </Box>
      </BasePopup.Element>
    );
  };

  return (
    <BasePopup
      {...baseProps}
      open={open()}
    >
      <BasePopup.Anchor>
        {child()}
      </BasePopup.Anchor>
      <PopupContent/>
    </BasePopup>
  );
};
