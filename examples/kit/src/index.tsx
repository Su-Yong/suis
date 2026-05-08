import { render } from 'solid-js/web';
import { ThemeProvider } from '@suis-ui/kit';

import { App } from './app';

import '@suis-ui/kit/style.css';

render(
  () => (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  ),
  document.querySelector('#app')!,
);