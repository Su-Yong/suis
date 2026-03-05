import { JSX, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

import { usePopupContext } from './PopupContext';

type PopupElementProps = {
  children: (style: JSX.CSSProperties) => JSX.Element;
};
export const PopupElement = (props: PopupElementProps) => {
  const context = usePopupContext();

  const style = () => ({
    position: context.position()?.strategy ?? 'absolute',
    top: `${context.position()?.y ?? 0}px`,
    left: `${context.position()?.x ?? 0}px`,
  });

  const onParent = (parent: HTMLElement | null) => {
    if (!parent) return;

    const el = parent.firstElementChild;
    if (!el) return;

    context.setElement(el);
  };

  return (
    <Show when={context.open()}>
      <Portal ref={onParent}>
        {props.children(style())}
      </Portal>
    </Show>
  );
};
