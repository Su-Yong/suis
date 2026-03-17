import { createEffect, createSignal, For, getOwner, JSX, Match, mergeProps, on, onCleanup, runWithOwner, Show, splitProps, Switch, ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  Select as BaseSelect,
  SelectTrigger as BaseSelectTrigger,
  SelectValue as BaseSelectValue,
  SelectContent as BaseSelectContent,
  SelectItem as BaseSelectItem,
  SelectProps as BaseSelectProps,
  SelectItemProps as BaseSelectItemProps,
  useSelect as useBaseSelect,
  clx,
  createPopupController,
  createClickAway,
} from '@suis/primitives';

import { SelectData, useSelectData } from './useSelectData';

import { Box, BoxProps } from '../Box';
import { PopupPresence } from '../Popup/PopupPresence';
import { usePopupAnimation } from '../Popup/usePopupAnimation';

import { selectAnimation, triggerStyle, indicatorStyle, contentStyle, groupStyle, groupTitleStyle, itemStyle, checkStyle } from './Select.css';

const SelectOnlyProps = [
  'data',
  'placeholder',

  'renderValue',
  'renderIndicator',
  'renderGroup',
  'renderItem',
  'renderCheckIndicator',

  'indicatorProps',
  'groupProps',
  'itemProps',
] as const;
const BaseSelectOnlyProps = [
  'value',
  'onChangeValue',

  'placement',
  'strategy',
  'offset',
  'shift',
  'flip',
] as const;

type SelectOnlyProps<T extends SelectData> = {
  data: T[];
  placeholder?: string;

  children?: never;

  renderValue?: (value: T) => JSX.Element;
  renderIndicator?: <T extends ValidComponent>(props: SelectIndicatorProps<T>) => JSX.Element;
  renderGroup?: <T extends ValidComponent>(props: SelectGroupProps<T>) => JSX.Element;
  renderItem?: <T extends ValidComponent>(props: SelectItemProps<T>) => JSX.Element;
  renderCheckIndicator?: <T extends ValidComponent>(props: SelectCheckIndicatorProps<T>) => JSX.Element;

  indicatorProps?: SelectIndicatorProps<ValidComponent>;
  groupProps?: SelectGroupProps<ValidComponent>;
  itemProps?: SelectItemProps<ValidComponent>;
};
export type SelectProps<T extends ValidComponent, U extends SelectData> =
  Omit<BoxProps<T>, keyof SelectOnlyProps<U> | keyof BaseSelectProps>
  & Omit<BaseSelectProps, keyof SelectOnlyProps<U>>
  & SelectOnlyProps<U>;
