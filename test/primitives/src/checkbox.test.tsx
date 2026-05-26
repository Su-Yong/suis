import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { CheckBox } from '@suis-ui/primitives';

import { renderScreen } from './test-utils';

describe('CheckBox', () => {
  it('connects the label and indicator with the same id', async () => {
    const { screen } = renderScreen(() => (
      <CheckBox id="newsletter" rootId="newsletter-root" data-testid="newsletter-root">
        <CheckBox.Label>Newsletter</CheckBox.Label>
        <CheckBox.Indicator />
      </CheckBox>
    ));

    await expect.element(screen.getByTestId('newsletter-root')).toBeInTheDocument();
    await expect.element(screen.getByLabelText('Newsletter')).toHaveAttribute('id', 'newsletter');
    await expect.element(screen.getByText('Newsletter')).toHaveAttribute('for', 'newsletter');
  });

  it('forwards input state and change handlers', async () => {
    const onChange = vi.fn();
    const { screen } = renderScreen(() => (
      <CheckBox id="terms">
        <CheckBox.Label>Terms</CheckBox.Label>
        <CheckBox.Indicator checked={false} onChange={onChange} />
      </CheckBox>
    ));

    const input = screen.getByLabelText('Terms');
    await userEvent.click(input);

    expect(onChange).toHaveBeenCalledOnce();
    await expect.element(input).toBeChecked();
  });
});
