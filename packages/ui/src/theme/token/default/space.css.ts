import { createThemeContract } from '@vanilla-extract/css';

export const DefaultSpace = {
  '-4': '0.1rem',
  '-3': '0.2rem',
  '-2': '0.4rem',
  '-1': '0.6rem',
  '0': '0.8rem',
  '1': '1.2rem',
  '2': '1.6rem',
  '3': '2.0rem',
  '4': '2.4rem',
  '5': '3.2rem',
  '6': '3.6rem',
  '7': '4.2rem',
  '8': '4.8rem',
  '9': '5.2rem',
};

export const SpaceToken = createThemeContract(DefaultSpace);
