import { createThemeContract } from '@vanilla-extract/css';

import { DefaultSemanticSpace } from './space.css';
import { DefaultSemanticLine } from './line.css';

export const DefaultSemanticSize = {
  space: DefaultSemanticSpace,
  line: DefaultSemanticLine,
};

export const SemanticSizeToken = createThemeContract(DefaultSemanticSize);