export const Select = <T extends ValidComponent, U extends SelectData>(
  props: SelectProps<T, U>
) => {
  const [local, baseProps, rest] = splitProps(
    mergeProps(
      {
        flip: true,
        offset: 4,

        renderValue: (value: U) => value,
        renderIndicator: SelectIndicator,
        renderGroup: SelectGroup,
        renderItem: SelectItem,
        renderCheckIndicator: SelectCheckIndicator,
      },
      props,
    ),
    SelectOnlyProps,
    BaseSelectOnlyProps,
  );

  const [animationElement, setAnimationElement] = createSignal<HTMLElement | null>(null);
  const { state, runAnimation } = usePopupAnimation(animationElement);

  const { groupedList } = useSelectData(() => local.data);

  const SelectTrigger = () => {
    const [context, { requestOpen }] = useBaseSelect();

    let cleanUpClickAway: (() => void) | null = null;
    createPopupController(async (open) => {
      cleanUpClickAway?.();
      await runAnimation(open);

      return open;
    });
    createEffect(on(() => [context.element, context.open] as const, ([element, open]) => {
      if (!element) return;
      if (!open) return;

      const owner = getOwner();
      requestAnimationFrame(() => {
        runWithOwner(owner, () => {
          onCleanup(createClickAway((cleanUp) => {
            cleanUpClickAway = cleanUp;

            if (context.open) {
              requestOpen(false);
              cleanUp();
            }
          })(() => context.element));
        });
      });
    }));

    return (
      <BaseSelectTrigger
        {...rest}
        data-has-value={!!context.value}
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
        <Dynamic<(props: SelectIndicatorProps<'div'>) => JSX.Element>
          component={local.renderIndicator}
          open={context.open}
        />
      </BaseSelectTrigger>
    );
  };

  const SelectContent = () => {
    const [context] = useBaseSelect();

    return (
      <Box class={contentStyle}>
        <For each={groupedList()}>
          {({ group, data }) => (
            <Switch>
              <Match when={group !== null}>
                <Box<'ul' | ((props: SelectGroupProps<'ul'>) => JSX.Element) >
                  {...local.groupProps}
                  as={local.renderGroup ?? 'ul'}
                >
                  <Box
                    class={groupTitleStyle}
                  >
                    {group}
                  </Box>
                  <For each={data}>
                    {({ value, label }) => (
                      <BaseSelectItem
                        {...local.itemProps}
                        as={local.renderItem ?? 'li'}
                        value={value}
                        selected={value === context.value}
                        renderCheckIndicator={local.renderCheckIndicator}
                      >
                        {label}
                      </BaseSelectItem>
                    )}
                  </For>
                </Box>
              </Match>
              <Match when={group === null}>
                <For each={data}>
                  {({ value, label }) => (
                    <BaseSelectItem
                      {...local.itemProps}
                      as={local.renderItem ?? 'li'}
                      value={value}
                      selected={value === context.value}
                      renderCheckIndicator={local.renderCheckIndicator}
                    >
                      {label}
                    </BaseSelectItem>
                  )}
                </For>
              </Match>
            </Switch>
          )}
        </For>
      </Box>
    );
  };

  return (
    <BaseSelect {...baseProps}>
      <SelectTrigger />
      <BaseSelectContent
        as={PopupPresence}
        enter={state.enter}
        exit={state.exit}
        animation={selectAnimation}
        animationWrapperProps={{ ref: setAnimationElement }}
      >
        <SelectContent />
      </BaseSelectContent>
    </BaseSelect>
  );
};

export type SelectIndicatorProps<T extends ValidComponent> = BoxProps<T> & {
  open: boolean;
}
export const SelectIndicator = <T extends ValidComponent>(props: SelectIndicatorProps<T>) => {
  const [local, rest] = splitProps(props, ['open']);

  return (
    <Box
      {...rest}
      data-open={local.open}
      class={clx(indicatorStyle, rest.class, rest.classList)}
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
    </Box>
  );
};

export type SelectGroupProps<T extends ValidComponent> = BoxProps<T> & {};
export const SelectGroup = <T extends ValidComponent>(props: SelectGroupProps<T>) => (
  <Box
    {...props}
    as={props.as ?? 'ul'}
    class={clx(groupStyle, props.class, props.classList)}
  >
    {props.children}
  </Box>
);

export type SelectItemProps<T extends ValidComponent> = BaseSelectItemProps<T> & BoxProps<T> & {
  selected: boolean;
  children?: JSX.Element;

  renderCheckIndicator?: () => JSX.Element;
};
export const SelectItem = <T extends ValidComponent>(props: SelectItemProps<T>) => {
  const [local, rest] = splitProps(props, ['selected', 'renderCheckIndicator']);

  return (
    <Box
      {...rest as BoxProps<T>}
      as={rest.as ?? 'li'}
      class={clx(itemStyle, rest.class, rest.classList)}
    >
      {rest.children}
      <Show when={local.selected}>
        <Dynamic component={local.renderCheckIndicator ?? SelectCheckIndicator} />
      </Show>
    </Box>
  );
};

export type SelectCheckIndicatorProps<T extends ValidComponent> = BoxProps<T> & {};
export const SelectCheckIndicator = <T extends ValidComponent>(props: SelectCheckIndicatorProps<T>) => (
  <Box
    {...props}
    class={clx(indicatorStyle, props.class, props.classList)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={checkStyle}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </Box>
);
