import { createSignal, For, JSX, Match, mergeProps, Show, splitProps, Switch, ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  Select as BaseSelect,
  SelectTrigger as BaseSelectTrigger,
  SelectValue as BaseSelectValue,
  SelectContent as BaseSelectContent,
  SelectItem as BaseSelectItem,
  SelectProps as BaseSelectProps,
  useSelect as useBaseSelect,
  clx,
  createPopupController,
} from '@suis/primitives';

import { SelectData, useSelectData } from './useSelectData';

import { Box, BoxProps } from '../Box';
import { PopupPresence } from '../Popup/PopupPresence';
import { usePopupAnimation } from '../Popup/usePopupAnimation';

import { selectAnimation, triggerStyle, indicatorStyle } from './Select.css';

const SelectOnlyProps = [
  'data',
  'placeholder',
  'renderValue',
  'renderIndicator',
] as const;

type SelectOnlyProps<T extends SelectData> = {
  data: T[];
  placeholder?: string;

  children?: never;
  renderValue?: (value: T) => JSX.Element;
  renderIndicator?: (props: SelectorIndicatorProps) => JSX.Element;
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
        renderIndicator: DefaultSelectIndicator,
      },
      props,
    ),
    SelectOnlyProps,
  );

  const [animationElement, setAnimationElement] = createSignal<HTMLElement | null>(null);
  const { state, runAnimation } = usePopupAnimation(animationElement);

  const { groupedList } = useSelectData(() => local.data);

  const SelectTrigger = () => {
    const [context] = useBaseSelect();

    createPopupController(async (open) => {
      await runAnimation(open);

      return open;
    });

    return (
      <BaseSelectTrigger
        {...rest}
        as={rest.as ?? 'button'}
        class={clx(triggerStyle, rest.class, rest.classList)}
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
        <Dynamic<(props: SelectorIndicatorProps) => JSX.Element>
          component={local.renderIndicator}
          open={context.open}
        />
      </BaseSelectTrigger>
    );
  };

  return (
    <BaseSelect>
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
  );
};

export type SelectorIndicatorProps = {
  open: boolean;
}
export const DefaultSelectIndicator = (props: SelectorIndicatorProps) => (
  <div
    data-open={props.open}
    class={indicatorStyle}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </div>
);
