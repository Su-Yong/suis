import { Accessor, JSX, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

import { usePopupContext } from './PopupContext';

type PopupContentProps = {
  children: (style: Accessor<JSX.CSSProperties>) => JSX.Element;
};
export const PopupContent = (props: PopupContentProps) => {
  const [context, setContext] = usePopupContext();

  const style = () => ({
    position: context.position?.strategy ?? 'absolute',
    top: `${context.position?.y ?? 0}px`,
    left: `${context.position?.x ?? 0}px`,
  });

  const onParent = (parent: HTMLElement | null) => {
    if (!parent) return;

    const el = parent.firstElementChild;
    if (!el) return;

    setContext('content', el);
  };

  return (
    <Show when={context.mount}>
      <Portal ref={onParent}>
        {props.children(style)}
      </Portal>
    </Show>
  );
};
