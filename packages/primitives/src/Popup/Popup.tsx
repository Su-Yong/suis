import { createEffect, createSignal, JSX, on, onCleanup } from 'solid-js';
import {
  computePosition,
  Placement,
  Middleware,
  Strategy,
  flip, FlipOptions,
  offset, OffsetOptions,
  shift, ShiftOptions,
  ComputePositionReturn,
} from '@floating-ui/dom';

import { PopupAnchor } from './PopupAnchor';
import { PopupTrigger } from './PopupTrigger';
import { PopupElement } from './PopupElement';
import { PopupContext } from './PopupContext';

export type PopupProps = {
  open?: boolean;

  placement?: Placement;
  strategy?: Strategy;

  offset?: OffsetOptions;
  shift?: ShiftOptions;
  flip?: FlipOptions;

  children: JSX.Element;
};
export const Popup = (props: PopupProps) => {
  const [open, setOpen] = createSignal(props.open ?? false);
  const [anchor, setAnchor] = createSignal<Element | null>(null);
  const [element, setElement] = createSignal<HTMLElement | null>(null);
  const [result, setResult] = createSignal<{ position: ComputePositionReturn | null }>({ position: null });

  const middleware = () => {
    const result: Middleware[] = [];

    if (props.offset) result.push(offset(props.offset));
    if (props.shift) result.push(shift(props.shift));
    if (props.flip) result.push(flip(props.flip));

    return result;
  };

  const options = () => {
    if (!open()) return null;

    const anchorElement = anchor();
    const popupElement = element();

    if (!anchorElement || !popupElement) return null;

    return {
      anchor: anchorElement,
      popup: popupElement,
      options: {
        placement: props.placement,
        strategy: props.strategy,
        middleware: middleware(),
      },
    };
  };

  const update = async (...parameters: Parameters<typeof computePosition>) => {
    const [anchor, popup, options] = parameters;
    const position = await computePosition(anchor, popup, options);

    setResult({ position });
  };

  createEffect(on(() => props.open ?? false, setOpen));

  let id: number | null = null;
  createEffect(on(options, (options) => {
    if (!options) return;

    const cleanUp = () => {
      if (id !== null) {
        cancelAnimationFrame(id);
        id = null;
      }
    };
    if (id !== null) cleanUp();

    id = requestAnimationFrame(() => {
      update(options.anchor, options.popup, options.options);
    });

    onCleanup(cleanUp);
  }));

  return (
    <PopupContext.Provider
      value={{
        anchor,
        setAnchor,
        element,
        setElement,

        position: () => result()?.position ?? null,
        open,
        setOpen,
      }}
    >
      {props.children}
    </PopupContext.Provider>
  );
};

Popup.Anchor = PopupAnchor;
Popup.Trigger = PopupTrigger;
Popup.Element = PopupElement;
