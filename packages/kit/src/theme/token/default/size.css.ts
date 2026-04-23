import { createThemeContract } from '@vanilla-extract/css';

export const DefaultSize = {
  '-3': '0.8rem',
  '-2': '1.0rem',
  '-1': '1.2rem',
  '0': '1.4rem',
  '1': '1.6rem',
  '2': '1.8rem',
  '3': '2.0rem',
  '4': '2.4rem',
  '5': '2.8rem',
  '6': '3.2rem',
  '7': '3.6rem',
  '8': '4.2rem',
  '9': '4.8rem',
}

export const SizeToken = createThemeContract(DefaultSize);
