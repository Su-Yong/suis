import { onMount } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { createTheme, ThemeProvider, useTheme } from '@suis-ui/kit';

import { renderScreen } from './test-utils';

describe('ThemeProvider', () => {
  it('mounts default theme classes on the body', async () => {
    renderScreen(() => (
      <ThemeProvider>
        <span>Theme child</span>
      </ThemeProvider>
    ));

    await vi.waitFor(() => expect(document.body.classList.length).toBeGreaterThan(0));
  });

  it('applies custom theme class names from context', async () => {
    const ThemeConsumer = () => {
      const [, setTheme] = useTheme();

      onMount(() => setTheme('custom-theme'));

      return <span>Theme consumer</span>;
    };

    renderScreen(() => (
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    ));

    await vi.waitFor(() => expect(document.body.classList.contains('custom-theme')).toBe(true));
  });

  it('creates mountable theme style elements', () => {
    const [className, mount] = createTheme({});
    const cleanup = mount();

    expect(className).toMatch(/^suis-theme-/);
    expect(document.body.querySelector('style')?.textContent).toContain(`.${className}`);

    cleanup();
    expect(document.body.querySelector('style')).toBeNull();
  });
});
