import { createThemeContract } from '@vanilla-extract/css';

export const DefaultSpace = {
  '-4': '0.2rem',
  '-3': '0.4rem',
  '-2': '0.6rem',
  '-1': '0.8rem',
  '0': '1.2rem',
  '1': '1.6rem',
  '2': '2.0rem',
  '3': '2.4rem',
  '4': '3.2rem',
  '5': '3.6rem',
  '6': '4.2rem',
  '7': '4.8rem',
  '8': '5.2rem',
  '9': '6.4rem',
};

export const SpaceToken = createThemeContract(DefaultSpace);
