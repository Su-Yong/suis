import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Popup } from '@suis-ui/primitives';

import { renderScreen } from './test-utils';

describe('Popup', () => {
  it('opens content from the trigger', async () => {
    const { screen } = renderScreen(() => (
      <Popup>
        <Popup.Trigger>
          <button type="button">Open menu</button>
        </Popup.Trigger>
        <Popup.Element>
          {(style) => (
            <div role="menu" style={style()}>
              Popup content
            </div>
          )}
        </Popup.Element>
      </Popup>
    ));

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const menu = screen.getByRole('menu');
    await expect.element(menu).toHaveTextContent('Popup content');
    await expect.element(menu).toHaveStyle({ position: 'absolute' });
  });

  it('mounts controlled content', async () => {
    const { screen } = renderScreen(() => (
      <Popup open>
        <Popup.Anchor>
          <button type="button">Anchor</button>
        </Popup.Anchor>
        <Popup.Element>
          {(style) => (
            <div role="dialog" style={style()}>
              Controlled popup
            </div>
          )}
        </Popup.Element>
      </Popup>
    ));

    await expect.element(screen.getByRole('dialog')).toHaveTextContent('Controlled popup');
  });
});
