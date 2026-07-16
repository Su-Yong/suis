import { ValidComponent } from 'solid-js';

import { useSelect } from './SelectContext';

import { FocusManager} from '../FocusManager';
import { PopupContent } from '../Popup';
import { Polymorphic, PolymorphicProps } from '../Polymorphic';
import { sx } from '../helper';
import { EnterableFloatingFocusMapper, FloatingFocusMapper, VerticalFloatingFocusMapper } from '../FocusManager/useFloatingFocus';

type SelectContentOnlyProps = {};
export type SelectContentProps<T extends ValidComponent> =
  Omit<PolymorphicProps<T>, keyof SelectContentOnlyProps>
  & SelectContentOnlyProps;
export const SelectContent = <T extends ValidComponent>(props: SelectContentProps<T>) => {
  const [context, { requestOpen }] = useSelect();

  const floatingList = () => Array.from(context.content?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);
  const floatingMapper = (): FloatingFocusMapper => (move, enter, escape) => ({
    ...VerticalFloatingFocusMapper(move, enter, escape),
    ...EnterableFloatingFocusMapper(move, enter, escape),
    Escape: () => {
      requestOpen(false);
      escape();
    },
  })

  return (
    <PopupContent>
      {(style) => (
        <FocusManager
          enable={context.open}
          floating={floatingList()}
          floatingMapper={floatingMapper()}
        >
          <Polymorphic
            {...props as PolymorphicProps<T>}
            role={'listbox'}
            aria-required={context.required ? 'true' : undefined}
            as={props.as ?? 'ul'}
            style={sx(style(), props.style)}
          />
        </FocusManager>
      )}
    </PopupContent>
  );
};
