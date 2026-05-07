import { Box, vars } from '@suis-ui/kit';
import { ColorOptions, ColorSwatch, LineOptions, ShadowOptions, SizeOptions, TextOptions } from '../constants';
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
const BorderData: PlaygroundData[] = [
  {
    type: 'select',
    name: 'bd',
    description: 'Border width of the box',
    placeholder: 'line token',
    items: LineOptions,
  },
  {
    type: 'select',
    name: 'bdl',
    description: 'Left border width of the box',
    placeholder: 'line token',
    items: LineOptions,
  },
  {
    type: 'select',
    name: 'bdr',
    description: 'Right border width of the box',
    placeholder: 'line token',
    items: LineOptions,
  },
  {
    type: 'select',
    name: 'bdt',
    description: 'Top border width of the box',
    placeholder: 'line token',
    items: LineOptions,
  },
  {
    type: 'select',
    name: 'bdb',
    description: 'Bottom border width of the box',
    placeholder: 'line token',
    items: LineOptions,
  },
  {
    type: 'select',
    name: 'blc',
    description: 'Left border color of the box',
    placeholder: 'color token',
    items: ColorOptions,
    renderer: ColorSwatch,
  },
  {
    type: 'select',
    name: 'brc',
    description: 'Right border color of the box',
    placeholder: 'color token',
    items: ColorOptions,
    renderer: ColorSwatch,
  },
  {
    type: 'select',
    name: 'btc',
    description: 'Top border color of the box',
    placeholder: 'color token',
    items: ColorOptions,
    renderer: ColorSwatch,
  },
  {
    type: 'select',
    name: 'bbc',
    description: 'Bottom border color of the box',
    placeholder: 'color token',
    items: ColorOptions,
    renderer: ColorSwatch,
  },
];
const PositionData: PlaygroundData[] = [
  {
    type: 'input',
    name: 't',
    description: 'Top offset of the box',
    placeholder: 'CSS length',
  },
  {
    type: 'input',
    name: 'r',
    description: 'Right offset of the box',
    placeholder: 'CSS length',
  },
  {
    type: 'input',
    name: 'b',
    description: 'Bottom offset of the box',
    placeholder: 'CSS length',
  },
  {
    type: 'input',
    name: 'l',
    description: 'Left offset of the box',
    placeholder: 'CSS length',
  },
  {
    type: 'input',
    name: 'z',
    description: 'Z-index of the box',
    placeholder: 'z-index',
  },
];
const OtherData: PlaygroundData[] = [
  {
    type: 'select',
    name: 'text',
    description: 'Text style of the box',
    placeholder: 'text token',
    items: TextOptions,
  },
  {
    type: 'select',
    name: 'shadow',
    description: 'Shadow of the box',
    placeholder: 'shadow token',
    items: ShadowOptions,
  },
  {
    type: 'select',
    name: 'overflow',
    description: 'Overflow behavior of the box',
    placeholder: 'overflow value',
    items: ['auto', 'hidden', 'visible', 'scroll', 'xAuto', 'xHidden', 'xVisible', 'xScroll', 'yAuto', 'yHidden', 'yVisible', 'yScroll'],
  },
];

export const BoxPlaygroundData: PlaygroundData[] = [
  // layout
  {
    type: 'group',
    name: 'Layout',
    description: 'Layout related properties',
    items: LayoutData,
  },
  // position
  {
    type: 'group',
    name: 'Position',
    description: 'Position offset properties',
    items: PositionData,
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
  // border
  {
    type: 'group',
    name: 'Border',
    description: 'Border related properties',
    items: BorderData,
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
