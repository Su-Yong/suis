import type { JSX, ValidComponent } from 'solid-js';
import { expect } from 'vitest';
import type { Locator } from 'vitest/browser';
import type { BoxProps } from '@suis-ui/kit';

export const boxContractClass = 'box-contract-class';
export const boxContractClassList = 'box-contract-class-list';

type TestIdProp = {
  'data-testid': string;
};
type BoxContractProps<T extends ValidComponent> = Omit<BoxProps<T>, 'children'> & TestIdProp;

export const boxContractProps = <T extends ValidComponent = 'div'>(
  testId: string,
  label = `${testId} label`,
) => ({
  'data-testid': testId,
  class: boxContractClass,
  classList: {
    [boxContractClassList]: true,
    'box-contract-disabled-class': false,
  },
  style: {
    outline: '3px solid rgb(1, 2, 3)',
  },
  props: {
    'aria-label': label,
    'data-box-prop': 'forwarded',
  },
  w: '123px',
  h: '45px',
  minW: '80px',
  minH: '30px',
  maxW: '240px',
  maxH: '120px',
  flex: '0 0 auto',
  pos: 'absolute',
  top: '11px',
  left: '12px',
  z: 3,
  overflow: 'hidden',
	}) as unknown as BoxContractProps<T>;

type BoxContractOptions = {
  tagName?: string;
  label?: string;
  skipLayout?: boolean;
};

export const expectBoxContract = async (
  locator: Locator,
  { tagName, label, skipLayout = false }: BoxContractOptions = {},
) => {
  const element = locator.element();
  if (!(element instanceof HTMLElement)) {
    throw new Error('Expected locator to resolve to an HTMLElement.');
  }
  const computed = getComputedStyle(element);

  if (tagName) expect(element.tagName).toBe(tagName);

  await expect.element(locator).toHaveAttribute('aria-label', label ?? `${element.dataset.testid} label`);
  await expect.element(locator).toHaveAttribute('data-box-prop', 'forwarded');

  expect(element.classList.contains(boxContractClass)).toBe(true);
  expect(element.classList.contains(boxContractClassList)).toBe(true);
  expect(element.classList.contains('box-contract-disabled-class')).toBe(false);

  expect(computed.outlineStyle).toBe('solid');
  expect(computed.outlineWidth).toBe('3px');

  if (skipLayout) return;

  const styleAttribute = element.getAttribute('style') ?? '';
  expect(styleAttribute).toContain('123px');
  expect(styleAttribute).toContain('45px');
  expect(styleAttribute).toContain('80px');
  expect(styleAttribute).toContain('30px');
  expect(styleAttribute).toContain('240px');
  expect(styleAttribute).toContain('120px');
  expect(styleAttribute).toContain('0 0 auto');
  expect(styleAttribute).toContain('11px');
  expect(styleAttribute).toContain('12px');
};

export const boxTriggerProps = <T extends ValidComponent = 'button'>(testId: string) => ({
  'data-testid': testId,
  class: boxContractClass,
  classList: {
    [boxContractClassList]: true,
  },
  style: {
    outline: '3px solid rgb(1, 2, 3)',
  },
	}) as unknown as BoxContractProps<T>;

export const expectTriggerProps = async (locator: Locator) => {
  const element = locator.element();
  if (!(element instanceof HTMLElement)) {
    throw new Error('Expected locator to resolve to an HTMLElement.');
  }
  const computed = getComputedStyle(element);

  expect(element.classList.contains(boxContractClass)).toBe(true);
  expect(element.classList.contains(boxContractClassList)).toBe(true);
  expect(computed.outlineStyle).toBe('solid');
  expect(computed.outlineWidth).toBe('3px');
};

export const renderBoxContractChild = (testId: string): JSX.Element => (
  <span data-testid={`${testId}-child`}>
    Box contract child
  </span>
);
