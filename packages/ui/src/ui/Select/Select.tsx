import { JSX, mergeProps, Show, splitProps, ValidComponent } from 'solid-js';
import {
  Select as BaseSelect,
  SelectTrigger as BaseSelectTrigger,
  SelectValue as BaseSelectValue,
  SelectContent as BaseSelectContent,
  SelectItem as BaseSelectItem,
  SelectProps as BaseSelectProps,
} from '@suis/primitives';

import { BoxProps } from '../Box';
import { Button } from '../Button';

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

  return (
    <BaseSelect
    >
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
      <BaseSelectContent>
        <BaseSelectItem value="1">Option 1</BaseSelectItem>
        <BaseSelectItem value="2">Option 2</BaseSelectItem>
        <BaseSelectItem value="3">Option 3</BaseSelectItem>
      </BaseSelectContent>
    </BaseSelect>
  )
};
