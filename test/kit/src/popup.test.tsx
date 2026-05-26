import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Popup } from '@suis-ui/kit';

import { boxContractProps, expectBoxContract } from './box-props-contract';
import { renderScreen } from './test-utils';

describe('Popup', () => {
  it('opens its element from the trigger', async () => {
    const { screen } = renderScreen(() => (
      <Popup element={<div role="dialog">Panel content</div>}>
        <button type="button">Open panel</button>
      </Popup>
    ));

    await userEvent.click(screen.getByRole('button', { name: 'Open panel' }));

    await expect.element(screen.getByRole('dialog')).toHaveTextContent('Panel content');
  });

  it('uses an anchor for controlled popups', async () => {
    const { screen } = renderScreen(() => (
      <Popup open element={<div role="dialog">Controlled panel</div>}>
        <button type="button">Anchor</button>
      </Popup>
    ));

    await expect.element(screen.getByRole('dialog')).toHaveTextContent('Controlled panel');
  });

  it('applies BoxProps to the popup presence element', async () => {
    const { screen } = renderScreen(() => (
      <Popup
        {...boxContractProps('popup-contract')}
        open
        element={<div role="dialog">Contract panel</div>}
      >
        <button type="button">Anchor</button>
      </Popup>
    ));

    await expectBoxContract(screen.getByTestId('popup-contract'), { skipLayout: true });
  });
});
