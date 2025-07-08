import { createThemeContract } from '@vanilla-extract/css';

import { DefaultPrimary, PrimaryToken } from './primary.css';
import { DefaultSecondary, SecondaryToken } from './secondary.css';
import { DefaultSurface, SurfaceToken } from './surface.css';
import { DefaultText, TextToken } from './text.css';
import { DefaultError, ErrorToken } from './error.css';
import { DefaultSuccess, SuccessToken } from './success.css';
import { DefaultWarn, WarnToken } from './warn.css';

export const DefaultSemanticColor = {
  primary: DefaultPrimary,
  secondary: DefaultSecondary,
  surface: DefaultSurface,
  text: DefaultText,
  error: DefaultError,
  warn: DefaultWarn,
  success: DefaultSuccess,
};

export const SemanticColorToken = createThemeContract({
  primary: PrimaryToken,
  secondary: SecondaryToken,
  surface: SurfaceToken,
  text: TextToken,
  error: ErrorToken,
  warn: WarnToken,
  success: SuccessToken,
});
