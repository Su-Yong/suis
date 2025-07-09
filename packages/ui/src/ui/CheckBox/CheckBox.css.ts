import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

import { component } from '../component.css';

export const inputStyle = style({});

export const containerStyle = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: vars.size.space.xs,

  cursor: 'pointer',
  userSelect: 'none',
});

export const indicatorStyle = style({
  position: 'relative',

  width: component.checkBox.indicator.size,
  height: component.checkBox.indicator.size,

  borderRadius: component.checkBox.indicator.size,
  borderStyle: 'solid',
  borderWidth: component.checkBox.indicator.borderWidth,
  borderColor: component.checkBox.indicator.borderColor,

  cursor: 'pointer',
  transition: component.checkBox.transition,

  selectors: {
    [`.${containerStyle} > .${inputStyle}:focus-visible + &`]: {
      outlineStyle: 'solid',
      outlineOffset: component.button.focus.offset,
      outlineColor: component.button.focus.color,
      outlineWidth: component.button.focus.width,
    },

    [`.${containerStyle} > .${inputStyle}:checked + &`]: {
      borderColor: component.checkBox.active,
      boxShadow: `0 0 0 calc(${component.checkBox.indicator.size} / 2) ${component.checkBox.active} inset`,
    },
    [`.${containerStyle} > .${inputStyle}:not(:checked) + &`]: {
      boxShadow: `0 0 0 0 transparent inset`,
    },

    [`.${containerStyle}:hover > .${inputStyle}:checked + &`]: {
      boxShadow: `0 0 0 calc(${component.checkBox.indicator.size} / 2) ${component.checkBox.active} inset, 0 0 0 calc(${component.checkBox.indicator.size} / 4) ${component.checkBox.indicator.hover}`,
    },
    [`.${containerStyle}:active > .${inputStyle}:checked + &`]: {
      boxShadow: `0 0 0 calc(${component.checkBox.indicator.size} / 2) ${component.checkBox.active} inset, 0 0 0 calc(${component.checkBox.indicator.size} / 4) ${component.checkBox.indicator.active}`,
    },

    [`.${containerStyle}:hover > .${inputStyle}:not(:checked) + &`]: {
      background: component.checkBox.indicator.hover,
    },
    [`.${containerStyle}:active > .${inputStyle}:not(:checked) + &`]: {
      background: component.checkBox.indicator.active,
    },
  }
});

export const checkStyle = style({
  position: 'absolute',
  top: '50%',
  left: '50%',

  width: component.checkBox.check.size,
  height: component.checkBox.check.size,

  color: component.checkBox.check.color,
  transform: 'translate(-50%, -50%)',
  userSelect: 'none',

  strokeDashoffset: '-23',
  strokeDasharray: '23',

  transition: component.checkBox.transition,

  selectors: {
    [`.${containerStyle}:hover &`]: {
      color: component.checkBox.check.hover,
    },
    [`.${containerStyle}:active &`]: {
      color: component.checkBox.check.active,
    },

    [`.${containerStyle}:has(.${inputStyle}:checked) &`]: {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',

      strokeDashoffset: '0',
    },
    [`.${containerStyle}:has(.${inputStyle}:not(:checked)) &`]: {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0.8)',

      strokeDashoffset: '-23',
    },
  },
});
