import { describe, expect, it, vi } from 'vitest';
import {
  Box,
  BoxPropList,
  BoxSizePropList,
  BoxStylePropList,
  ThemeProvider,
} from '@suis-ui/kit';

import { boxContractProps, expectBoxContract } from './box-props-contract';
import { renderScreen } from './test-utils';

describe('Box', () => {
  it('keeps the Box prop lists covered by tests', () => {
    expect(BoxStylePropList).toEqual([
      'pos',
      'direction',
      'justify',
      'align',
      'wrap',
      'gap',
      'p',
      'px',
      'py',
      'pt',
      'pb',
      'pl',
      'pr',
      'm',
      'mx',
      'my',
      'mt',
      'mb',
      'ml',
      'mr',
      'r',
      'tlr',
      'trr',
      'blr',
      'brr',
      'c',
      'bg',
      'bc',
      'bd',
      'bdl',
      'bdr',
      'bdt',
      'bdb',
      'blc',
      'brc',
      'btc',
      'bbc',
      'text',
      'shadow',
      'overflow',
    ]);
    expect(BoxSizePropList).toEqual([
      'w',
      'h',
      'minW',
      'minH',
      'maxW',
      'maxH',
      'flex',
      'top',
      'right',
      'bottom',
      'left',
      'z',
    ]);
    expect(BoxPropList).toEqual([...BoxStylePropList, ...BoxSizePropList]);
  });

  it('renders a polymorphic element and applies common BoxProps', async () => {
    const { screen } = renderScreen(() => (
      <Box
        {...boxContractProps('box-contract')}
        as="section"
      >
        Content
      </Box>
    ));

    const panel = screen.getByTestId('box-contract');
    await expectBoxContract(panel, { tagName: 'SECTION' });
    await expect.element(panel).toHaveTextContent('Content');
  });

  it('applies size props as computed styles on Box itself', async () => {
    const { screen } = renderScreen(() => (
      <Box
        data-testid="size-box"
        w="123px"
        h="45px"
        minW="80px"
        minH="30px"
        maxW="240px"
        maxH="120px"
        flex="0 0 auto"
        pos="absolute"
        top="11px"
        right="13px"
        bottom="14px"
        left="12px"
        z={3}
      />
    ));

    const style = getComputedStyle(screen.getByTestId('size-box').element());
    expect(style.width).toBe('123px');
    expect(style.height).toBe('45px');
    expect(style.minWidth).toBe('80px');
    expect(style.minHeight).toBe('30px');
    expect(style.maxWidth).toBe('240px');
    expect(style.maxHeight).toBe('120px');
    expect(style.flex).toBe('0 0 auto');
    expect(style.position).toBe('absolute');
    expect(style.top).toBe('11px');
    expect(style.right).toBe('13px');
    expect(style.bottom).toBe('14px');
    expect(style.left).toBe('12px');
    expect(style.zIndex).toBe('3');
  });

  it('applies layout props', async () => {
    const { screen } = renderScreen(() => (
      <ThemeProvider>
        <Box
          data-testid="layout-box"
          pos="fixed"
          direction="row"
          justify="center"
          align="flex-end"
          wrap="wrap"
          gap="none"
        />
      </ThemeProvider>
    ));

    await vi.waitFor(() => expect(document.body.classList.length).toBeGreaterThan(0));

    const style = getComputedStyle(screen.getByTestId('layout-box').element());
    expect(style.position).toBe('fixed');
    expect(style.flexDirection).toBe('row');
    expect(style.justifyContent).toBe('center');
    expect(style.alignItems).toBe('flex-end');
    expect(style.flexWrap).toBe('wrap');
    expect(style.gap).toBe('0px');
  });

  it('applies spacing props independently', async () => {
    const { screen } = renderScreen(() => (
      <ThemeProvider>
        <Box data-testid="padding-all" p="none" />
        <Box data-testid="padding-x" px="none" />
        <Box data-testid="padding-y" py="none" />
        <Box data-testid="padding-sides" pt="none" pb="none" pl="none" pr="none" />
        <Box data-testid="margin-all" m="none" />
        <Box data-testid="margin-x" mx="none" />
        <Box data-testid="margin-y" my="none" />
        <Box data-testid="margin-sides" mt="none" mb="none" ml="none" mr="none" />
      </ThemeProvider>
    ));

    await vi.waitFor(() => expect(document.body.classList.length).toBeGreaterThan(0));

    expect(getComputedStyle(screen.getByTestId('padding-all').element()).paddingTop).toBe('0px');
    expect(getComputedStyle(screen.getByTestId('padding-x').element()).paddingLeft).toBe('0px');
    expect(getComputedStyle(screen.getByTestId('padding-y').element()).paddingBottom).toBe('0px');
    expect(getComputedStyle(screen.getByTestId('padding-sides').element()).paddingRight).toBe('0px');
    expect(getComputedStyle(screen.getByTestId('margin-all').element()).marginTop).toBe('0px');
    expect(getComputedStyle(screen.getByTestId('margin-x').element()).marginRight).toBe('0px');
    expect(getComputedStyle(screen.getByTestId('margin-y').element()).marginBottom).toBe('0px');
    expect(getComputedStyle(screen.getByTestId('margin-sides').element()).marginLeft).toBe('0px');
  });

  it('applies radius, color, border, text, shadow, and overflow props', async () => {
    const { screen } = renderScreen(() => (
      <ThemeProvider>
        <Box data-testid="radius-all" r="none" />
        <Box data-testid="radius-corners" tlr="none" trr="none" blr="none" brr="none" />
        <Box data-testid="colors" c="transparent" bg="transparent" />
        <Box data-testid="border-all" bd="md" bc="transparent" />
        <Box data-testid="border-sides" bdl="md" bdr="md" bdt="md" bdb="md" blc="transparent" brc="transparent" btc="transparent" bbc="transparent" />
        <Box data-testid="text-shadow-overflow" text="body" shadow="none" overflow="hidden" />
        <Box data-testid="overflow-x" overflow="xHidden" />
        <Box data-testid="overflow-y" overflow="yHidden" />
      </ThemeProvider>
    ));

    await vi.waitFor(() => expect(document.body.classList.length).toBeGreaterThan(0));

    expect(getComputedStyle(screen.getByTestId('radius-all').element()).borderRadius).toBe('0px');
    expect(getComputedStyle(screen.getByTestId('radius-corners').element()).borderTopLeftRadius).toBe('0px');
    expect(getComputedStyle(screen.getByTestId('colors').element()).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(getComputedStyle(screen.getByTestId('border-all').element()).borderTopWidth).toBe('1px');
    expect(getComputedStyle(screen.getByTestId('border-sides').element()).borderLeftWidth).toBe('1px');
    expect(getComputedStyle(screen.getByTestId('text-shadow-overflow').element()).fontWeight).toBe('400');
    expect(getComputedStyle(screen.getByTestId('text-shadow-overflow').element()).boxShadow).toBe('none');
    expect(getComputedStyle(screen.getByTestId('text-shadow-overflow').element()).overflow).toBe('hidden');
    expect(getComputedStyle(screen.getByTestId('overflow-x').element()).overflowX).toBe('hidden');
    expect(getComputedStyle(screen.getByTestId('overflow-y').element()).overflowY).toBe('hidden');
  });
});
