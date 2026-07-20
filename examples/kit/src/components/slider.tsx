import { createSignal } from 'solid-js';
import {
  Slider,
} from '@suis-ui/kit';

import { Playground } from '../playground';
import { BoxPlaygroundData } from './box';

export const SliderPlayground = () => {
  const [value, setValue] = createSignal(50);

  return (
    <Playground
      title={'Slider'}
      description={'Slider is a controlled single-value input with pointer, keyboard, label, direction, disabled, and part-renderer support.'}
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
          name: 'variant',
          description: 'The variant of the slider',
          items: ['default', 'filled'],
          defaultValue: 'default',
        },
        {
          type: 'json',
          name: 'labelAt',
          description: 'The value at which the label should be displayed (number[])',
        },
        {
          type: 'number',
          name: 'labelStep',
          description: 'The step value for the labels',
        },
        {
          type: 'json',
          name: 'marksAt',
          description: 'The value at which the marks should be displayed (number[])',
        },
        {
          type: 'number',
          name: 'marksStep',
          description: 'The step value for the marks',
        },
        {
          type: 'checkbox',
          name: 'disabled',
          description: 'Whether the slider is disabled',
        },
        {
          type: 'select',
          name: 'to',
          description: 'The direction of the slider',
          items: ['right', 'left', 'top', 'bottom'],
          defaultValue: 'right',
        },
        {
          type: 'number',
          name: 'min',
          description: 'The minimum value of the slider',
          defaultValue: 0,
        },
        {
          type: 'number',
          name: 'max',
          description: 'The maximum value of the slider',
          defaultValue: 100,
        },
        {
          type: 'number',
          name: 'step',
          description: 'The step value of the slider',
          defaultValue: 10,
        },
        {
          type: 'number',
          name: 'startAt',
          description: 'The starting value of the slider',
        },
      ]}
    >
      {(props) => (
        <Slider
          value={value()}
          onChangeValue={setValue}
          {...props}
        />
      )}
    </Playground>
  )
};
