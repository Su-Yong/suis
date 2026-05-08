import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'SUIS',
  description: 'Solid UI System',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Guides', link: '/introduction' },
      { text: 'Kit', link: '/ui/box' },
      { text: 'Primitives', link: '/primitives/polymorphic' },
    ],
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Su-Yong/suis' },
    ],
    sidebar: [
      {
        text: 'Guides',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Design Principles', link: '/design-principles' },
          { text: 'Customization', link: '/customization' },
        ],
      },
      {
        text: '@suis-ui/kit',
        items: [
          { text: 'Box', link: '/ui/box' },
          { text: 'Button', link: '/ui/button' },
          { text: 'CheckBox', link: '/ui/checkbox' },
          { text: 'Input', link: '/ui/input' },
          { text: 'Item', link: '/ui/item' },
          { text: 'Popup', link: '/ui/popup' },
          { text: 'Select', link: '/ui/select' },
          { text: 'Tooltip', link: '/ui/tooltip' },
        ],
      },
      {
        text: '@suis-ui/primitives',
        items: [
          { text: 'Polymorphic', link: '/primitives/polymorphic' },
          { text: 'CheckBox', link: '/primitives/checkbox' },
          { text: 'FocusManager', link: '/primitives/focus-manager' },
          { text: 'Popup', link: '/primitives/popup' },
          { text: 'Select', link: '/primitives/select' },
          { text: 'Tooltip', link: '/primitives/tooltip' },
          { text: 'Helpers', link: '/primitives/helper' },
        ],
      },
      {
        text: 'Resources',
        items: [
          { text: 'llms.txt', link: '/llms.txt' },
        ],
      }
    ],
  },
});
