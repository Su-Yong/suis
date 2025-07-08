import { render } from 'solid-js/web';
import { ThemeProvider } from '@suis/ui';

import { App } from './App';

import '@suis/ui/style.css';

render(
  () => <ThemeProvider><App/></ThemeProvider>,
  document.querySelector('#app')!,
);