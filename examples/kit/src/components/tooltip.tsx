import { Button, Tooltip } from '@suis-ui/kit';

import { Playground } from '../playground'
import { PopupPlaygroundData } from './popup';

export const TooltipPlayground = () => {
  return (
    <Playground
      title={'Tooltip'}
      description={'Tooltip is a component that can be used to display additional information when hovering over an element. It is often used to provide context or explanations for buttons, icons, or other UI elements.'}
      data={[
        {
          type: 'group',
          name: 'Popup',
          description: 'Popup related properties',
          items: PopupPlaygroundData,
          expand: false,
        },

        {
          type: 'checkbox',
          name: 'withArrow',
          description: 'Whether to show an arrow pointing to the reference element',
          defaultValue: false,
        },
        {
          type: 'number',
          name: 'openDelay',
          description: 'Delay in milliseconds before showing the tooltip after hovering',
          defaultValue: 0,
        },
        {
          type: 'number',
          name: 'closeDelay',
          description: 'Delay in milliseconds before hiding the tooltip after unhovering',
          defaultValue: 0,
        },
        {
          type: 'input',
          name: 'content',
          description: 'The content of the tooltip',
          defaultValue: 'This is a tooltip',
        },
      ]}
    >
      {(props) => (
        <Tooltip
          {...props}
          content={(props.content || 'This is a tooltip') as string}
        >
          <Button>Anchor</Button>
        </Tooltip>
      )}
    </Playground>
  );
};
