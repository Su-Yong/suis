import { token, vars } from './token';

type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string | number})`;

type TokenColor = typeof token.color;
type TokenColorName = keyof TokenColor;
type TokenColorShades = keyof TokenColor[TokenColorName];
export type TokenColorMapKey = `${TokenColorName}.${TokenColorShades}`;
export type TokenColorMap = {
  [Key in TokenColorMapKey]: CSSVarFunction;
};

export const tokenColors = Object.entries(token.color)
  .flatMap(([path, palette]) =>
    Object.entries(palette).map(([key, value]) => ({
      [`${path}.${key}`]: value,
    })),
  )
  .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as TokenColorMap;

type VarsColorTheme = typeof vars.color;
type VarsColorName = keyof VarsColorTheme;
export type VarsColorMapKey = {
  [Key in VarsColorName]: `${Key}.${keyof VarsColorTheme[Key] extends string ? `${keyof VarsColorTheme[Key]}` : never}`;
}[VarsColorName];
export type VarsColorMap = {
  [Key in VarsColorMapKey]: CSSVarFunction;
};
export const varsColors = Object.entries(vars.color)
  .flatMap(([path, palette]) =>
    Object.entries(palette).map(([key, value]) => ({
      [`${path}.${key}`]: value,
    })),
  )
  .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as VarsColorMap;

export const colors = {
  ...tokenColors,
  ...varsColors,
};
