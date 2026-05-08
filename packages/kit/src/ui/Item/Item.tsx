import { JSX, mergeProps, Show, splitProps, type ValidComponent } from 'solid-js';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { clx } from '@suis-ui/primitives';

import { Box, type BoxProps } from '../Box';

import {
  itemStyle,
} from './Item.css';

const ItemOnlyPropList = [
  ...itemStyle.variants(),

  'media',
  'title',
  'description',
  'action',
] as const;

type ItemOnlyProps = RecipeVariants<typeof itemStyle> & {
  media?: JSX.Element;
  title?: JSX.Element;
  description?: JSX.Element;
  action?: JSX.Element;
};

export type ItemProps<T extends ValidComponent = 'div'> = Omit<BoxProps<T>, keyof ItemOnlyProps> & ItemOnlyProps;
export const Item = <T extends ValidComponent = 'div'>(props: ItemProps<T> & { as?: T }) => {
  const [local, rest] = splitProps(
    mergeProps(
      {
        size: 'md' as const,
      },
      props,
    ),
    ItemOnlyPropList,
  );

  return (
    <Box
      {...rest as BoxProps<T>}
      class={clx(itemStyle({ size: local.size }), rest.class, rest.classList)}
    >
      <Show when={local.media}>
        {local.media}
      </Show>
      <Box flex justify={'center'} align={'flex-start'}>
        <Box as={'span'} text={'body'}>{local.title}</Box>
        <Box as={'span'} text={'caption'} c={'text.caption'}>{local.description}</Box>
      </Box>
      <Show when={local.action}>
        {local.action}
      </Show>
    </Box>
  );
};
