import { createEffect, createMemo, createSignal, For, getOwner, JSX, Match, mergeProps, on, onCleanup, runWithOwner, Show, splitProps, Switch, ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { size } from '@floating-ui/dom';
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
  PopupAnchor,
  Polymorphic,
  PolymorphicProps,
  sx,
} from '@suis-ui/primitives';

import { ResolvedSelectData, SelectData, useSelectData, useSelectValue } from './useSelectData';

import { Button } from '../Button';
import { Box, BoxOnlyProps, BoxProps } from '../Box';
import { Item, ItemProps } from '../Item';
import { PopupPresence, PopupPresenceProps } from '../Popup/PopupPresence';
import { usePopupAnimation } from '../Popup/usePopupAnimation';

import { selectAnimation, triggerStyle, indicatorStyle, maxHeight, contentStyle, groupStyle, groupTitleStyle, checkStyle } from './Select.css';

const SelectOnlyProps = [
  'data',
  'onChange',
  'placeholder',

  'renderValue',
  'renderIndicator',
  'renderContent',
  'renderGroup',
  'renderItem',
  'renderCheckIndicator',

  'indicatorProps',
  'popupProps',
  'contentProps',
  'groupProps',
  'itemProps',
  'checkIndicatorProps',
] as const;
const BaseSelectOnlyProps = [
  'value',
  'onChangeValue',
  'required',
  'open',

  'placement',
  'strategy',
  'offset',
  'shift',
  'flip',
  'autoUpdate',
  'middleware',
] as const;

export type SelectContentProps<T extends ValidComponent = ValidComponent> = BoxProps<T> & {};

type SelectPrimitiveValue<Required extends boolean> = Required extends true ? string : string | null;
type SelectResolvedValue<Required extends boolean> = Required extends true ? ResolvedSelectData : ResolvedSelectData | null;
type SelectPolymorphicProps<T extends ValidComponent> =
  T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T extends (props: infer P) => unknown
      ? P
      : Record<string, unknown>;
type SelectBoxProps<T extends ValidComponent> = BoxOnlyProps & SelectPolymorphicProps<T> & {
  as?: T;
};
type SelectOnlyProps<D extends SelectData, Required extends boolean = false> = {
  data: D[];
  value?: SelectPrimitiveValue<Required>;
  onChangeValue?: (value: SelectPrimitiveValue<Required>) => void;
  onChange?: (value: SelectResolvedValue<Required>) => void;

  placeholder?: string;
  required?: Required;
  children?: never;

  renderValue?: (value: ResolvedSelectData) => JSX.Element;
  renderIndicator?: <T extends ValidComponent>(props: SelectIndicatorProps<T>) => JSX.Element;
  renderContent?: <T extends ValidComponent>(props: SelectContentProps<T>) => JSX.Element;
  renderGroup?: <T extends ValidComponent>(props: SelectGroupProps<T>) => JSX.Element;
  renderItem?: <T extends ValidComponent>(props: SelectItemProps<T>) => JSX.Element;
  renderCheckIndicator?: <T extends ValidComponent>(props: SelectCheckIndicatorProps<T>) => JSX.Element;

  indicatorProps?: SelectIndicatorProps<ValidComponent>;
  popupProps?: PopupPresenceProps<ValidComponent>;
  contentProps?: SelectContentProps<ValidComponent>;
  groupProps?: SelectGroupProps<ValidComponent>;
  itemProps?: SelectItemProps<ValidComponent>;
  checkIndicatorProps?: SelectCheckIndicatorProps<ValidComponent>;
};
export type SelectProps<
  T extends ValidComponent = 'button',
  U extends SelectData = SelectData,
  Required extends boolean = false
> =
  Omit<SelectBoxProps<T>, keyof SelectOnlyProps<U, Required> | keyof BaseSelectProps<Required> | 'onChange' | 'value'>
  & Omit<BaseSelectProps<Required>, keyof SelectOnlyProps<U, Required>>
  & SelectOnlyProps<U, Required>;

type SelectComponent = {
  <U extends SelectData = SelectData, Required extends boolean = false>(props: SelectProps<'button', U, Required>): JSX.Element;
  <T extends ValidComponent, U extends SelectData = SelectData, Required extends boolean = false>(props: SelectProps<T, U, Required>): JSX.Element;
};

