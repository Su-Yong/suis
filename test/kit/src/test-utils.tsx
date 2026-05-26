import { render } from '@solidjs/testing-library';
import type { JSX } from 'solid-js';
import { page } from 'vitest/browser';

export const renderScreen = (ui: () => JSX.Element) => {
  document.body.setAttribute('data-testid', 'render-root');
  const result = render(ui);

  return {
    ...result,
    screen: page.elementLocator(result.baseElement),
  };
};
