import { Select, SelectData } from '@suis-ui/kit';

import { BoxPlaygroundData } from './box';
import { PopupPlaygroundData } from './popup';
import { Playground } from '../playground';

export const SelectPlayground = () => {
  return (
    <Playground
      title={'Select'}
      description={'Select is a component that can be used to select an option from a list of options. It provides various variants and sizes. It also supports disabled state.'}
      data={[
        {
          type: 'group',
          name: 'Box',
          description: 'Box related properties',
          items: BoxPlaygroundData,
          expand: false,
        },
        {
          type: 'group',
          name: 'Popup',
          description: 'Popup related properties',
          items: PopupPlaygroundData,
          expand: false,
        },

        {
          type: 'input',
          name: 'placeholder',
          description: 'Placeholder text when no option is selected',
          defaultValue: 'Select an option',
        },
        {
          type: 'json',
          name: 'data',
          description: 'Data of the select options',
          defaultValue: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
            {
              label: 'Group 1',
              options: [
                { value: 'option4', label: 'Option 4' },
                { value: 'option5', label: 'Option 5' },
                { value: 'option6', label: 'Option 6' },
              ],
            },
          ] satisfies SelectData[],
        },
      ]}
    >
      {(props) => <Select data={(props.data as SelectData[]) ?? []} {...props} />}
    </Playground>
  )
};
