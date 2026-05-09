import { createThemeContract } from '@vanilla-extract/css';

import { token } from '@/theme/token';

export const DefaultSemanticMotion = {
  duration: {
    instant: token.motion.duration[0],
    fast: token.motion.duration[2],
    normal: token.motion.duration[3],
    slow: token.motion.duration[4],
    slower: token.motion.duration[6],
  },
  easing: {
    linear: 'linear',
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.16, 1, 0.3, 1)',
    decelerate: 'cubic-bezier(0, 0, 0, 1)',
    accelerate: 'cubic-bezier(0.3, 0, 1, 1)',
  },
  transition: {
    fast: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
    normal: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
    slow: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
    slower: 'all 0.6s cubic-bezier(0.2, 0, 0, 1)',
  },
};

export const SemanticMotionToken = createThemeContract(DefaultSemanticMotion);
