import { describe, expect, it } from 'vitest';
import { Polymorphic } from '@suis-ui/primitives';

import { renderScreen } from './test-utils';

describe('Polymorphic', () => {
  it('renders a div by default', async () => {
    const { screen } = renderScreen(() => (
      <Polymorphic data-testid="root">
        Default element
      </Polymorphic>
    ));

    await expect.element(screen.getByTestId('root')).toHaveTextContent('Default element');
    expect(screen.getByTestId('root').element().tagName).toBe('DIV');
  });

  it('renders a custom element and forwards attributes', async () => {
    const { screen } = renderScreen(() => (
      <Polymorphic as="button" type="button" aria-label="Save changes">
        Save
      </Polymorphic>
    ));

    const button = screen.getByRole('button', { name: 'Save changes' });
    await expect.element(button).toHaveAttribute('type', 'button');
    await expect.element(button).toHaveTextContent('Save');
  });
});
