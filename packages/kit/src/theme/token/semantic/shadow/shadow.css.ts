import { createThemeContract } from '@vanilla-extract/css';

import { alpha } from '@/theme/util';
import { token } from '@/theme/token';

export const DefaultSemanticShadow = {
  none: 'none',
  xs: `0 ${token.space[-4]} ${token.space[-4]} 0 ${alpha(token.color.gray[700], 0.1)}`,
  sm: `0 ${token.space[-4]} ${token.space[-3]} 0 ${alpha(token.color.gray[900], 0.1)}`,
  md: `0 ${token.space[-3]} ${token.space[-2]} 0 ${alpha(token.color.gray[900], 0.1)}`,
  lg: `0 ${token.space[-2]} ${token.space[-1]} 0 ${alpha(token.color.gray[900], 0.1)}`,
  xl: `0 ${token.space[-2]} ${token.space[1]} 0 ${alpha(token.color.gray[900], 0.1)}`,
};

export const SemanticShadowToken = createThemeContract(DefaultSemanticShadow);
