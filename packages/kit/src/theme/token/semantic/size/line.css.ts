import { createThemeContract } from '@vanilla-extract/css';

export const DefaultSemanticLine = {
  thin: '0.5px',
  md: '1px',
  thick: '2px',
};

export const SemanticLineToken = createThemeContract(DefaultSemanticLine);
