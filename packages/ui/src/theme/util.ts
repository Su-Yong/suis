import type { JSX } from 'solid-js/jsx-runtime';
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

export const layered = (rules: ComplexStyleRule, layer = l1Layer) => {
  return {
    '@layer': {
      [layer]: rules,
    },
  } as ComplexStyleRule;
};

export const cl = (obj?: Record<string, boolean | undefined>): string => {
  if (!obj) return '';

  const result: string[] = [];

  Object.entries(obj).forEach(([className, value]) => {
    if (value) result.push(className);
  });

  return result.join(' ');
};

export const cx = (...classNames: unknown[]): string => classNames.filter(Boolean).join(' ');
export const sx = <Element extends HTMLElement>(...styles: JSX.HTMLAttributes<Element>['style'][]): string => {
  const result: string[] = [];

  styles.forEach((style) => {
    if (!style) return;

    if (typeof style === 'string') {
      result.push(style);
    } else if (Array.isArray(style)) {
      result.push(sx(...style));
    } else if (typeof style === 'object') {
      Object.keys(style).forEach((key) => {
        result.push(`${key}: ${style[key as keyof typeof style]}`);
      });
    }
  });

  return result.map((it) => (it[it.length - 1] === ';' ? it.trim() : `${it.trim()};`)).join('\n');
};
