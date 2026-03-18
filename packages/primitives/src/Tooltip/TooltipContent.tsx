import { ValidComponent } from 'solid-js';
import { sx } from '../helper';
import { Polymorphic, PolymorphicProps } from '../Polymorphic';
import { PopupElement } from '../Popup';
import { useTooltip } from './TooltipContext';

type TooltipContentOnlyProps = {};
export type TooltipContentProps<T extends ValidComponent> =
  Omit<PolymorphicProps<T>, keyof TooltipContentOnlyProps>
  & TooltipContentOnlyProps;
export const TooltipContent = <T extends ValidComponent>(props: TooltipContentProps<T>) => {
  const [context] = useTooltip();

  return (
    <PopupElement>
      {(style) => (
        <Polymorphic
          {...props as PolymorphicProps<T>}
          id={context.id}
          style={sx(style(), props.style)}
          role={'tooltip'}
        >
          {props.children}
        </Polymorphic>
      )}
    </PopupElement>
  );
};
