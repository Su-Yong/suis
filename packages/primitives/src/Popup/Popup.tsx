import { createEffect, JSX, on, onCleanup } from 'solid-js';
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
import { PopupTrigger } from './PopupTrigger';
import { PopupElement } from './PopupElement';
import { PopupContext, PopupContextType, usePopup } from './PopupContext';
import { createStore } from 'solid-js/store';

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
  const [context, setContext] = createStore<PopupContextType>({
    anchor: null,
    element: null,
    position: null,
    open: props.open ?? false,
    mount: props.open ?? false,

    _internal: {
      requestId: 0,
      controller: null,
    },
  });

  const middleware = () => {
    const result: Middleware[] = [];

    if (props.offset) result.push(offset(props.offset));
    if (props.shift) result.push(shift(props.shift));
    if (props.flip) result.push(flip(props.flip));

    return result;
  };

  const options = () => {
    if (!context.mount) return null;

    const anchorElement = context.anchor;
    const popupElement = context.element;

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

    setContext('position', position);
  };

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

  const PopupContent = () => {
    const [, { requestOpen }] = usePopup();
    createEffect(on(() => props.open ?? false, requestOpen));

    return props.children;
  }

  return (
    <PopupContext.Provider value={[context, setContext]}>
      <PopupContent />
    </PopupContext.Provider>
  );
};

Popup.Anchor = PopupAnchor;
Popup.Trigger = PopupTrigger;
Popup.Element = PopupElement;
