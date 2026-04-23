import { token, vars } from './token';

type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string | number})`;

type TokenSpace = typeof token.space;
export type TokenSpaceMapKey = `token.${keyof TokenSpace}`;
export type TokenSpaceMap = {
  [Key in TokenSpaceMapKey]: CSSVarFunction;
};

export const tokenSpaces = Object.entries(token.space)
  .reduce((acc, [key, value]) => ({ ...acc, [`token.${key}`]: value }), {}) as TokenSpaceMap;

type VarsSpace = typeof vars.size.space;
export type VarsSpaceMapKey = keyof VarsSpace;
export type VarsSpaceMap = {
  [Key in VarsSpaceMapKey]: CSSVarFunction;
};

export const varsSpaces = Object.entries(vars.size.space)
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) as VarsSpaceMap;

export const spaces = {
  ...tokenSpaces,
  ...varsSpaces,
};
