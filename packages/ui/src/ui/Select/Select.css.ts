import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

import { popupAnimation } from '../Popup/animation';
import { component } from '../component.css';

export const selectAnimation = popupAnimation({
  enter: {
    opacity: '0',
    transform: `scale(0.5)`,
  },
  exit: {
    opacity: '0',
    transform: `scale(0.9)`,
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

  selectors: {
    '&:focus-visible': {
      outlineStyle: 'solid',
      outlineOffset: component.select.focus.offset,
      outlineColor: component.select.focus.color,
      outlineWidth: component.select.focus.width,
    },
    '&:hover': {
      background: component.select.trigger.hover.background,
      color: component.select.trigger.hover.color,

      borderStyle: 'solid',
      borderWidth: component.select.trigger.hover.borderWidth,
      borderColor: component.select.trigger.hover.borderColor,
      borderRadius: component.select.trigger.default.borderRadius,

      boxShadow: component.select.trigger.hover.boxShadow,
    },
    '&:active': {
      background: component.select.trigger.active.background,
      color: component.select.trigger.active.color,

      borderStyle: 'solid',
      borderWidth: component.select.trigger.active.borderWidth,
      borderColor: component.select.trigger.active.borderColor,
      borderRadius: component.select.trigger.default.borderRadius,

      boxShadow: component.select.trigger.active.boxShadow,
    },
    '&[data-has-value="false"]': {
      color: component.select.placeholder.color,
    },
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

export const contentStyle = style({
  width: 'fit-content',
  minWidth: '20ch',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',

  background: component.select.content.background,

  borderStyle: 'solid',
  borderWidth: component.select.content.borderWidth,
  borderColor: component.select.content.borderColor,
  borderRadius: component.select.content.borderRadius,

  boxShadow: component.select.content.boxShadow,
  padding: component.select.content.padding,
});

export const groupStyle = style({
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
});

export const groupTitleStyle = style({
  fontSize: component.select.group.title.font.fontSize,
  lineHeight: component.select.group.title.font.lineHeight,
  fontWeight: component.select.group.title.font.fontWeight,
  letterSpacing: component.select.group.title.font.letterSpacing,
  color: component.select.group.title.color,

  paddingLeft: component.select.group.title.paddingX,
  paddingRight: component.select.group.title.paddingX,
  paddingTop: component.select.group.title.paddingY,
  paddingBottom: component.select.group.title.paddingY,
});

export const itemStyle = style({
  width: '100%',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.size.space.xs,

  cursor: 'pointer',
  border: 'none',

  color: component.select.item.default.color,
  background: component.select.item.default.background,
  borderRadius: component.select.item.default.borderRadius,

  paddingLeft: component.select.item.default.paddingX,
  paddingRight: component.select.item.default.paddingX,
  paddingTop: component.select.item.default.paddingY,
  paddingBottom: component.select.item.default.paddingY,

  selectors: {
    '&:focus-visible': {
      zIndex: 1,
      outlineStyle: 'solid',
      outlineOffset: component.select.focus.offset,
      outlineColor: component.select.focus.color,
      outlineWidth: component.select.focus.width,
    },
    '&:hover': {
      color: component.select.item.hover.color,
      background: component.select.item.hover.background,
      borderRadius: component.select.item.default.borderRadius,
    },
    '&:active': {
      color: component.select.item.active.color,
      background: component.select.item.active.background,
      borderRadius: component.select.item.default.borderRadius,
    },
  },
});

export const checkStyle = style({
  width: component.select.check.size,
  height: component.select.check.size,
  color: component.select.check.color,
});
