import { describe, expect, it } from 'vitest';
import { Button } from '@suis-ui/kit';

import { boxContractProps, expectBoxContract } from './box-props-contract';
import { renderScreen } from './test-utils';

describe('Button', () => {
  it('renders as a button by default', async () => {
    const { screen } = renderScreen(() => (
      <Button variant="primary" size="sm">
        Save
      </Button>
    ));

    const button = screen.getByRole('button', { name: 'Save' });
    await expect.element(button).toBeInTheDocument();
    expect(button.element().className.length).toBeGreaterThan(0);
  });

  it('renders a custom element when requested', async () => {
    const { screen } = renderScreen(() => (
      <Button as="a" href="/settings">
        Settings
      </Button>
    ));

    await expect.element(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('href', '/settings');
  });

  it('applies BoxProps to the rendered element', async () => {
    const { screen } = renderScreen(() => (
      <Button {...boxContractProps('button-contract')}>
        Contract button
      </Button>
    ));

    await expectBoxContract(screen.getByTestId('button-contract'), { tagName: 'BUTTON' });
  });
});
