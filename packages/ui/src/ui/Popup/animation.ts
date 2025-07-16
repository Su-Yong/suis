import { keyframes, StyleRule, styleVariants } from '@vanilla-extract/css';

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
      animation: `${enterKeyframe} 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
      pointerEvents: 'auto',
    },
    exit: {
      animation: `${exitKeyframe} 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
      pointerEvents: 'none',
    },
  });
};