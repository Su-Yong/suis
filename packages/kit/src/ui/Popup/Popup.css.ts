import { createVar, fallbackVar, style, styleVariants } from '@vanilla-extract/css';

import { layered } from '@/theme/util';

import { placementX, placementY } from './placement.css';
import { popupAnimation } from './animation';

export const popupXAlignStyle = styleVariants({
  0: layered({
    alignItems: 'flex-start',
  }),
  0.5: layered({
    alignItems: 'center',
  }),
  1: layered({
    alignItems: 'flex-end',
  }),
});
export const popupYAlignStyle = styleVariants({
  0: layered({
    justifyContent: 'flex-start',
  }),
  0.5: layered({
    justifyContent: 'center',
  }),
  1: layered({
    justifyContent: 'flex-end',
  }),
});

export const maxWidth = createVar();
export const maxHeight = createVar();

export const animationStyle = style(layered({
  width: '100%',
  maxWidth: maxWidth,
  maxHeight: maxHeight,
  transformOrigin: `calc(100% * ${fallbackVar(placementX, '0')}) calc(100% * ${fallbackVar(placementY, '0')})`,
}));

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
