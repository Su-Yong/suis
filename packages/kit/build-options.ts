const externalPackages = [
  '@suis-ui/primitives',
  '@vanilla-extract/css',
  '@vanilla-extract/dynamic',
  '@vanilla-extract/recipes',
  '@vanilla-extract/sprinkles',
  'solid-js',
];

export const isExternal = (id: string) => (
  externalPackages.some((packageName) => id === packageName || id.startsWith(`${packageName}/`))
);

export const globals = (id: string) => ({
  '@suis-ui/primitives': 'SuisPrimitives',
  '@vanilla-extract/css': 'vanillaExtractCss',
  '@vanilla-extract/dynamic': 'vanillaExtractDynamic',
  '@vanilla-extract/recipes': 'vanillaExtractRecipes',
  '@vanilla-extract/recipes/createRuntimeFn': 'vanillaExtractRecipesCreateRuntimeFn',
  '@vanilla-extract/sprinkles': 'vanillaExtractSprinkles',
  'solid-js': 'Solid',
  'solid-js/web': 'SolidWeb',
}[id] ?? id);
