import { render } from 'solid-js/web';
import { ThemeProvider } from '@suis-ui/kit';

import { App } from './app';

import '@suis-ui/kit/style.css';
import '@suis-ui/kit/reset.css';
import '@suis-ui/kit/global.css';

render(
  () => (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  ),
  document.querySelector('#app')!,
);
