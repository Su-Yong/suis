import { createThemeContract } from '@vanilla-extract/css';

import { DefaultSemanticSpace } from './space.css';
import { DefaultSemanticRound } from './round.css';
import { DefaultSemanticLine } from './line.css';

export const DefaultSemanticSize = {
  space: DefaultSemanticSpace,
  round: DefaultSemanticRound,
  line: DefaultSemanticLine,
};

export const SemanticSizeToken = createThemeContract(DefaultSemanticSize);
