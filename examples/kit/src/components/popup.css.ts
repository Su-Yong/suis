import { popupAnimation } from '@suis-ui/kit/css';

export const fadeAnimation = popupAnimation({
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
});

export const scaleAnimation = popupAnimation({
  enter: {
    transform: 'scale(0)',
  },
  exit: {
    transform: 'scale(0)',
  },
});

export const slideAnimation = popupAnimation((x, y) => ({
  enter: {
    transform: `translate(calc((${x} - 0.5) * 50%), calc((${y} - 0.5) * 50%))`,
    opacity: 0,
  },
  exit: {
    transform: `translate(calc((${x} - 0.5) * 50%), calc((${y} - 0.5) * 50%))`,
    opacity: 0,
  },
}));

export const slideUpAnimation = popupAnimation({
  enter: {
    transform: 'translateY(100%)',
    opacity: 0,
  },
  exit: {
    transform: 'translateY(100%)',
    opacity: 0,
  },
});

export const slideDownAnimation = popupAnimation({
  enter: {
    transform: 'translateY(-100%)',
    opacity: 0,
  },
  exit: {
    transform: 'translateY(-100%)',
    opacity: 0,
  },
});

export const slideLeftAnimation = popupAnimation({
  enter: {
    transform: 'translateX(100%)',
    opacity: 0,
  },
  exit: {
    transform: 'translateX(100%)',
    opacity: 0,
  },
});

export const slideRightAnimation = popupAnimation({
  enter: {
    transform: 'translateX(-100%)',
    opacity: 0,
  },
  exit: {
    transform: 'translateX(-100%)',
    opacity: 0,
  },
});

export const rotateAnimation = popupAnimation({
  enter: {
    transform: 'rotate(90deg) scale(0)',
    opacity: 0,
  },
  exit: {
    transform: 'rotate(90deg) scale(0)',
    opacity: 0,
  },
});