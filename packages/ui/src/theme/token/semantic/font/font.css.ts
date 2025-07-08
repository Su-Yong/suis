import { createThemeContract } from '@vanilla-extract/css';

import { DefaultH1, H1Token } from './h1.css';
import { DefaultH2, H2Token } from './h2.css';
import { DefaultH3, H3Token } from './h3.css';
import { DefaultTitle, TitleToken } from './title.css';
import { BodyToken, DefaultBody } from './body.css';
import { CaptionToken, DefaultCaption } from './caption.css';

export const DefaultSemanticFont = {
  h1: DefaultH1,
  h2: DefaultH2,
  h3: DefaultH3,
  title: DefaultTitle,
  body: DefaultBody,
  caption: DefaultCaption,
};

export const SemanticFontToken = createThemeContract({
  h1: H1Token,
  h2: H2Token,
  h3: H3Token,
  title: TitleToken,
  body: BodyToken,
  caption: CaptionToken,
});
