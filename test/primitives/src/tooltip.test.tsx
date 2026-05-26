import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Tooltip } from '@suis-ui/primitives';

import { renderScreen } from './test-utils';

describe('Tooltip', () => {
  it('connects trigger and content with aria-describedby', async () => {
    const { screen } = renderScreen(() => (
      <Tooltip open>
        <Tooltip.Trigger>
          <button type="button">Details</button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          More information
        </Tooltip.Content>
      </Tooltip>
    ));

    const trigger = screen.getByRole('button', { name: 'Details' });
    const tooltip = screen.getByRole('tooltip');

    await expect.element(tooltip).toHaveTextContent('More information');
    await expect.element(trigger).toHaveAttribute('aria-describedby', tooltip.element().id);
  });

  it('opens after pointer enter with the configured delay', async () => {
    const { screen } = renderScreen(() => (
      <Tooltip openDelay={0} closeDelay={0}>
        <Tooltip.Trigger>
          <button type="button">Hover details</button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          Hovered content
        </Tooltip.Content>
      </Tooltip>
    ));

    await userEvent.hover(screen.getByRole('button', { name: 'Hover details' }));

    await expect.element(screen.getByRole('tooltip')).toHaveTextContent('Hovered content');
  });
});
