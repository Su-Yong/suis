import { createThemeContract } from '@vanilla-extract/css';

import { token } from '@/theme/token';

export const DefaultSemanticZIndex = {
  below: token.zIndex['-1'],
  base: token.zIndex[0],
  docked: token.zIndex[1],
  dropdown: token.zIndex[2],
  sticky: token.zIndex[3],
  overlay: token.zIndex[4],
  modal: token.zIndex[5],
  popover: token.zIndex[6],
  tooltip: token.zIndex[7],
  toast: token.zIndex[8],
};

export const SemanticZIndexToken = createThemeContract(DefaultSemanticZIndex);
