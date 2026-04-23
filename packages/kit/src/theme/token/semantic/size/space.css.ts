import { DefaultSpace } from '../../default/space.css';
import { createThemeContract } from '@vanilla-extract/css';

export const DefaultSemanticSpace = {
  'none': '0',
  'xxs': DefaultSpace[-4],
  'xs': DefaultSpace[-3],
  'sm': DefaultSpace[-1],
  'md': DefaultSpace[0],
  'lg': DefaultSpace[1],
  'xl': DefaultSpace[3],
  'xxl': DefaultSpace[4],
  'full': '100%',
};

export const SemanticSpaceToken = createThemeContract(DefaultSemanticSpace);
