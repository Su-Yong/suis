import { createVar, fallbackVar, style, styleVariants } from '@vanilla-extract/css';

import { popupAnimation } from './animation';

export const popupXAlignStyle = styleVariants({
  0: {
    alignItems: 'flex-start',
  },
  0.5: {
    alignItems: 'center',
  },
  1: {
    alignItems: 'flex-end',
  },
});
export const popupYAlignStyle = styleVariants({
  0: {
    justifyContent: 'flex-start',
  },
  0.5: {
    justifyContent: 'center',
  },
  1: {
    justifyContent: 'flex-end',
  },
});

export const maxWidth = createVar();
export const maxHeight = createVar();

export const placementX = createVar();
export const placementY = createVar();
export const animationStyle = style({
  width: '100%',
  maxWidth: maxWidth,
  maxHeight: maxHeight,
  transformOrigin: `calc(100% * ${fallbackVar(placementX, '0')}) calc(100% * ${fallbackVar(placementY, '0')})`,
});

export const defaultAnimation = popupAnimation({
  enter: {
    opacity: '0',
    transform: `scale(0.95)`,
  },
  exit: {
    opacity: '0',
    transform: `scale(0.95)`,
  },
});
