import type { ComplexStyleRule } from '@vanilla-extract/css';

import { l1Layer } from './layer.css';

export const map = <T extends Record<PropertyKey, unknown>, K>(
  record: T,
  map: (value: T[keyof T], key: keyof T) => K,
): Record<keyof T, K> => {
  return Object.entries(record)
    .map(([key, value]) => ({
      [key]: map(value as T[keyof T], key),
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as Record<keyof T, K>;
};

export const variant = <T extends string[]>(...values: T): { [Key in T[number]]: string } =>
  values.reduce(
    (acc, value) => ({
      ...acc,
      [value]: value,
    }),
    {} as { [Key in T[number]]: string },
  );

export const alpha = (color: string, alpha: number): string => {
  return `oklch(from ${color} l c h / ${alpha})`;
};

export const layered = (rules: ComplexStyleRule, layer = l1Layer): ComplexStyleRule => {
  if (Array.isArray(rules)) {
    return rules.map((rule) => (typeof rule === 'string' ? rule : layered(rule, layer))) as ComplexStyleRule;
  };

  return {
    '@layer': {
      [layer]: rules,
    },
  } satisfies ComplexStyleRule;
};
