import { createThemeContract } from '@vanilla-extract/css';

export const DefaultZIndex = {
  '-3': '-100',
  '-2': '-10',
  '-1': '-1',
  '0': '0',
  '1': '10',
  '2': '100',
  '3': '110',
  '4': '120',
  '5': '130',
  '6': '140',
  '7': '150',
  '8': '200',
  '9': '1000',
};

export const ZIndexToken = createThemeContract(DefaultZIndex);
