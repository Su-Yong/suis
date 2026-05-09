import { createThemeContract } from '@vanilla-extract/css';

import { alpha } from '@/theme/util';
import { token } from '@/theme/token';

export const DefaultSemanticShadow = {
  none: 'none',
  xs: `0 ${token.size[-4]} ${token.size[-4]} 0 ${alpha(token.color.gray[700], 0.1)}`,
  sm: `0 ${token.size[-4]} ${token.size[-3]} 0 ${alpha(token.color.gray[900], 0.1)}`,
  md: `0 ${token.size[-3]} ${token.size[-2]} 0 ${alpha(token.color.gray[900], 0.1)}`,
  lg: `0 ${token.size[-2]} ${token.size[-1]} 0 ${alpha(token.color.gray[900], 0.1)}`,
  xl: `0 ${token.size[-2]} ${token.size[1]} 0 ${alpha(token.color.gray[900], 0.1)}`,
};

export const SemanticShadowToken = createThemeContract(DefaultSemanticShadow);
