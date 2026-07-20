import { createVar, style, styleVariants } from '@vanilla-extract/css';

import { layered } from '@/theme/util';

import { component } from '../component.css';

export const rangeOffset = createVar();
export const rangeSize = createVar();
export const labelPercent = createVar();
export const markPercent = createVar();
const rootInset = createVar();

export const rootStyle = style(layered({
  position: 'relative',
  display: 'flex',

  userSelect: 'none',
  gap: component.slider.label.gap,

  selectors: {
    '&[data-orientation="horizontal"]': {
      width: '100%',
      minWidth: component.slider.size,
      height: 'fit-content',
      flexDirection: 'column',
    },
    '&[data-orientation="vertical"]': {
      width: 'fit-content',
      height: '100%',
      minHeight: component.slider.size,
      flexDirection: 'row',
    },
    '&[data-disabled]': {
      opacity: component.slider.disabled.opacity,
    },
  },
}));

export const rootInsetStyle = styleVariants({
  default: layered({
    vars: {
      [rootInset]: `calc(${component.slider.variants.default.thumb.size} / 2)`,
    },

    selectors: {
      '&[data-orientation="horizontal"]': {
        paddingLeft: rootInset,
        paddingRight: rootInset,
      },
      '&[data-orientation="vertical"]': {
        paddingTop: rootInset,
        paddingBottom: rootInset,
      },
    },
  }),
  filled: layered({
    vars: {
      [rootInset]: `calc(${component.slider.variants.filled.rail.size} / 2)`,
    },

    selectors: {
      '&[data-orientation="horizontal"]': {
        paddingLeft: rootInset,
        paddingRight: rootInset,
      },
      '&[data-orientation="vertical"]': {
        paddingTop: rootInset,
        paddingBottom: rootInset,
      },
    },
  }),
});

const baseRailStyle = style(layered({
  position: 'relative',
  flex: 'none',
  overflow: 'visible',
  cursor: 'pointer',
  touchAction: 'none',

  selectors: {
    [`${rootStyle}[data-disabled] &`]: {
      cursor: 'not-allowed',
    },
  },
}));
export const railStyle = styleVariants({
  default: [baseRailStyle, layered({
    borderRadius: component.slider.variants.default.rail.radius,
    background: component.slider.variants.default.rail.background,

    selectors: {
      '&[data-orientation="horizontal"]': {
        width: '100%',
        height: component.slider.variants.default.rail.size,
      },
      '&[data-orientation="vertical"]': {
        width: component.slider.variants.default.rail.size,
        height: '100%',
      },
    },
  })],
  filled: [baseRailStyle, layered({
    selectors: {
      '&::before': {
        position: 'absolute',
        content: '""',
        pointerEvents: 'none',
        borderRadius: component.slider.variants.filled.rail.radius,
        background: component.slider.variants.filled.rail.background,
      },
      '&[data-orientation="horizontal"]::before': {
        left: `calc(-1 * ${component.slider.variants.filled.rail.size} / 2)`,
        right: `calc(-1 * ${component.slider.variants.filled.rail.size} / 2)`,
        height: component.slider.variants.filled.rail.size,
      },
      '&[data-orientation="vertical"]::before': {
        width: component.slider.variants.filled.rail.size,
        top: `calc(-1 * ${component.slider.variants.filled.rail.size} / 2)`,
        bottom: `calc(-1 * ${component.slider.variants.filled.rail.size} / 2)`,
      },
      '&[data-orientation="horizontal"]': {
        width: '100%',
        height: component.slider.variants.filled.rail.size,
      },
      '&[data-orientation="vertical"]': {
        width: component.slider.variants.filled.rail.size,
        height: '100%',
      },
    },
  })],
});

