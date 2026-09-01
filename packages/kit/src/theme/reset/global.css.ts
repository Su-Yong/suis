import { globalStyle } from '@vanilla-extract/css';

import { globalLayer } from '../layer.css';
import { vars } from '../token/semantic/vars.css';

globalStyle('body', {
  '@layer': {
    [globalLayer]: {
      color: vars.color.text.main,
      fontFamily: 'var(--font-todo), -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      fontSize: '14px',
    },
  },
});

globalStyle('button, input, optgroup, select, textarea', {
  '@layer': {
    [globalLayer]: {
      font: 'inherit',
    },
  },
});
