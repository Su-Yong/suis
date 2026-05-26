import { createSignal } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Select } from '@suis-ui/primitives';

import { renderScreen } from './test-utils';

describe('Select', () => {
  it('renders a value and updates selection from an item click', async () => {
    const changes: (string | null)[] = [];
    const { screen } = renderScreen(() => (
      <Select open onChangeValue={(value) => changes.push(value)}>
        <Select.Trigger>
          Choose option
        </Select.Trigger>
        <Select.Value>
          {(value) => <span data-testid="select-value">{value ?? 'No value'}</span>}
        </Select.Value>
        <Select.Content>
          <Select.Item value="alpha">Alpha</Select.Item>
          <Select.Item value="beta">Beta</Select.Item>
        </Select.Content>
      </Select>
    ));

    await expect.element(screen.getByTestId('select-value')).toHaveTextContent('No value');

    const beta = screen.getByRole('option', { name: 'Beta' });
    await userEvent.click(beta);

    await expect.element(screen.getByTestId('select-value')).toHaveTextContent('beta');
    await expect.element(beta).toHaveAttribute('aria-selected', 'true');
    expect(changes).toContain('beta');
  });

  it('updates controlled values', async () => {
    const { screen } = renderScreen(() => {
      const [value, setValue] = createSignal<string | null>('alpha');

      return (
        <Select open value={value()} onChangeValue={setValue}>
          <Select.Trigger>
            Choose
          </Select.Trigger>
          <Select.Value>
            {(current) => <span data-testid="controlled-select-value">{current ?? 'Empty'}</span>}
          </Select.Value>
          <Select.Content>
            <Select.Item value="alpha">Alpha</Select.Item>
            <Select.Item value="beta">Beta</Select.Item>
          </Select.Content>
        </Select>
      );
    });

    await expect.element(screen.getByTestId('controlled-select-value')).toHaveTextContent('alpha');
    await userEvent.click(screen.getByRole('option', { name: 'Beta' }));
    await expect.element(screen.getByTestId('controlled-select-value')).toHaveTextContent('beta');
  });
});
