import { createVar, style } from '@vanilla-extract/css';

import { popupAnimation } from '../Popup/animation.css';
import { component } from '../component.css';

export const tooltipAnimation = popupAnimation((x, y) => ({
  enter: {
    opacity: '0',
    transform: `translate(calc(50% * (${x} - 0.5)), calc(50% * (${y} - 0.5))) scale(0.9)`,
  },
  exit: {
    opacity: '0',
    transform: `translate(calc(50% * (${x} - 0.5)), calc(50% * (${y} - 0.5))) scale(0.9)`,
  },
}));

export const contentStyle = style({
  position: 'relative',

  background: component.tooltip.content.background,
  color: component.tooltip.content.color,
  boxShadow: component.tooltip.content.boxShadow,
  borderRadius: component.tooltip.content.borderRadius,

  paddingLeft: component.tooltip.content.paddingX,
  paddingRight: component.tooltip.content.paddingX,
  paddingTop: component.tooltip.content.paddingY,
  paddingBottom: component.tooltip.content.paddingY,

  fontSize: component.tooltip.content.font.fontSize,
  fontWeight: component.tooltip.content.font.fontWeight,
  lineHeight: component.tooltip.content.font.lineHeight,
  letterSpacing: component.tooltip.content.font.letterSpacing,
});

export const arrowX = createVar();
export const arrowY = createVar();
export const arrowStyle = style({
  position: 'absolute',
  left: arrowX,
  top: arrowY,
  right: '',
  bottom: '',
  background: component.tooltip.content.background,
  width: component.tooltip.arrow.size,
  height: component.tooltip.arrow.size,
  transform: 'rotate(45deg)',
});

export const arrowStaticOffset = `calc(${component.tooltip.arrow.size} / -2)`;
