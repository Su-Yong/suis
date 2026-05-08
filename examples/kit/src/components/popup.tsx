import { Popup, Button, Box } from '@suis-ui/kit';

import { Playground, PlaygroundData } from '../playground';

export const PopupPlaygroundData: PlaygroundData[] = [
  {
    type: 'checkbox',
    name: 'open',
    description: 'Open state of the popup',
  },
  {
    type: 'select',
    name: 'placement',
    description: 'Placement of the popup',
    defaultValue: 'bottom',
    items: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'],
  },
  {
    type: 'select',
    name: 'strategy',
    description: 'Positioning strategy of the popup',
    defaultValue: 'absolute',
    items: ['absolute', 'fixed'],
  },
  {
    type: 'number',
    name: 'offset',
    description: 'Offset of the popup from the reference element',
    placeholder: 'offset value',
  },
  {
    type: 'checkbox',
    name: 'shift',
    description: 'Whether to shift the popup to keep it in the viewport',
    defaultValue: true,
  },
  {
    type: 'checkbox',
    name: 'flip',
    description: 'Whether to flip the popup to the opposite side if there is not enough space',
    defaultValue: true,
  },
  {
    type: 'checkbox',
    name: 'autoUpdate',
    description: 'Whether to automatically update the position of the popup when the reference element or the popup itself changes size or position',
    defaultValue: true,
  },
];

export const PopupPlayground = () => {
  return (
    <Playground
      title={'Popup'}
      description={'Popup is a component that can be used to display content on top of other content. It is often used for dropdowns, tooltips, and modals. It provides various placement options and can be triggered by hover or click.'}
      data={PopupPlaygroundData}
    >
      {(props) => (
        <Popup
          {...props}
          element={
            <Box
              p={'md'}
              bg={'surface.main'}
              bc={'surface.higher'}
              bd={'md'}
              r={'md'}
            >
              Popup Content
            </Box>
          }
        >
          <Button>
            Anchor
          </Button>
        </Popup>
      )}
    </Playground>
  );
};
