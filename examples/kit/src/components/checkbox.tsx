import { Show } from 'solid-js';
import { Star } from 'lucide-solid';
import { Box, Button, CheckBox } from '@suis-ui/kit';

import { Playground } from '../playground';
import { BoxPlaygroundData } from './box';

export const CheckboxPlayground = () => {
  return (
    <Playground
      title={'Checkbox'}
      description={'Checkbox is a component that can be used to select one or more options from a set. It can be used in forms, filters, and other UI elements. It supports checked and disabled states.'}
      data={[
        {
          type: 'group',
          name: 'Box',
          description: 'Box related properties',
          items: BoxPlaygroundData,
          expand: false
        },

        {
          type: 'checkbox',
          name: 'checked',
          description: 'Checked state of the checkbox',
          defaultValue: false,
        },
        // {
        //   type: 'checkbox',
        //   name: 'disabled',
        //   description: 'Disabled state of the checkbox',
        //   defaultValue: false,
        // },

        {
          type: 'input',
          name: 'name',
          description: 'Name of the checkbox input',
          defaultValue: 'Checkbox',
        },
      ]}
    >
      {(props) => (
        <CheckBox {...props} />
      )}
    </Playground>
  );
};
