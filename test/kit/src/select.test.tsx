import type { JSX, ValidComponent } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import {
  Box,
  Button,
  Select,
  type ButtonProps,
  type SelectCheckIndicatorProps,
  type SelectContentProps,
  type SelectGroupProps,
  type SelectIndicatorProps,
  type SelectItemProps,
} from '@suis-ui/kit';

import {
  boxContractProps,
  boxTriggerProps,
  expectBoxContract,
  expectTriggerProps,
} from './box-props-contract';
import { renderScreen } from './test-utils';

const renderSelectIndicator = <T extends ValidComponent,>(props: SelectIndicatorProps<T>): JSX.Element => (
  <Box {...(props as unknown as SelectIndicatorProps<'div'>)}>
    Indicator
  </Box>
);

const renderSelectContent = <T extends ValidComponent,>(props: SelectContentProps<T>): JSX.Element => (
  <Box {...(props as unknown as SelectContentProps<'div'>)}>
    {props.children}
  </Box>
);

const renderSelectGroup = <T extends ValidComponent,>(props: SelectGroupProps<T>): JSX.Element => (
  <Box {...(props as unknown as SelectGroupProps<'div'>)}>
    {props.children}
  </Box>
);

const renderSelectCheckIndicator = <T extends ValidComponent,>(props: SelectCheckIndicatorProps<T>): JSX.Element => (
  <Box {...(props as unknown as SelectCheckIndicatorProps<'div'>)}>
    Checked
  </Box>
);

const renderSelectItem = <T extends ValidComponent,>(props: SelectItemProps<T>): JSX.Element => {
  const {
    selected: _selected,
    renderCheckIndicator: _renderCheckIndicator,
    checkIndicatorProps: _checkIndicatorProps,
    ...buttonProps
  } = props as unknown as SelectItemProps<'button'>;

  return (
    <Button {...(buttonProps as ButtonProps<'button'>)}>
      {props.children}
    </Button>
  );
};

describe('Select', () => {
  it('renders placeholder, grouped content, and updates selected values', async () => {
    const changes: (string | null)[] = [];
    const { screen } = renderScreen(() => (
      <Select
        open
        data-testid="kit-select-trigger"
        placeholder="Pick one"
        data={[
          'Alpha',
          { value: 'beta', label: 'Beta' },
          { label: 'Group', options: ['Gamma'] },
        ]}
        onChangeValue={(value: string | null) => changes.push(value)}
      />
    ));

    await expect.element(screen.getByTestId('kit-select-trigger')).toHaveTextContent('Pick one');
    await expect.element(screen.getByText('Group')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('option', { name: /Beta/ }));

    await expect.element(screen.getByTestId('kit-select-trigger')).toHaveTextContent('beta');
    expect(changes).toContain('beta');
  });

  it('applies trigger props', async () => {
    const { screen } = renderScreen(() => (
      <Select
        {...boxTriggerProps<'button'>('select-trigger')}
        open
        placeholder="Pick"
        data={['alpha']}
      />
    ));

    await expectTriggerProps(screen.getByTestId('select-trigger'));
  });

  it('uses render hooks and matching props', async () => {
    const { screen } = renderScreen(() => (
      <Select
        open
        value="alpha"
        data={[
          { label: 'Group', options: ['alpha'] },
        ]}
        renderValue={(value: unknown) => <span data-testid="rendered-value">Value: {String(value)}</span>}
        renderIndicator={renderSelectIndicator}
        renderContent={renderSelectContent}
        renderGroup={renderSelectGroup}
        renderCheckIndicator={renderSelectCheckIndicator}
        indicatorProps={boxContractProps<'div'>('select-indicator') as unknown as SelectIndicatorProps<ValidComponent>}
        contentProps={boxContractProps('select-content')}
        groupProps={boxContractProps('select-group')}
        checkIndicatorProps={boxContractProps('select-check-indicator')}
      />
    ));

    await expect.element(screen.getByTestId('rendered-value')).toHaveTextContent('Value: alpha');
    await expectBoxContract(screen.getByTestId('select-indicator'));
    await expectBoxContract(screen.getByTestId('select-content'));
    await expectBoxContract(screen.getByTestId('select-group'));
    await expectBoxContract(screen.getByTestId('select-check-indicator'));
    await expect.element(screen.getByTestId('select-check-indicator')).toHaveTextContent('Checked');
  });

  it('uses custom item renderers with itemProps', async () => {
    const { screen } = renderScreen(() => (
      <Select
        open
        data={['alpha']}
        renderItem={renderSelectItem}
        itemProps={boxContractProps('select-item') as unknown as SelectItemProps<ValidComponent>}
      />
    ));

    await expectBoxContract(screen.getByTestId('select-item'));
    await expect.element(screen.getByTestId('select-item')).toHaveTextContent('alpha');
  });
});
