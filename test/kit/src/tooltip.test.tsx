import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Box, Tooltip, type TooltipArrowProps } from '@suis-ui/kit';

import { boxContractProps, expectBoxContract } from './box-props-contract';
import { renderScreen } from './test-utils';

describe('Tooltip', () => {
  it('shows content and an arrow on hover', async () => {
    const { screen } = renderScreen(() => (
      <Tooltip content="Helpful details" withArrow>
        <button type="button">Help</button>
      </Tooltip>
    ));

    await userEvent.hover(screen.getByRole('button', { name: 'Help' }));

    await expect.element(screen.getByRole('tooltip')).toHaveTextContent('Helpful details');
  });

  it('applies BoxProps to tooltip content', async () => {
    const { screen } = renderScreen(() => (
      <Tooltip
        {...boxContractProps('tooltip-content')}
        content="Contract tooltip"
      >
        <button type="button">Contract help</button>
      </Tooltip>
    ));

    await userEvent.hover(screen.getByRole('button', { name: 'Contract help' }));

    await expectBoxContract(screen.getByTestId('tooltip-content'));
  });

  it('uses custom arrow renderers with forwarded props', async () => {
    const { screen } = renderScreen(() => (
      <Tooltip
        content="Arrow tooltip"
        withArrow
        renderArrow={(props: TooltipArrowProps<'div'>) => (
          <Box
            {...props}
            data-testid="tooltip-arrow"
            data-has-class={!!props.class}
          />
        )}
      >
        <button type="button">Arrow help</button>
      </Tooltip>
    ));

    await userEvent.hover(screen.getByRole('button', { name: 'Arrow help' }));

    await expect.element(screen.getByTestId('tooltip-arrow')).toHaveAttribute('data-has-class', 'true');
  });
});
