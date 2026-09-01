import { createThemeContract } from '@vanilla-extract/css';

export const DefaultSize = {
  '-4': '2px',
  '-3': '4px',
  '-2': '6px',
  '-1': '8px',
  '0': '12px',
  '1': '16px',
  '2': '20px',
  '3': '24px',
  '4': '32px',
  '5': '36px',
  '6': '42px',
  '7': '48px',
  '8': '52px',
  '9': '64px',
};

export const SizeToken = createThemeContract(DefaultSize);
