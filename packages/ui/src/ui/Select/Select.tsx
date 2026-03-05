import { createSignal, JSX, mergeProps, Show, splitProps, ValidComponent } from 'solid-js';
import {
  Select as BaseSelect,
  SelectTrigger as BaseSelectTrigger,
  SelectValue as BaseSelectValue,
  SelectContent as BaseSelectContent,
  SelectItem as BaseSelectItem,
  SelectProps as BaseSelectProps,
  usePopupTrigger,
} from '@suis/primitives';

import { Box, BoxProps } from '../Box';
import { Button } from '../Button';
import { usePopupAnimation } from '../Popup/usePopupAnimation';
import { selectAnimation } from './Select.css';
import { PopupPresence } from '../Popup/PopupPresence';

const SelectOnlyProps = [
  'data',
  'placeholder',
  'renderValue',
] as const;

type SimpleSelectData = string;
type SingleSelectData = {
  value: string;
  label: string;
};
type GroupedSelectData = {
  label: string;
  options: SimpleSelectData[] | SingleSelectData[];
};
type SelectData = SimpleSelectData | SingleSelectData | GroupedSelectData;
type SelectOnlyProps<T extends SelectData> = {
  data: T[];
  placeholder?: string;

  children?: never;
  renderValue?: (value: T) => JSX.Element;
};
export type SelectProps<T extends ValidComponent, U extends SelectData> =
  Omit<BoxProps<T>, keyof SelectOnlyProps<U> | keyof BaseSelectProps>
  & Omit<BaseSelectProps, keyof SelectOnlyProps<U>>
  & SelectOnlyProps<U>;
export const Select = <T extends ValidComponent, U extends SelectData>(
  props: SelectProps<T, U>
) => {
  const [local, rest] = splitProps(
    mergeProps(
      {
        renderValue: (value: U) => value,
      },
      props,
    ),

    SelectOnlyProps,
  );

  const [animationElement, setAnimationElement] = createSignal<HTMLElement | null>(null);
  const { state, runAnimation } = usePopupAnimation(animationElement);

  const SelectTrigger = () => {
    usePopupTrigger(() => {
      runAnimation(!state.open);

      return false;
    });

    return (
      <BaseSelectTrigger
        {...rest}
        as={rest.as ?? Button}
      >
        <BaseSelectValue>
          {(value) => (
            <Show
              when={value !== null}
              fallback={local.placeholder}
            >
              {local.renderValue(value)}
            </Show>
          )}
        </BaseSelectValue>
      </BaseSelectTrigger>
    );
  };

  return (
    <BaseSelect open={state.open}>
      <SelectTrigger />
      <BaseSelectContent
        as={PopupPresence}
        enter={state.enter}
        exit={state.exit}
        animation={selectAnimation}
        animationWrapperProps={{
          ref: setAnimationElement,
        }}
      >
        <Box bg={'surface.main'}>
          <BaseSelectItem value="1">Option 1</BaseSelectItem>
          <BaseSelectItem value="2">Option 2</BaseSelectItem>
          <BaseSelectItem value="3">Option 3</BaseSelectItem>
        </Box>
      </BaseSelectContent>
    </BaseSelect>
  )
};
