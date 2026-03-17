import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

import { component } from '../component.css';

export const inputStyle = style({
  width: 'fit-content',
  minWidth: '20ch',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  border: 'none',

  background: component.input.default.background,
  color: component.input.default.color,

  borderStyle: 'solid',
  borderWidth: component.input.default.borderWidth,
  borderColor: component.input.default.borderColor,
  borderRadius: component.input.default.borderRadius,

  paddingLeft: component.input.default.paddingX,
  paddingRight: component.input.default.paddingX,
  paddingTop: component.input.default.paddingY,
  paddingBottom: component.input.default.paddingY,

  selectors: {
    '&:hover': {
      background: component.input.hover.background,
      color: component.input.hover.color,

      borderStyle: 'solid',
      borderWidth: component.input.hover.borderWidth,
      borderColor: component.input.hover.borderColor,
      borderRadius: component.input.default.borderRadius,
    },
    '&:active': {
      background: component.input.active.background,
      color: component.input.active.color,

      borderStyle: 'solid',
      borderWidth: component.input.active.borderWidth,
      borderColor: component.input.active.borderColor,
      borderRadius: component.input.default.borderRadius,
    },
    '&::placeholder': {
      color: component.input.placeholder.color,
    },
    '&::file-selector-button': {
      background: component.input.file.background,
      color: component.input.file.color,

      borderStyle: 'solid',
      borderWidth: component.input.file.borderWidth,
      borderColor: component.input.file.borderColor,
      borderRadius: component.input.file.borderRadius,

      paddingLeft: component.input.file.paddingX,
      paddingRight: component.input.file.paddingX,
      paddingTop: component.input.file.paddingY,
      paddingBottom: component.input.file.paddingY,

      margin: `calc(-1 * ${component.input.file.paddingY}) calc(-1 * ${component.input.file.paddingX})`,
      marginRight: vars.size.space.xs,
    },
  },
});
