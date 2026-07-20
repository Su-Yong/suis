import { createSignal } from 'solid-js';
import { RangeBar } from '@suis-ui/kit';

import { Playground } from '../playground';
import { BoxPlaygroundData } from './box';

export const RangeBarPlayground = () => {
  const [value, setValue] = createSignal<readonly [number, number]>([25, 75]);

  return (
    <Playground
      title={'RangeBar'}
      description={'RangeBar is a controlled two-value input that shares one thumb style and renderer across both values.'}
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
          description: 'The variant of the range bar',
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
          description: 'Whether the range bar is disabled',
        },
        {
          type: 'select',
          name: 'to',
          description: 'The direction of the range bar',
          items: ['right', 'left', 'top', 'bottom'],
          defaultValue: 'right',
        },
        {
          type: 'number',
          name: 'min',
          description: 'The minimum value of the range bar',
          defaultValue: 0,
        },
        {
          type: 'number',
          name: 'max',
          description: 'The maximum value of the range bar',
          defaultValue: 100,
        },
        {
          type: 'number',
          name: 'step',
          description: 'The step value of the range bar',
          defaultValue: 10,
        },
        {
          type: 'checkbox',
          name: 'inverted',
          description: 'Whether the range bar is inverted',
        }
      ]}
    >
      {(props) => (
        <RangeBar
          value={value()}
          onChangeValue={setValue}
          {...props}
        />
      )}
    </Playground>
  );
};
