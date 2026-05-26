import { cleanup } from '@solidjs/testing-library';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
  document.body.replaceChildren();
  document.body.className = '';
});
