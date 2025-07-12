import { createResource, createSignal, JSX } from 'solid-js';
import {
  computePosition,
  Placement,
  Middleware,
  Strategy,
  flip, FlipOptions,
  offset, OffsetOptions,
  shift, ShiftOptions,
} from '@floating-ui/dom';

import { PopupAnchor } from './PopupAnchor';
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
  const [anchor, setAnchor] = createSignal<Element | null>(null);
  const [element, setElement] = createSignal<HTMLElement | null>(null);

  const middleware = () => {
    const result: Middleware[] = [];

    if (props.offset) result.push(offset(props.offset));
    if (props.shift) result.push(shift(props.shift));
    if (props.flip) result.push(flip(props.flip));

    return result;
  };

  const options = () => {
    if (!props.open) return null;

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

  const [result] = createResource(options, async ({ anchor, popup, options }) => {
    const position = await computePosition(
      anchor,
      popup,
      options,
    );

    return {
      position,
    };
  });

  return (
    <PopupContext.Provider
      value={{
        anchor,
        setAnchor,
        element,
        setElement,

        position: () => result()?.position ?? null,
        open: () => props.open ?? false,
      }}
    >
      {props.children}
    </PopupContext.Provider>
  );
};

Popup.Anchor = PopupAnchor;
Popup.Element = PopupElement;
