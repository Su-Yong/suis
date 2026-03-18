import { createEffect, JSX, mergeProps, on, onCleanup } from 'solid-js';
import {
  computePosition,
  Placement,
  Middleware,
  Strategy,
  flip, FlipOptions,
  offset, OffsetOptions,
  shift, ShiftOptions,
  autoUpdate, AutoUpdateOptions,
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
  shift?: ShiftOptions | boolean;
  flip?: FlipOptions | boolean;
  autoUpdate?: AutoUpdateOptions | boolean;
  middleware?: Middleware[];

  children: JSX.Element;
};
export const Popup = (props: PopupProps) => {
  const local = mergeProps(
    {
      autoUpdate: true,
    },
    props,
  );

  const [context, setContext] = createStore<PopupContextType>({
    anchor: null,
    element: null,
    position: null,
    open: local.open ?? false,
    mount: local.open ?? false,

    _internal: {
      requestId: 0,
      controller: null,
    },
  });

  const middleware = () => {
    const result: Middleware[] = [];

    if (local.offset) result.push(offset(local.offset));
    if (local.shift) result.push(shift(typeof local.shift === 'boolean' ? undefined : local.shift));
    if (local.flip) result.push(flip(typeof local.flip === 'boolean' ? undefined : local.flip));
    if (local.middleware) result.push(...local.middleware);

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
        placement: local.placement,
        strategy: local.strategy,
        middleware: middleware(),
        autoUpdate: local.autoUpdate,
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

    const autoUpdateOptions = options.options.autoUpdate;
    if (autoUpdateOptions) {
      const autoUpdateCleanUp = autoUpdate(
        options.anchor,
        options.popup,
        () => update(options.anchor, options.popup, options.options),
        typeof autoUpdateOptions === 'boolean' ? undefined : autoUpdateOptions,
      );

      onCleanup(autoUpdateCleanUp);
    }
  }));

  const PopupContent = () => {
    const [, { requestOpen }] = usePopup();
    createEffect(on(() => local.open ?? false, requestOpen));

    return local.children;
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
