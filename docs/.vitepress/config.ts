import { existsSync, readdirSync } from 'node:fs';
import { join as pathJoin, posix } from 'node:path';
import { defineVersionedConfig } from '@viteplus/versions';

const repositoryUrl = 'https://github.com/Su-Yong/suis';
const siteBase = '/suis/';

const currentVersion = 'v0.1';
const enCurrent = `/en/${currentVersion}`;
const koCurrent = `/ko/${currentVersion}`;

const getArchivedVersions = () => {
  const versionsPath = pathJoin(process.cwd(), 'versions');

  if (!existsSync(versionsPath)) {
    return [];
  }

  return readdirSync(versionsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse();
};

const archivedVersions = getArchivedVersions();

const createVersionNav = (locale: string) => ({
  text: 'Version',
  skipVersioning: true,
  items: [
    { text: `${currentVersion} (latest)`, link: `/${locale}/${currentVersion}/`, skipVersioning: true },
    ...archivedVersions
      .filter((version) => version !== currentVersion)
      .map((version) => ({ text: version, link: `/${locale}/${version}/`, skipVersioning: true })),
  ],
});

const createNav = (locale: string, prefix: string, labels: { guides: string; kit: string; primitives: string }) => [
  { text: labels.guides, link: `${prefix}/introduction`, skipVersioning: true },
  { text: labels.kit, link: `${prefix}/ui/box`, skipVersioning: true },
  { text: labels.primitives, link: `${prefix}/primitives/polymorphic`, skipVersioning: true },
  createVersionNav(locale),
];

const createSidebar = (
  prefix: string,
  labels: {
    guides: string;
    introduction: string;
    designPrinciples: string;
    customization: string;
    resources: string;
  },
) => [
  {
    text: labels.guides,
    skipVersioning: true,
    items: [
      { text: labels.introduction, link: `${prefix}/introduction`, skipVersioning: true },
      { text: labels.designPrinciples, link: `${prefix}/design-principles`, skipVersioning: true },
      { text: labels.customization, link: `${prefix}/customization`, skipVersioning: true },
    ],
  },
  {
    text: '@suis-ui/kit',
    skipVersioning: true,
    items: [
      { text: 'Box', link: `${prefix}/ui/box`, skipVersioning: true },
      { text: 'Button', link: `${prefix}/ui/button`, skipVersioning: true },
      { text: 'CheckBox', link: `${prefix}/ui/checkbox`, skipVersioning: true },
      { text: 'Input', link: `${prefix}/ui/input`, skipVersioning: true },
      { text: 'Item', link: `${prefix}/ui/item`, skipVersioning: true },
      { text: 'Popup', link: `${prefix}/ui/popup`, skipVersioning: true },
      { text: 'Select', link: `${prefix}/ui/select`, skipVersioning: true },
      { text: 'Tooltip', link: `${prefix}/ui/tooltip`, skipVersioning: true },
    ],
  },
  {
    text: '@suis-ui/primitives',
    skipVersioning: true,
    items: [
      { text: 'Polymorphic', link: `${prefix}/primitives/polymorphic`, skipVersioning: true },
      { text: 'CheckBox', link: `${prefix}/primitives/checkbox`, skipVersioning: true },
      { text: 'FocusManager', link: `${prefix}/primitives/focus-manager`, skipVersioning: true },
      { text: 'Popup', link: `${prefix}/primitives/popup`, skipVersioning: true },
      { text: 'Select', link: `${prefix}/primitives/select`, skipVersioning: true },
      { text: 'Tooltip', link: `${prefix}/primitives/tooltip`, skipVersioning: true },
      { text: 'Helpers', link: `${prefix}/primitives/helper`, skipVersioning: true },
    ],
  },
  {
    text: labels.resources,
    skipVersioning: true,
    items: [
      { text: 'llms.txt', link: `${siteBase}llms.txt`, skipVersioning: true },
    ],
  },
];

const config = defineVersionedConfig({
  lang: 'en-US',
  title: 'SUIS',
  description: 'Solid UI System',
  base: siteBase,
  cleanUrls: true,
  versionsConfig: {
    current: currentVersion,
    sources: 'src',
    archive: 'versions',
    hooks: {
      rewritesHook: (source, version, locale) => {
        const language = locale || 'en';
        const targetVersion = version || currentVersion;

        return posix.join(language, targetVersion, source);
      },
    },
    versionSwitcher: false,
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: createNav('en', enCurrent, {
          guides: 'Guides',
          kit: 'Kit',
          primitives: 'Primitives',
        }),
        sidebar: createSidebar(enCurrent, {
          guides: 'Guides',
          introduction: 'Introduction',
          designPrinciples: 'Design Principles',
          customization: 'Customization',
          resources: 'Resources',
        }),
      },
    },
    ko: {
      label: '한국어',
      lang: 'ko-KR',
      themeConfig: {
        nav: createNav('ko', koCurrent, {
          guides: '가이드',
          kit: 'Kit',
          primitives: 'Primitives',
        }),
        sidebar: createSidebar(koCurrent, {
          guides: '가이드',
          introduction: '소개',
          designPrinciples: '디자인 원칙',
          customization: '커스터마이징',
          resources: '리소스',
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

config.locales.root.link = `${enCurrent}/`;
config.locales.ko.link = `${koCurrent}/`;

export default config;
