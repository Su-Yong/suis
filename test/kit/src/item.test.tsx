import { describe, expect, it } from 'vitest';
import { Item } from '@suis-ui/kit';

import { boxContractProps, expectBoxContract } from './box-props-contract';
import { renderScreen } from './test-utils';

describe('Item', () => {
  it('renders media, title, description, and action slots', async () => {
    const { screen } = renderScreen(() => (
      <Item
        media={<span aria-label="Media">M</span>}
        title="Project"
        description="Active"
        action={<button type="button">Open</button>}
      />
    ));

    await expect.element(screen.getByText('Project')).toBeInTheDocument();
    await expect.element(screen.getByText('Active')).toBeInTheDocument();
    await expect.element(screen.getByLabelText('Media')).toHaveTextContent('M');
    await expect.element(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('applies BoxProps to the item root', async () => {
    const { screen } = renderScreen(() => (
      <Item
        {...boxContractProps('item-contract')}
        title="Contract item"
        description="BoxProps"
      />
    ));

    await expectBoxContract(screen.getByTestId('item-contract'), { tagName: 'DIV' });
  });
});
