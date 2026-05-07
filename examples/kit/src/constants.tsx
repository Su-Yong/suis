import { token, vars, SelectData, Box, SelectItemProps } from '@suis-ui/kit';

export const SizeOptions: SelectData[] = [
  {
    label: 'vars',
    options: Object.keys(vars.size.space).map((key) => ({
      value: key,
      label: key,
    })),
  },
  {
    label: 'token',
    options: Object.keys(token.size).map((key) => ({
      value: `token.${key}`,
      label: key,
    })),
  },
];

export const ColorOptions: SelectData[] = [
  ...Object.entries(vars.color).map(([parentKey, values]) => ({
    label: `${parentKey} - vars`,
    options: Object.keys(values).map((key) => ({
      value: `${parentKey}.${key}`,
      label: `${parentKey}.${key}`,
    })),
  })),
  ...Object.entries(token.color).map(([parentKey, values]) => ({
    label: `${parentKey} - token`,
    options: Object.keys(values).map((key) => ({
      value: `${parentKey}.${key}`,
      label: `${parentKey}.${key}`,
    })),
  })),
];
export const ColorSwatch = (itemProps: SelectItemProps) => (
  <Box
    w={'1.6rem'}
    h={'1.6rem'}
    r={'full'}
    bg={itemProps.value}
    bc={'text.caption'}
  >
  </Box>
);
