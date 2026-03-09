import { createSignal, For, JSX, Match, mergeProps, Show, splitProps, Switch, ValidComponent } from 'solid-js';
import {
  Select as BaseSelect,
  SelectTrigger as BaseSelectTrigger,
  SelectValue as BaseSelectValue,
  SelectContent as BaseSelectContent,
  SelectItem as BaseSelectItem,
  SelectProps as BaseSelectProps,
  usePopupTrigger,
  clx,
} from '@suis/primitives';

import { SelectData, useSelectData } from './useSelectData';

import { Box, BoxProps } from '../Box';
import { PopupPresence } from '../Popup/PopupPresence';
import { usePopupAnimation } from '../Popup/usePopupAnimation';

import { selectAnimation } from './Select.css';

const SelectOnlyProps = [
  'data',
  'placeholder',
  'renderValue',
] as const;

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

  const { groupedList } = useSelectData(() => local.data);

  const SelectTrigger = () => {
    usePopupTrigger(() => {
      runAnimation(!state.open);

      return false;
    });

    return (
      <BaseSelectTrigger
        {...rest}
        as={rest.as ?? 'button'}
        class={clx(rest.class, rest.classList)}
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
        animationWrapperProps={{ ref: setAnimationElement }}
      >
        <Box bg={'surface.main'}>
          <For each={groupedList()}>
            {({ group, data }) => (
              <Switch>
                <Match when={group !== null}>
                  <Box>
                    <div>{group}</div>
                    <For each={data}>
                      {({ value, label }) => (
                        <BaseSelectItem value={value}>{label}</BaseSelectItem>
                      )}
                    </For>
                  </Box>
                </Match>
                <Match when={group === null}>
                  <For each={data}>
                    {({ value, label }) => (
                      <BaseSelectItem value={value}>{label}</BaseSelectItem>
                    )}
                  </For>
                </Match>
              </Switch>
            )}
          </For>
        </Box>
      </BaseSelectContent>
    </BaseSelect>
  )
};
