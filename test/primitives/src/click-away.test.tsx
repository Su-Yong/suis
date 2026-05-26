import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { createClickAway } from '@suis-ui/primitives';

describe('createClickAway', () => {
  it('runs only for clicks outside the registered element', async () => {
    const onAway = vi.fn();
    const inside = document.createElement('button');
    const outside = document.createElement('button');
    inside.textContent = 'Inside';
    outside.textContent = 'Outside';
    document.body.append(inside, outside);

    const cleanup = createClickAway(() => onAway())(inside);

    await userEvent.click(inside);
    expect(onAway).not.toHaveBeenCalled();

    await userEvent.click(outside);
    expect(onAway).toHaveBeenCalledOnce();

    cleanup();
    await userEvent.click(outside);
    expect(onAway).toHaveBeenCalledOnce();
  });
});
