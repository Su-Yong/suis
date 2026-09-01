import { createThemeContract } from '@vanilla-extract/css';

export const DefaultTextSize = {
  '-3': '8px',
  '-2': '10px',
  '-1': '12px',
  '0': '14px',
  '1': '16px',
  '2': '18px',
  '3': '20px',
  '4': '24px',
  '5': '28px',
  '6': '32px',
  '7': '36px',
  '8': '42px',
  '9': '48px',
};

export const TextSizeToken = createThemeContract(DefaultTextSize);
