import { createThemeContract } from '@vanilla-extract/css';

import { DefaultColor } from '../../default/color.css';

export const DefaultText = {
  main: DefaultColor.gray[950],
  caption: DefaultColor.gray[400],
  disabled: DefaultColor.gray[300],
};

export const TextToken = createThemeContract(DefaultText);
