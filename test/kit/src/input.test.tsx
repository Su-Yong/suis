import { describe, expect, it } from 'vitest';
import { Input } from '@suis-ui/kit';

import { boxContractProps, expectBoxContract } from './box-props-contract';
import { renderScreen } from './test-utils';

describe('Input', () => {
  it('renders inputs and textareas', async () => {
    const { screen } = renderScreen(() => (
      <>
        <Input aria-label="Name" value="Su" readOnly />
        <Input as="textarea" aria-label="Bio" value="Solid UI" readOnly />
      </>
    ));

    await expect.element(screen.getByLabelText('Name')).toHaveValue('Su');
    await expect.element(screen.getByLabelText('Bio')).toHaveValue('Solid UI');
    expect(screen.getByLabelText('Bio').element().tagName).toBe('TEXTAREA');
  });

  it('applies BoxProps to input elements', async () => {
    const { screen } = renderScreen(() => (
      <Input
        {...boxContractProps<'input'>('input-contract')}
        value="Contract"
        readOnly
      />
    ));

    await expectBoxContract(screen.getByTestId('input-contract'), { tagName: 'INPUT' });
  });

  it('applies BoxProps to textarea elements', async () => {
    const { screen } = renderScreen(() => (
      <Input
        {...boxContractProps<'input'>('textarea-contract')}
        as="textarea"
        value="Contract"
        readOnly
      />
    ));

    await expectBoxContract(screen.getByTestId('textarea-contract'), { tagName: 'TEXTAREA' });
  });
});
