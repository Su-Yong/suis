import { defineConfig } from 'vitepress';
import type { Plugin as VitePressPlugin } from 'vitepress';
import { fileURLToPath } from 'node:url';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import solid from 'vite-plugin-solid';
import llmstxt from 'vitepress-plugin-llms';

const repositoryUrl = 'https://github.com/Su-Yong/suis';

const stripDefaultLocale = (id: string) => (id.startsWith('en/') ? id.slice(3) : id);

const fromWorkspace = (path: string) => fileURLToPath(new URL(`../../${path}`, import.meta.url));

const nav = (prefix: string, labels: { guides: string; kit: string; primitives: string }) => [
  { text: labels.guides, link: `${prefix}/introduction` },
  { text: labels.kit, link: `${prefix}/kit/box` },
  { text: labels.primitives, link: `${prefix}/primitives/polymorphic` },
];

const sidebar = (
  prefix: string,
  labels: {
    guides: string;
    introduction: string;
    designPrinciples: string;
    customization: string;
  },
) => [
    {
      text: labels.guides,
      items: [
        { text: labels.introduction, link: `${prefix}/introduction` },
        { text: labels.designPrinciples, link: `${prefix}/design-principles` },
        { text: labels.customization, link: `${prefix}/customization` },
      ],
    },
    {
      text: '@suis-ui/kit',
      items: [
        { text: 'Box', link: `${prefix}/kit/box` },
        { text: 'Button', link: `${prefix}/kit/button` },
        { text: 'CheckBox', link: `${prefix}/kit/checkbox` },
        { text: 'Input', link: `${prefix}/kit/input` },
        { text: 'Item', link: `${prefix}/kit/item` },
        { text: 'Popup', link: `${prefix}/kit/popup` },
        { text: 'Select', link: `${prefix}/kit/select` },
        { text: 'Tooltip', link: `${prefix}/kit/tooltip` },
      ],
    },
    {
      text: '@suis-ui/primitives',
      items: [
        { text: 'Polymorphic', link: `${prefix}/primitives/polymorphic` },
        { text: 'CheckBox', link: `${prefix}/primitives/checkbox` },
        { text: 'FocusManager', link: `${prefix}/primitives/focus-manager` },
        { text: 'Popup', link: `${prefix}/primitives/popup` },
        { text: 'Select', link: `${prefix}/primitives/select` },
        { text: 'Tooltip', link: `${prefix}/primitives/tooltip` },
        { text: 'Helpers', link: `${prefix}/primitives/helper` },
      ],
    },
  ];

export default defineConfig({
  lang: 'en-US',
  title: 'SUIS',
  description: 'Solid UI System',
  base: '/suis/',
  cleanUrls: true,
  srcDir: 'src',
  rewrites: stripDefaultLocale,
  vite: {
    plugins: [
      llmstxt({
        excludeIndexPage: false,
        ignoreFiles: ['ko/**'],
        workDir: '.',
        // fix: llms plugin is not compatible with vitepress 2.0.0-alpha
      }) as unknown as VitePressPlugin,
      vanillaExtractPlugin({ unstable_mode: 'transform' }),
      solid({
        include: [
          /\.solid\.[tj]sx$/,
          /packages\/kit\/src\/.*\.tsx$/,
          /packages\/primitives\/src\/.*\.tsx$/,
        ],
      }),
    ],
    resolve: {
      alias: [
        { find: '@suis-ui/kit', replacement: fromWorkspace('packages/kit/src/ui/index.ts') },
        { find: '@suis-ui/primitives', replacement: fromWorkspace('packages/primitives/src/index.ts') },
        { find: '@', replacement: fromWorkspace('packages/kit/src') },
      ],
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: nav('', {
          guides: 'Guides',
          kit: 'Kit',
          primitives: 'Primitives',
        }),
        sidebar: sidebar('', {
          guides: 'Guides',
          introduction: 'Introduction',
          designPrinciples: 'Design Principles',
          customization: 'Customization',
        }),
      },
    },
    ko: {
      label: '한국어',
      lang: 'ko-KR',
      link: '/ko/',
      themeConfig: {
        nav: nav('/ko', {
          guides: '가이드',
          kit: 'Kit',
          primitives: 'Primitives',
        }),
        sidebar: sidebar('/ko', {
          guides: '가이드',
          introduction: '소개',
          designPrinciples: '디자인 원칙',
          customization: '커스터마이징',
        }),
      },
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: repositoryUrl },
    ],
  },
});