const SelectRoot = <T extends ValidComponent = 'button', U extends SelectData = SelectData, Required extends boolean = false>(
  props: SelectProps<T, U, Required>
) => {
  const [local, baseProps, rest] = splitProps(
    mergeProps(
      {
        flip: true,
        offset: 4,

        renderValue: (value: ResolvedSelectData) => value.label,
        renderIndicator: SelectIndicator,
        renderContent: Box,
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
  const [availableHeight, setAvailableHeight] = createSignal<number | null>(null);
  const { state, runAnimation } = usePopupAnimation(animationElement);

  const { list, groupedList } = useSelectData(() => local.data);
  const { fromValue } = useSelectValue(list);
  const isOpenControlled = () => typeof baseProps.open === 'boolean';
  const middleware = createMemo(() => [
    size({
      apply: ({ availableHeight }) => {
        setAvailableHeight(Math.max(0, availableHeight));
      },
    }),
    ...(baseProps.middleware ?? []),
  ]);

  const SelectTrigger = () => {
    const [context, { requestOpen }] = useBaseSelect();

    let cleanUpClickAway: (() => void) | null = null;
    createPopupController(async (open) => {
      cleanUpClickAway?.();
      await runAnimation(open);

      return open;
    });
    createEffect(on(() => [context.content, context.open] as const, ([content, open]) => {
      if (isOpenControlled()) return;
      if (!content) return;
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
          })(() => context.content));
        });
      });
    }));

    const children = (
      <>
        <BaseSelectValue>
          {(value) => (
            <Show
              when={fromValue(value)}
              fallback={local.placeholder}
            >
              {(selected) => local.renderValue(selected())}
            </Show>
          )}
        </BaseSelectValue>
        <Dynamic<(props: SelectIndicatorProps<'div'>) => JSX.Element>
          component={local.renderIndicator}
          open={context.open}
        />
      </>
    );

    if (isOpenControlled()) {
      return (
        <PopupAnchor>
          <Polymorphic
            {...rest as PolymorphicProps<T>}
            data-has-value={!!context.value}
            as={rest.as ?? 'button'}
            role={'combobox'}
            aria-required={baseProps.required ? 'true' : undefined}
            class={clx(triggerStyle, rest.class, rest.classList)}
          >
            {children}
          </Polymorphic>
        </PopupAnchor>
      );
    }

    return (
      <BaseSelectTrigger
        {...rest}
        data-has-value={!!context.value}
        as={rest.as ?? 'button'}
        class={clx(triggerStyle, rest.class, rest.classList)}
      >
        {children}
      </BaseSelectTrigger>
    );
  };

  const SelectContent = () => {
    const [context] = useBaseSelect();

    return (
      <Box<((props: SelectContentProps) => JSX.Element) >
        {...local.contentProps}
        as={local.renderContent}
        class={clx(contentStyle, local.contentProps?.class, local.contentProps?.classList)}
        style={sx(
          assignInlineVars({
            [maxHeight]: `${availableHeight() ?? 0}px`,
          }),
          local.contentProps?.style,
        )}
      >
        <For each={groupedList()}>
          {({ group, data }) => (
            <Switch>
              <Match when={group !== null}>
                <Box<'ul' | ((props: SelectGroupProps<'ul'>) => JSX.Element) >
                  {...local.groupProps}
                  as={local.renderGroup ?? 'ul'}
                >
                  <Box class={groupTitleStyle}>
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
                        checkIndicatorProps={local.checkIndicatorProps}
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
                      checkIndicatorProps={local.checkIndicatorProps}
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
    <BaseSelect
      {...baseProps}
      middleware={middleware()}
      onChangeValue={(value) => {
        if (local.onChange) {
          const selected = fromValue(value);

          if (!(baseProps.required && selected === null)) local.onChange?.(selected as SelectResolvedValue<Required>);
        }

        if (baseProps.required && value === null) return;

        return baseProps.onChangeValue?.(value as SelectPrimitiveValue<Required>);
      }}
    >
      <SelectTrigger />
      <BaseSelectContent
        {...local.popupProps}
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

export const Select = SelectRoot as SelectComponent;

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

export type SelectGroupProps<T extends ValidComponent = ValidComponent> = BoxProps<T> & {};
export const SelectGroup = <T extends ValidComponent>(props: SelectGroupProps<T>) => (
  <Box
    {...props}
    as={props.as ?? 'ul'}
    class={clx(groupStyle, props.class, props.classList)}
  >
    {props.children}
  </Box>
);

export type SelectItemProps<T extends ValidComponent = ValidComponent> = BaseSelectItemProps<T> & ItemProps<T> & {
  selected: boolean;
  children?: JSX.Element;

  renderCheckIndicator?: <T extends ValidComponent>(props: SelectCheckIndicatorProps<T>) => JSX.Element;
  checkIndicatorProps?: SelectCheckIndicatorProps<ValidComponent>;
};
export const SelectItem = <T extends ValidComponent>(props: SelectItemProps<T>) => {
  const [local, rest] = splitProps(props, ['selected', 'renderCheckIndicator', 'checkIndicatorProps']);

  return (
    <Box as={'li'}>
      <Item
        {...rest as ItemProps<'div'>}
        as={Button}
        variant={'ghost'}
        title={rest.children}
        action={
          <Show when={local.selected}>
            <Dynamic
              {...local.checkIndicatorProps as BoxProps<ValidComponent>}
              component={local.renderCheckIndicator ?? SelectCheckIndicator}
            />
          </Show>
        }
      />
    </Box>
  );
};

export type SelectCheckIndicatorProps<T extends ValidComponent = ValidComponent> = BoxProps<T> & {};
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
