import { Show, splitProps } from 'solid-js';
import { Box, Button, Item } from '@suis-ui/kit';

import { Playground } from '../playground';
import { ChevronRight, Star } from 'lucide-solid';
import { BoxPlaygroundData } from './box';

export const ItemPlayground = () => {
  return (
    <Playground
      title={'Item'}
      description={'Item is a styled content row with media, title, description, actions, and renderable internal parts.'}
      data={[
        {
          type: 'group',
          name: 'Box',
          description: 'Box related properties',
          items: BoxPlaygroundData,
          expand: false,
        },
        {
          type: 'select',
          name: 'buttonMode',
          title: 'Button Mode (not a real prop)',
          description: 'Whether to render the item as a button',
          defaultValue: 'div',
          items: ['div', 'button'],
        },

        {
          type: 'select',
          name: 'size',
          description: 'Size of the item',
          defaultValue: 'md',
          items: ['xs', 'sm', 'md', 'lg', 'xl'],
        },

        {
          type: 'select',
          name: 'media',
          description: 'Media of the item',
          defaultValue: 'none',
          items: ['none', 'icon'],
          mapper: (value) => {
            if (value === 'icon') return <Box as={Star} w={'1.6rem'} />;

            return null;
          },
        },
        {
          type: 'input',
          name: 'title',
          description: 'Title of the item',
          defaultValue: 'Item Title',
        },
        {
          type: 'input',
          name: 'description',
          description: 'Description of the item',
          defaultValue: 'Item Description',
        },
        {
          type: 'select',
          name: 'action',
          description: 'Action of the item',
          defaultValue: 'none',
          items: ['none', 'button', 'icon'],
          mapper: (value) => {
            if (value === 'button') return <Button>Action</Button>;
            if (value === 'icon') return <Box as={ChevronRight} w={'1.6rem'} />;

            return null;
          },
        },
      ]}
    >
      {(props) => {
        const [local, rest] = splitProps(props, ['buttonMode']);
        const isButton = () => local.buttonMode === 'button';

        return (
          <Show when={isButton()} fallback={<Item {...rest} />}>
            <Item {...rest} as={Button} variant={'ghost'} />
          </Show>
        );
      }}
    </Playground>
  );
};
