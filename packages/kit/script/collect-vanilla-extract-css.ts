import {
  getSourceFromVirtualCssFile,
  virtualCssFileFilter,
} from '@vanilla-extract/integration';

type BundleItem =
  | {
    type: 'asset';
  }
  | {
    type: 'chunk';
    code: string;
  };

type OutputBundle = Record<string, BundleItem>;

type TransformContext = {
  parse: (input: string) => {
    body?: Array<{
      type?: string;
      start?: number;
      end?: number;
      source?: {
        value?: unknown;
      };
    }>;
  };
};

type GenerateBundleContext = {
  emitFile: (asset: {
    type: 'asset';
    fileName: string;
    source: string;
  }) => void;
};

const collectVirtualCss = async (id: string, cssById: Map<string, string>) => {
  if (!virtualCssFileFilter.test(id) || cssById.has(id)) {
    return;
  }

  const { source } = await getSourceFromVirtualCssFile(id);

  cssById.set(id, source);
};

export const collectVanillaExtractCss = ({
  fileName,
  emit = true,
}: {
  fileName?: string;
  emit?: boolean;
}) => {
  const cssById = new Map<string, string>();

  return {
    name: 'collect-vanilla-extract-css',
    buildStart() {
      cssById.clear();
    },
    async resolveId(id: string) {
      await collectVirtualCss(id, cssById);

      return null;
    },
    async load(id: string) {
      await collectVirtualCss(id, cssById);

      return null;
    },
    async transform(this: TransformContext, code: string) {
      if (!code.includes('.vanilla.css?source=')) {
        return null;
      }

      const ast = this.parse(code);
      const ranges: Array<[number, number]> = [];

      for (const node of ast.body ?? []) {
        if (node.type !== 'ImportDeclaration') {
          continue;
        }

        const id = node.source?.value;

        if (
          typeof id === 'string'
          && typeof node.start === 'number'
          && typeof node.end === 'number'
          && virtualCssFileFilter.test(id)
        ) {
          await collectVirtualCss(id, cssById);
          ranges.push([node.start, node.end]);
        }
      }

      if (ranges.length === 0) {
        return null;
      }

      let nextCode = '';
      let cursor = 0;

      for (const [start, end] of ranges) {
        nextCode += code.slice(cursor, start);
        cursor = end;
      }

      nextCode += code.slice(cursor);

      return {
        code: nextCode,
        map: {
          mappings: '',
        },
      };
    },
    async generateBundle(this: GenerateBundleContext, _options: unknown, bundle: OutputBundle) {
      for (const [assetName, item] of Object.entries(bundle)) {
        if (item.type === 'asset' && assetName.endsWith('.css')) {
          delete bundle[assetName];
        }
      }

      if (!emit || !fileName || cssById.size === 0) {
        return;
      }

      this.emitFile({
        type: 'asset',
        fileName,
        source: Array.from(cssById.values()).join('\n'),
      });
    },
  };
};
