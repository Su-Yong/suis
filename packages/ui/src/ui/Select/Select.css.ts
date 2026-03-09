import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

import { popupAnimation } from '../Popup/animation';
import { component } from '../component.css';

export const selectAnimation = popupAnimation({
  enter: {
    opacity: '0',
  },
  exit: {
    opacity: '0',
  },
});

export const triggerStyle = style({
  width: 'fit-content',
  minWidth: '20ch',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.size.space.xs,

  cursor: 'pointer',
  border: 'none',

  background: component.select.trigger.default.background,
  color: component.select.trigger.default.color,

  borderStyle: 'solid',
  borderWidth: component.select.trigger.default.borderWidth,
  borderColor: component.select.trigger.default.borderColor,
  borderRadius: component.select.trigger.default.borderRadius,

  boxShadow: component.select.trigger.default.boxShadow,

  paddingLeft: component.select.trigger.default.paddingX,
  paddingRight: component.select.trigger.default.paddingX,
  paddingTop: component.select.trigger.default.paddingY,
  paddingBottom: component.select.trigger.default.paddingY,

  ':hover': {
    background: component.select.trigger.hover.background,
    color: component.select.trigger.hover.color,

    borderStyle: 'solid',
    borderWidth: component.select.trigger.hover.borderWidth,
    borderColor: component.select.trigger.hover.borderColor,
  borderRadius: component.select.trigger.default.borderRadius,

    boxShadow: component.select.trigger.hover.boxShadow,
  },
  ':active': {
    background: component.select.trigger.active.background,
    color: component.select.trigger.active.color,

    borderStyle: 'solid',
    borderWidth: component.select.trigger.active.borderWidth,
    borderColor: component.select.trigger.active.borderColor,
  borderRadius: component.select.trigger.default.borderRadius,

    boxShadow: component.select.trigger.active.boxShadow,
  },
});

export const indicatorStyle = style({
  position: 'relative',

  width: component.select.indicator.size,
  height: component.select.indicator.size,

  transition: component.select.indicator.transition,

  selectors: {
    '&[data-open="true"]': {
      transform: component.select.indicator.transform,
    },
  }
});
