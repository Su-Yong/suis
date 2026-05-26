import { createSignal, onMount } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { FocusManager } from '@suis-ui/primitives';

import { renderScreen } from './test-utils';

describe('FocusManager', () => {
  it('traps tab focus inside its child', async () => {
    const { screen } = renderScreen(() => (
      <FocusManager enable trap>
        <div>
          <button type="button">First</button>
          <button type="button">Second</button>
        </div>
      </FocusManager>
    ));

    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });

    first.element().focus();
    await userEvent.keyboard('{Tab}');

    await expect.element(second).toHaveFocus();
  });

  it('moves floating focus and triggers the active item', async () => {
    const onSelect = vi.fn();
    const { screen } = renderScreen(() => {
      let first!: HTMLButtonElement;
      let second!: HTMLButtonElement;
      const [floating, setFloating] = createSignal<HTMLElement[]>([]);

      onMount(() => setFloating([first, second]));

      return (
        <FocusManager
          enable
          floating={floating()}
          floatingMapper={(move, enter) => ({
            ArrowDown: () => move((index, max) => Math.min(index + 1, max - 1)),
            Enter: enter,
          })}
        >
          <div>
            <button ref={first} type="button">
              First
            </button>
            <button ref={second} type="button" onClick={onSelect}>
              Second
            </button>
          </div>
        </FocusManager>
      );
    });

    await expect.element(screen.getByRole('button', { name: 'First' })).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    await expect.element(screen.getByRole('button', { name: 'Second' })).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
