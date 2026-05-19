import { Show, splitProps } from 'solid-js';
import { Box, Button } from '@suis-ui/kit';
import { Star } from 'lucide-solid';

import { Playground } from '../playground';
import { BoxPlaygroundData } from './box';

export const ButtonPlayground = () => {
  return (
    <Playground
      title={'Button'}
      description={'Button is a component that can be used to trigger an action. It provides various variants and sizes. It also supports disabled and active states.'}
      data={[
        {
          type: 'group',
          name: 'Box',
          description: 'Box related properties',
          items: BoxPlaygroundData,
          expand: false
        },

        {
          type: 'select',
          name: 'variant',
          description: 'Variant of the button',
          defaultValue: 'default',
          items: ['default', 'primary', 'secondary', 'ghost'],
        },
        {
          type: 'select',
          name: 'size',
          description: 'Size of the button',
          defaultValue: 'md',
          items: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
          type: 'select',
          name: 'type',
          description: 'Type of the button',
          defaultValue: 'button',
          items: ['button', 'icon'],
        },
        {
          type: 'checkbox',
          name: 'disabled',
          description: 'Disabled state of the button',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'active',
          description: 'Active state of the button',
          defaultValue: false,
        },

        {
          type: 'checkbox',
          name: 'iconChild',
          title: 'Use Icon Children',
          description: '',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'textChild',
          title: 'Use Text Children',
          description: '',
          defaultValue: true,
        },
      ]}
    >
      {(props) => {
        const [local, rest] = splitProps(props, ['iconChild', 'textChild']);

        return (
          <Button {...rest}>
            <Show when={local.iconChild}>
              <Box as={Star} w={'1.6rem'} h={'1.6rem'} />
            </Show>
            <Show when={local.textChild} fallback={''}>
              Button
            </Show>
          </Button>
        );
      }}
    </Playground>
  );
};