const baseActiveRailStyle = style(layered({
  position: 'absolute',
  pointerEvents: 'none',

  transition: component.slider.transition,
  selectors: {
    [`.${rootStyle}:has([data-slider-thumb]:active) &`]: {
      transition: 'none',
    },
  },
}));
export const activeRailStyle = styleVariants({
  default: [baseActiveRailStyle, layered({
    borderRadius: component.slider.variants.default.activeRail.radius,
    background: component.slider.variants.default.activeRail.background,

    selectors: {
      [`[data-orientation="horizontal"] &`]: {
        top: 0,
        bottom: 0,
        left: rangeOffset,
        width: rangeSize,
      },
      [`[data-orientation="vertical"] &`]: {
        top: rangeOffset,
        right: 0,
        bottom: 'auto',
        left: 0,
        height: rangeSize,
      },
    },
  })],
  filled: [baseActiveRailStyle, layered({
    borderRadius: component.slider.variants.filled.activeRail.radius,
    background: component.slider.variants.filled.activeRail.background,

    selectors: {
      [`[data-orientation="horizontal"] &`]: {
        top: 0,
        bottom: 0,
        left: `calc(${rangeOffset} - ${rootInset})`,
        width: `calc(${rangeSize} + ${component.slider.variants.filled.rail.size})`,
      },
      [`[data-orientation="vertical"] &`]: {
        top: `calc(${rangeOffset} - ${rootInset})`,
        right: 0,
        bottom: 'auto',
        left: 0,
        height: `calc(${rangeSize} + ${component.slider.variants.filled.rail.size})`,
      },
    },
  })],
});

const baseThumbStyle = style(layered({
  position: 'absolute',
  cursor: 'grab',
  touchAction: 'none',

  transition: component.slider.transition,

  selectors: {
    '&:active': {
      transition: 'none',
    },
    '&[data-disabled]': {
      cursor: 'not-allowed',
      background: component.slider.disabled.background,
    },
  },
}));
export const thumbStyle = styleVariants({
  default: [baseThumbStyle, layered({
    width: component.slider.variants.default.thumb.size,
    height: component.slider.variants.default.thumb.size,

    borderStyle: 'solid',
    borderWidth: component.slider.variants.default.thumb.borderWidth,
    borderColor: component.slider.variants.default.thumb.borderColor,
    borderRadius: component.slider.variants.default.thumb.radius,
    background: component.slider.variants.default.thumb.background,

    outlineStyle: 'solid',
    outlineOffset: component.slider.variants.default.thumb.focus.offset,
    outlineColor: component.slider.variants.default.thumb.focus.color,
    outlineWidth: 0,

    selectors: {
      '&[data-orientation="horizontal"]': {
        top: `calc(${component.slider.variants.default.rail.size} / 2)`,
        left: 'var(--slider-thumb-percent)',
        transform: 'translate(-50%, -50%)',
      },
      '&[data-orientation="vertical"]': {
        top: 'var(--slider-thumb-percent)',
        left: `calc(${component.slider.variants.default.rail.size} / 2)`,
        transform: 'translate(-50%, -50%)',
      },
      '&:hover': {
        background: component.slider.variants.default.thumb.hover.background,
        borderWidth: component.slider.variants.default.thumb.hover.borderWidth,
        borderColor: component.slider.variants.default.thumb.hover.borderColor,
      },
      '&:focus-visible': {
        outlineWidth: component.slider.variants.default.thumb.focus.width,
      },
      '&:active': {
        cursor: 'grabbing',
        background: component.slider.variants.default.thumb.active.background,
        borderWidth: component.slider.variants.default.thumb.active.borderWidth,
        borderColor: component.slider.variants.default.thumb.active.borderColor,
        transform: `translate(-50%, -50%) scale(${component.slider.variants.default.thumb.active.scale})`,
      },
    },
  })],
  filled: [baseThumbStyle, layered({
    width: component.slider.variants.filled.thumb.size,
    height: component.slider.variants.filled.thumb.size,

    borderStyle: 'solid',
    borderWidth: component.slider.variants.filled.thumb.borderWidth,
    borderColor: component.slider.variants.filled.thumb.borderColor,
    borderRadius: component.slider.variants.filled.thumb.radius,
    background: component.slider.variants.filled.thumb.background,

    outlineStyle: 'solid',
    outlineOffset: component.slider.variants.filled.thumb.focus.offset,
    outlineColor: component.slider.variants.filled.thumb.focus.color,
    outlineWidth: 0,

    selectors: {
      '&[data-orientation="horizontal"]': {
        top: `calc(${component.slider.variants.filled.rail.size} / 2)`,
        left: 'var(--slider-thumb-percent)',
        transform: `translate(-50%, -50%)`,
      },
      '&[data-orientation="vertical"]': {
        top: 'var(--slider-thumb-percent)',
        left: `calc(${component.slider.variants.filled.rail.size} / 2)`,
        transform: 'translate(-50%, -50%)',
      },
      '&:hover': {
        background: component.slider.variants.filled.thumb.hover.background,
        borderWidth: component.slider.variants.filled.thumb.hover.borderWidth,
        borderColor: component.slider.variants.filled.thumb.hover.borderColor,
      },
      '&:focus-visible': {
        outlineWidth: component.slider.variants.filled.thumb.focus.width,
      },
      '&:active': {
        cursor: 'grabbing',
        background: component.slider.variants.filled.thumb.active.background,
        borderWidth: component.slider.variants.filled.thumb.active.borderWidth,
        borderColor: component.slider.variants.filled.thumb.active.borderColor,
        transform: `translate(-50%, -50%) scale(${component.slider.variants.filled.thumb.active.scale})`,
      },
    },
  })],
});

