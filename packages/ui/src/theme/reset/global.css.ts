import { globalStyle } from '@vanilla-extract/css';

import { resetLayer } from '../layer.css';

globalStyle('html, body, #root', {
  '@layer': {
    [resetLayer]: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    },
  },
});

globalStyle('html', {
  '@layer': {
    [resetLayer]: {
      fontSize: '10px',
    },
  },
});

globalStyle(':where(*)', {
  '@layer': {
    [resetLayer]: {
      fontFamily: 'var(--font-todo), -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      fontSize: '1.4rem',
    },
  },
});
