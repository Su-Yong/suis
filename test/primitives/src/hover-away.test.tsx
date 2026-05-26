import { describe, expect, it, vi } from 'vitest';
import { createHoverAway } from '@suis-ui/primitives';

describe('createHoverAway', () => {
  it('runs after pointer leaves and stops after cleanup', async () => {
    const onAway = vi.fn();
    const target = document.createElement('button');
    target.textContent = 'Hover target';
    document.body.append(target);

    const cleanup = createHoverAway(() => onAway())(target);

    target.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
    await vi.waitFor(() => expect(onAway).toHaveBeenCalledOnce());

    cleanup();
    target.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
    await new Promise((resolve) => window.setTimeout(resolve, 0));

    expect(onAway).toHaveBeenCalledOnce();
  });
});
