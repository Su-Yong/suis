import type { ComplexStyleRule, StyleRule } from '@vanilla-extract/css';

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

export const layerWith = (...rules: ComplexStyleRule[]): ComplexStyleRule => {
  const isLayered = rules.every((rule): rule is { '@layer': Record<string, StyleRule> } => '@layer' in rule);
  if (!isLayered) throw new Error('All rules must be layered');

  const layerResult: Record<string, StyleRule> = {};

  rules.forEach((rule) => {
    Object.entries(rule['@layer']).forEach(([layer, style]) => {
      if (layer in layerResult) {
        layerResult[layer] = {
          ...layerResult[layer],
          ...style,
        };
      } else {
        layerResult[layer] = style;
      }
    });
  });

  return { '@layer': layerResult };
};
