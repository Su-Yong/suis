import { keyframes, StyleRule, styleVariants } from '@vanilla-extract/css';

import { component } from '../component.css';
import { placementX, placementY } from './Popup.css';

type PopupAnimationKey = 'enter' | 'exit';
export type PopupAnimation = Record<PopupAnimationKey, string>;
export const popupAnimation = <T extends Record<PopupAnimationKey, StyleRule>>(
  animation: T | ((x: string, y: string) => T),
): PopupAnimation => {
  const resolvedAnimation = typeof animation === 'function' ? animation(placementX, placementY) : animation;

  const enterKeyframe = keyframes({
    '0%': resolvedAnimation.enter,
  });
  const exitKeyframe = keyframes({
    '100%': resolvedAnimation.exit,
  });

  return styleVariants({
    enter: {
      animationName: enterKeyframe,
      animationDuration: component.popup.enter.duration,
      animationTimingFunction: component.popup.enter.easing,
      animationFillMode: 'both',
      pointerEvents: 'auto',
    },
    exit: {
      animationName: exitKeyframe,
      animationDuration: component.popup.exit.duration,
      animationTimingFunction: component.popup.exit.easing,
      animationFillMode: 'both',
      pointerEvents: 'none',
    },
  });
};