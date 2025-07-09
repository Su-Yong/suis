import { DefaultSpace } from '../../default/space.css';
import { createThemeContract } from '@vanilla-extract/css';

export const DefaultSemanticSpace = {
  'none': '0',
  'xxs': DefaultSpace[-3],
  'xs': DefaultSpace[-2],
  'sm': DefaultSpace[-1],
  'md': DefaultSpace[0],
  'lg': DefaultSpace[1],
  'xl': DefaultSpace[2],
  'xxl': DefaultSpace[3],
  'full': '100%',
};

export const SemanticSpaceToken = createThemeContract(DefaultSemanticSpace);
