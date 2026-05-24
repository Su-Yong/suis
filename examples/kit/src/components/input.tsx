import { Input } from '@suis-ui/kit';

import { Playground } from '../playground';
import { BoxPlaygroundData } from './box';

export const InputPlayground = () => {
  return (
    <Playground
      title={'Input'}
      description={'Input is a component that can be used to enter text. It provides various variants and sizes. It also supports disabled state.'}
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
          name: 'as',
          description: 'The HTML element to render the input as',
          defaultValue: 'input',
          items: ['input', 'textarea'],
        },
        {
          type: 'input',
          name: 'type',
          description: 'The type of the input',
          defaultValue: 'text',
        },
        {
          type: 'input',
          name: 'placeholder',
          description: 'Placeholder text when the input is empty',
          defaultValue: 'Enter some text',
        },
        {
          type: 'checkbox',
          name: 'disabled',
          description: 'Whether the input is disabled',
          defaultValue: false,
        }
      ]}
    >
      {(props) => <Input {...props} />}
    </Playground>
  );
};
