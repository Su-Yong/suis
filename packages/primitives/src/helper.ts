import { JSX } from 'solid-js/jsx-runtime';

type Maybe<T> = T | undefined | null;
type ClassListType = Record<string, boolean | undefined>;
type ClxObject = ClassListType | string;

export const cx = (...classNames: unknown[]): string => classNames.filter(Boolean).join(' ');
export const cl = (obj?: ClassListType): string => {
  if (!obj) return '';

  const result: string[] = [];

  Object.entries(obj).forEach(([className, value]) => {
    if (value) result.push(className);
  });

  return result.join(' ');
};
export const clx = (...clxObjects: Maybe<ClxObject>[]) =>
  clxObjects
    .map((clxObject) => {
      if (typeof clxObject === 'string') return clxObject;
      if (typeof clxObject === 'object' && clxObject) {
        return Object.entries(clxObject)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }

      return '';
    })
    .join(' ');

export const sx = <Element extends HTMLElement>(
  ...styles: JSX.HTMLAttributes<Element>['style'][]
): string => {
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
