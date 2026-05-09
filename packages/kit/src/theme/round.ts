import { vars } from './token';

type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string | number})`;

type VarsRound = typeof vars.size.round;
export type VarsRoundMapKey = keyof VarsRound;
export type VarsRoundMap = {
  [Key in VarsRoundMapKey]: CSSVarFunction;
};

export const rounds = Object.entries(vars.size.round)
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) as VarsRoundMap;
