import { createThemeContract } from '@vanilla-extract/css';

import { vars } from '@/theme/token';

export const DefaultSliderVars = {
  size: '20rem',
  transition: vars.motion.transition.fast,
  disabled: {
    opacity: '0.5',
    background: vars.color.surface.higher,
  },

  variants: {
    default: {
      rail: {
        size: vars.size.space.xs,
        radius: vars.size.round.md,
        background: vars.color.surface.higher,
      },
      activeRail: {
        background: vars.color.primary.main,
        size: vars.size.space.xs,
        radius: vars.size.round.md,
      },
      thumb: {
        size: vars.size.space.lg,
        radius: vars.size.round.full,
        background: vars.color.surface.main,
        borderWidth: vars.size.space.xs,
        borderColor: vars.color.primary.main,
        hover: {
          background: vars.color.surface.high,
          borderWidth: vars.size.space.xs,
          borderColor: vars.color.primary.high,
        },
        active: {
          background: vars.color.primary.higher,
          borderWidth: `calc(${vars.size.space.lg} / 2)`,
          borderColor: vars.color.primary.higher,
          scale: '1.5',
        },
        focus: {
          offset: '0',
          color: vars.color.surface.higher,
          width: vars.size.line.thick,
        },
      },
    },

    filled: {
      rail: {
        size: vars.size.space.xl,
        radius: vars.size.round.xl,
        background: vars.color.surface.higher,
      },
      activeRail: {
        background: vars.color.primary.main,
        size: vars.size.space.xl,
        radius: vars.size.round.xl,
      },
      thumb: {
        size: vars.size.space.lg,
        radius: vars.size.round.full,
        background: 'transparent',
        borderWidth: vars.size.space.xxs,
        borderColor: vars.color.surface.main,
        hover: {
          background: 'transparent',
          borderWidth: vars.size.space.xxs,
          borderColor: vars.color.surface.high,
        },
        active: {
          background: 'transparent',
          borderWidth: vars.size.space.xs,
          borderColor: vars.color.surface.main,
          scale: '1.0',
        },
        focus: {
          offset: '0',
          color: vars.color.surface.higher,
          width: vars.size.line.thick,
        },
      },
    },
  },

  label: {
    gap: vars.size.space.xs,
    width: vars.size.space.xl,
    height: vars.size.space.lg,
    font: vars.font.caption,
    color: vars.color.text.caption,
  },
  mark: {
    size: vars.size.space.xs,
    radius: vars.size.round.full,
    background: vars.color.surface.high,

    active: {
      background: vars.color.primary.high,
    },
  },
};

export const sliderVars = createThemeContract(DefaultSliderVars);
