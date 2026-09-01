export const layers = {
  reset: 'suis-reset',
  global: 'suis-global',
  base: 'suis-base',
  component: 'suis-component',
  utility: 'suis-utility',
} as const;

export const defaultLayerOrder = [
  layers.reset,
  layers.global,
  layers.base,
  layers.component,
  layers.utility,
] as const;

export const resetLayer = layers.reset;
export const globalLayer = layers.global;
export const l0Layer = layers.base;
export const l1Layer = layers.component;
export const l2Layer = layers.utility;
