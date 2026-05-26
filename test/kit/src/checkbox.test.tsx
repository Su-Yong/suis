import { createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { CheckBox, type CheckBoxIndicatorProps } from '@suis-ui/kit';

import { renderScreen } from './test-utils';

describe('CheckBox', () => {
  it('renders a labeled checkbox and reports checked changes', async () => {
    const onChecked = vi.fn();
    const { screen } = renderScreen(() => (
      <CheckBox
        id="kit-checkbox"
        name="Accept terms"
        checked={false}
        onChecked={onChecked}
      />
    ));

    const input = screen.getByLabelText('Accept terms');
    await expect.element(input).toHaveAttribute('id', 'kit-checkbox');

    await userEvent.click(screen.getByText('Accept terms'));
    expect(onChecked).toHaveBeenCalledWith(true);
  });

  it('applies labelProps, inputProps, and renderIndicator output', async () => {
    const { screen } = renderScreen(() => (
      <CheckBox
        id="custom-checkbox"
        name="Custom"
        checked
        inputProps={{
          'aria-describedby': 'checkbox-help',
          class: 'checkbox-input-class',
        }}
        labelProps={{
          class: 'checkbox-label-class',
        }}
        renderIndicator={(props: CheckBoxIndicatorProps) => (
          <span data-testid="custom-indicator" data-checked={props.checked}>
            Custom indicator
          </span>
        )}
      />
    ));

    const input = screen.getByLabelText('Custom');
    const label = input.element().closest('label');
    await expect.element(input).toHaveAttribute('aria-describedby', 'checkbox-help');
    expect(input.element().classList.contains('checkbox-input-class')).toBe(true);
    expect(label?.classList.contains('checkbox-label-class')).toBe(true);
    await expect.element(screen.getByTestId('custom-indicator')).toHaveAttribute('data-checked', 'true');
  });

  it('updates controlled checkbox values from state', async () => {
    const { screen } = renderScreen(() => {
      const [checked, setChecked] = createSignal(false);

      return (
        <>
          <CheckBox
            id="reactive-checkbox"
            name="Reactive"
            checked={checked()}
            onChecked={setChecked}
          />
          <span>{checked() ? 'Checked' : 'Unchecked'}</span>
        </>
      );
    });

    await expect.element(screen.getByText('Unchecked')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Reactive'));
    await expect.element(screen.getByText('Checked')).toBeInTheDocument();
  });
});
