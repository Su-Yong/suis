import { DefaultSize } from '../../default/size.css';
import { createThemeContract } from '@vanilla-extract/css';

export const DefaultSemanticRound = {
  'none': '0',
  'xxs': DefaultSize[-4],
  'xs': DefaultSize[-3],
  'sm': DefaultSize[-1],
  'md': DefaultSize[0],
  'lg': DefaultSize[1],
  'xl': DefaultSize[3],
  'xxl': DefaultSize[4],
  'full': '100%',
};

export const SemanticRoundToken = createThemeContract(DefaultSemanticRound);