export const labelContainerStyle = style(layered({
  position: 'relative',
  flex: 'none',

  selectors: {
    '&[data-orientation="horizontal"]': {
      width: '100%',
      height: component.slider.label.height,
    },
    '&[data-orientation="vertical"]': {
      width: component.slider.label.width,
      height: '100%',
    },
  },
}));

export const labelStyle = style(layered({
  position: 'absolute',
  color: component.slider.label.color,
  fontSize: component.slider.label.font.fontSize,
  lineHeight: component.slider.label.font.lineHeight,
  fontWeight: component.slider.label.font.fontWeight,
  letterSpacing: component.slider.label.font.letterSpacing,
  whiteSpace: 'nowrap',

  selectors: {
    [`${labelContainerStyle}[data-orientation="horizontal"] &`]: {
      top: 0,
      left: labelPercent,
      transform: 'translateX(-50%)',
    },
    [`${labelContainerStyle}[data-orientation="vertical"] &`]: {
      top: labelPercent,
      left: 0,
      transform: 'translateY(-50%)',
    },
  },
}));

const baseMarkContainerStyle = style(layered({
  position: 'absolute',
  flex: 'none',
  pointerEvents: 'none',
}));
export const markContainerStyle = styleVariants({
  default: [baseMarkContainerStyle, layered({
    selectors: {
      '&[data-orientation="horizontal"]': {
        left: rootInset,
        right: rootInset,
        height: component.slider.variants.default.rail.size,
      },
      '&[data-orientation="vertical"]': {
        top: rootInset,
        bottom: rootInset,
        width: component.slider.variants.default.rail.size,
      },
    },
  })],
  filled: [baseMarkContainerStyle, layered({
    selectors: {
      '&[data-orientation="horizontal"]': {
        left: rootInset,
        right: rootInset,
        height: component.slider.variants.filled.rail.size,
      },
      '&[data-orientation="vertical"]': {
        top: rootInset,
        bottom: rootInset,
        width: component.slider.variants.filled.rail.size,
      },
    },
  })],
});

const baseMarkStyle = style(layered({
  position: 'absolute',

  width: component.slider.mark.size,
  height: component.slider.mark.size,
  borderRadius: component.slider.mark.radius,
  background: component.slider.mark.background,

  selectors: {
    [`&[data-active="true"]`]: {
      background: component.slider.mark.active.background,
    },
  },
}));
export const markStyle = styleVariants({
  default: [baseMarkStyle, layered({
    selectors: {
      [`[data-orientation="horizontal"] &`]: {
        top: '50%',
        left: markPercent,
        transform: 'translate(-50%, -50%)',
      },
      [`[data-orientation="vertical"] &`]: {
        top: markPercent,
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  })],
  filled: [baseMarkStyle, layered({
    selectors: {
      [`[data-orientation="horizontal"] &`]: {
        top: '50%',
        left: markPercent,
        transform: 'translate(-50%, -50%)',
      },
      [`[data-orientation="vertical"] &`]: {
        top: markPercent,
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  })],
});
