import { Box, vars } from '@suis-ui/kit';
import { ColorOptions, ColorSwatch, SizeOptions } from '../constants';
import { Playground, PlaygroundData } from '../playground';

const LayoutData: PlaygroundData[] = [
  {
    type: 'select',
    name: 'pos',
    description: 'Position of the box',
    placeholder: 'flex',
    items: ['relative', 'absolute', 'fixed', 'sticky'],
  },
  {
    type: 'select',
    name: 'direction',
    description: 'Flex direction of the box',
    placeholder: 'flex direction',
    defaultValue: 'row',
    items: ['row', 'row-reverse', 'column', 'column-reverse'],
  },
  {
    type: 'select',
    name: 'justify',
    description: 'Justify content of the box',
    placeholder: 'justify content',
    items: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
  },
  {
    type: 'select',
    name: 'align',
    description: 'Align items of the box',
    placeholder: 'align items',
    items: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
  },
  {
    type: 'select',
    name: 'wrap',
    description: 'Flex wrap of the box',
    placeholder: 'flex wrap',
    items: ['nowrap', 'wrap', 'wrap-reverse'],
  },
  {
    type: 'select',
    name: 'gap',
    description: 'Gap between items in the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
];

const PaddingData: PlaygroundData[] = [
  {
    type: 'select',
    name: 'p',
    description: 'Padding of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'px',
    description: 'Horizontal padding of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'py',
    description: 'Vertical padding of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'pt',
    description: 'Padding top of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'pb',
    description: 'Padding bottom of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'pl',
    description: 'Padding left of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'pr',
    description: 'Padding right of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
];
const MarginData: PlaygroundData[] = [
  {
    type: 'select',
    name: 'm',
    description: 'Margin of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'mx',
    description: 'Horizontal margin of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'my',
    description: 'Vertical margin of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'mt',
    description: 'Margin top of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'mb',
    description: 'Margin bottom of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'ml',
    description: 'Margin left of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'mr',
    description: 'Margin right of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
];
const RadiusData: PlaygroundData[] = [
  {
    type: 'select',
    name: 'r',
    description: 'Border radius of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'tlr',
    description: 'Top left border radius of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'trr',
    description: 'Top right border radius of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'blr',
    description: 'Bottom left border radius of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
  {
    type: 'select',
    name: 'brr',
    description: 'Bottom right border radius of the box',
    placeholder: 'space token',
    items: SizeOptions,
  },
];
const ColorData: PlaygroundData[] = [
  {
    type: 'select',
    name: 'bg',
    description: 'Background color of the box',
    placeholder: 'color token',
    items: ColorOptions,
    renderer: ColorSwatch,
  },
  {
    type: 'select',
    name: 'bc',
    description: 'Border color of the box',
    placeholder: 'color token',
    items: ColorOptions,
    renderer: ColorSwatch,
  },
  {
    type: 'select',
    name: 'c',
    description: 'Text color of the box',
    placeholder: 'color token',
    items: ColorOptions,
    renderer: ColorSwatch,
  },
];
const OtherData: PlaygroundData[] = [
  {
    type: 'select',
    name: 'text',
    description: 'Text style of the box',
    placeholder: 'text token',
    items: Object.keys(vars.font).map((key) => ({
      value: key,
      label: key,
    })),
  }
];

export const BoxPlaygroundData: PlaygroundData[] = [
  // layout
  {
    type: 'group',
    name: 'Layout',
    description: 'Layout related properties',
    items: LayoutData,
  },
  // padding
  {
    type: 'group',
    name: 'Padding',
    description: 'Padding related properties',
    items: PaddingData,
  },
  // margin
  {
    type: 'group',
    name: 'Margin',
    description: 'Margin related properties',
    items: MarginData,
  },
  // radius
  {
    type: 'group',
    name: 'Radius',
    description: 'Radius related properties',
    items: RadiusData,
  },
  // colors
  {
    type: 'group',
    name: 'Colors',
    description: 'Color related properties',
    items: ColorData,
  },
  // others
  ...OtherData,
];

export const BoxPlayground = () => {
  return (
    <Playground
      title={'Box'}
      description={'A basic building block component that can be used to create complex layouts and styles. It supports a wide range of properties for layout, spacing, colors, and more.'}
      data={[
        ...BoxPlaygroundData,
        {
          type: 'input',
          name: 'children',
          description: 'Content of the box',
          defaultValue: 'Box',
        },

      ]}
    >
      {(props) => <Box {...props} />}
    </Playground>
  );
};
