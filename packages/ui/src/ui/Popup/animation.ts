import { keyframes, StyleRule, styleVariants } from '@vanilla-extract/css';

import { component } from '../component.css';

type PopupAnimationKey = 'enter' | 'exit';
export type PopupAnimation = Record<PopupAnimationKey, string>;
export const popupAnimation = <T extends Record<PopupAnimationKey, StyleRule>>(
  animation: T
): PopupAnimation => {
  const enterKeyframe = keyframes({
    '0%': animation.enter,
  });
  const exitKeyframe = keyframes({
    '100%': animation.exit,
  });

  return styleVariants({
    enter: {
      animation: `${enterKeyframe} ${component.popup.enter.duration} ${component.popup.enter.easing}`,
      pointerEvents: 'auto',
    },
    exit: {
      animation: `${exitKeyframe} ${component.popup.exit.duration} ${component.popup.exit.easing}`,
      pointerEvents: 'none',
    },
  });
};