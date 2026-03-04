import { JSX, Show, ValidComponent } from 'solid-js';
import { Portal } from 'solid-js/web';

import { usePopupContext } from './PopupContext';
import { Polymorphic, PolymorphicProps, forwardRef } from '../Polymorphic';

type PopupElementOnlyProps = {
  children?: JSX.Element;
};
export type PopupElementProps<T extends ValidComponent> =
  Omit<PolymorphicProps<T>, keyof PopupElementOnlyProps>
  & PopupElementOnlyProps;
export const PopupElement = <T extends ValidComponent>(props: PopupElementProps<T>) => {
  const context = usePopupContext();

  return (
    <Show when={context.open()}>
      <Portal>
        <Polymorphic
          {...props as PolymorphicProps<T>}
          ref={forwardRef(context.setElement, props.ref)}
          style={{
            position: 'absolute',
            top: `${context.position()?.y ?? 0}px`,
            left: `${context.position()?.x ?? 0}px`,
            ...props.style,
          }}
        >
          {props.children}
        </Polymorphic>
      </Portal>
    </Show>
  );
};
