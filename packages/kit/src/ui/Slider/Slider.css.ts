import { createVar, style, styleVariants } from '@vanilla-extract/css';

import { layered } from '@/theme/util';

import { component } from '../component.css';

export const rangeOffset = createVar();
export const rangeSize = createVar();
export const labelPercent = createVar();
export const markPercent = createVar();

export const rootStyle = style(layered({
  position: 'relative',
  display: 'flex',
  userSelect: 'none',
  gap: component.slider.label.gap,

  selectors: {
    '&[data-orientation="horizontal"]': {
      minWidth: component.slider.size,
      width: '100%',
      flexDirection: 'column',
    },
    '&[data-orientation="vertical"]': {
      width: 'fit-content',
      minHeight: component.slider.size,
      flexDirection: 'row',
    },
    '&[data-disabled]': {
      opacity: component.slider.disabled.opacity,
    },
  },
}));

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
        marginTop: `calc((${component.slider.variants.default.thumb.size} - ${component.slider.variants.default.rail.size}) / 2)`,
        marginBottom: `calc((${component.slider.variants.default.thumb.size} - ${component.slider.variants.default.rail.size}) / 2)`,
      },
      '&[data-orientation="vertical"]': {
        width: component.slider.variants.default.rail.size,
        height: '100%',
        marginLeft: `calc((${component.slider.variants.default.thumb.size} - ${component.slider.variants.default.rail.size}) / 2)`,
        marginRight: `calc((${component.slider.variants.default.thumb.size} - ${component.slider.variants.default.rail.size}) / 2)`,
      },
    },
  })],
  filled: [baseRailStyle, layered({
    borderRadius: component.slider.variants.filled.rail.radius,
    background: component.slider.variants.filled.rail.background,

    selectors: {
      '&[data-orientation="horizontal"]': {
        width: '100%',
        height: component.slider.variants.filled.rail.size,
        marginTop: `calc((${component.slider.variants.filled.thumb.size} - ${component.slider.variants.filled.rail.size}) / 2)`,
        marginBottom: `calc((${component.slider.variants.filled.thumb.size} - ${component.slider.variants.filled.rail.size}) / 2)`,
      },
      '&[data-orientation="vertical"]': {
        width: component.slider.variants.filled.rail.size,
        height: '100%',
        marginLeft: `calc((${component.slider.variants.filled.thumb.size} - ${component.slider.variants.filled.rail.size}) / 2)`,
        marginRight: `calc((${component.slider.variants.filled.thumb.size} - ${component.slider.variants.filled.rail.size}) / 2)`,
      },
    },
  })],
});

const baseActiveRailStyle = style(layered({
  position: 'absolute',
  pointerEvents: 'none',

  transition: component.slider.transition,
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
        right: 0,
        bottom: 'auto',
        left: 0,
        height: rangeSize,
      },
      [`[data-range-bar][data-orientation="vertical"] &`]: {
        top: rangeOffset,
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
        left: rangeOffset,
        width: `calc(${rangeSize} + ${component.slider.variants.filled.thumb.size} / 2 + (${component.slider.variants.filled.activeRail.size} - ${component.slider.variants.filled.thumb.size}) / 2)`,
      },
      [`[data-orientation="vertical"] &`]: {
        right: 0,
        bottom: 'auto',
        left: 0,
        height: `calc(${rangeSize} + ${component.slider.variants.filled.thumb.size} / 2 + (${component.slider.variants.filled.activeRail.size} - ${component.slider.variants.filled.thumb.size}) / 2)`,
      },
      [`[data-orientation="horizontal"][data-to="left"] &`]: {
        left: `calc(${rangeOffset} - ${component.slider.variants.filled.thumb.size} / 2 - (${component.slider.variants.filled.activeRail.size} - ${component.slider.variants.filled.thumb.size}) / 2)`,
      },
      [`[data-orientation="vertical"][data-to="top"] &`]: {
        top: `calc(${rangeOffset} - ${component.slider.variants.filled.thumb.size} / 2 - (${component.slider.variants.filled.activeRail.size} - ${component.slider.variants.filled.thumb.size}) / 2)`,
      },
      [`[data-orientation="horizontal"][data-is-min] &`]: {
        width: rangeSize,
      },
      [`[data-orientation="horizontal"][data-is-max] &`]: {
        width: rangeSize,
      },
      [`[data-orientation="vertical"][data-is-min] &`]: {
        height: rangeSize,
      },
      [`[data-orientation="vertical"][data-is-max] &`]: {
        height: rangeSize,
      },
      [`[data-orientation="horizontal"][data-to="left"][data-is-min] &`]: {
        left: rangeOffset,
      },
      [`[data-orientation="horizontal"][data-to="left"][data-is-max] &`]: {
        left: rangeOffset,
      },
      [`[data-orientation="vertical"][data-to="top"][data-is-min] &`]: {
        top: rangeOffset,
      },
      [`[data-orientation="vertical"][data-to="top"][data-is-max] &`]: {
        top: rangeOffset,
      },
      [`[data-range-bar][data-orientation="horizontal"] &`]: {
        left: `max(0px, calc(${rangeOffset} - ${component.slider.variants.filled.activeRail.size} / 2))`,
        width: `calc(min(100%, calc(${rangeOffset} + ${rangeSize} + ${component.slider.variants.filled.activeRail.size} / 2)) - max(0px, calc(${rangeOffset} - ${component.slider.variants.filled.activeRail.size} / 2)))`,
      },
      [`[data-range-bar][data-orientation="vertical"] &`]: {
        top: `max(0px, calc(${rangeOffset} - ${component.slider.variants.filled.activeRail.size} / 2))`,
        height: `calc(min(100%, calc(${rangeOffset} + ${rangeSize} + ${component.slider.variants.filled.activeRail.size} / 2)) - max(0px, calc(${rangeOffset} - ${component.slider.variants.filled.activeRail.size} / 2)))`,
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
        top: `calc(${component.slider.variants.default.thumb.size} / 2)`,
        left: 'var(--slider-thumb-percent)',
        transform: 'translate(-50%, -50%)',
      },
      '&[data-orientation="vertical"]': {
        top: 'var(--slider-thumb-percent)',
        left: `calc(${component.slider.variants.default.thumb.size} / 2)`,
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
        top: `calc(${component.slider.variants.filled.thumb.size} / 2)`,
        left: 'var(--slider-thumb-percent)',
        transform: `translate(-50%, -50%)`,
      },
      '&[data-orientation="vertical"]': {
        top: 'var(--slider-thumb-percent)',
        left: `calc(${component.slider.variants.filled.thumb.size} / 2)`,
        transform: 'translate(-50%, -50%)',
      },
      '&[data-is-min][data-orientation="horizontal"][data-to="right"]': {
        transform: `translate(calc((${component.slider.variants.filled.rail.size} - ${component.slider.variants.filled.thumb.size}) / 2), -50%)`,
      },
      '&[data-is-max][data-orientation="horizontal"][data-to="left"]': {
        transform: `translate(calc((${component.slider.variants.filled.rail.size} - ${component.slider.variants.filled.thumb.size}) / 2), -50%)`,
      },
      '&[data-is-max][data-orientation="horizontal"][data-to="right"]': {
        transform: `translate(calc(-100% - (${component.slider.variants.filled.rail.size} - ${component.slider.variants.filled.thumb.size}) / 2), -50%)`,
      },
      '&[data-is-min][data-orientation="horizontal"][data-to="left"]': {
        transform: `translate(calc(-100% - (${component.slider.variants.filled.rail.size} - ${component.slider.variants.filled.thumb.size}) / 2), -50%)`,
      },
      '&[data-is-min][data-orientation="vertical"][data-to="bottom"]': {
        transform: `translate(-50%, calc((${component.slider.variants.filled.rail.size} - ${component.slider.variants.filled.thumb.size}) / 2))`,
      },
      '&[data-is-max][data-orientation="vertical"][data-to="top"]': {
        transform: `translate(-50%, calc((${component.slider.variants.filled.rail.size} - ${component.slider.variants.filled.thumb.size}) / 2))`,
      },
      '&[data-is-max][data-orientation="vertical"][data-to="bottom"]': {
        transform: `translate(-50%, calc(-100% - (${component.slider.variants.filled.rail.size} - ${component.slider.variants.filled.thumb.size}) / 2))`,
      },
      '&[data-is-min][data-orientation="vertical"][data-to="top"]': {
        transform: `translate(-50%, calc(-100% - (${component.slider.variants.filled.rail.size} - ${component.slider.variants.filled.thumb.size}) / 2))`,
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

export const markContainerStyle = style(layered({
  position: 'absolute',
  flex: 'none',
  pointerEvents: 'none',

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
      [`${markContainerStyle}[data-orientation="horizontal"] &`]: {
        top: `calc((${component.slider.variants.default.thumb.size} - ${component.slider.variants.default.rail.size}) / 2 + (${component.slider.variants.default.rail.size} - ${component.slider.mark.size}) / 2)`,
        left: markPercent,
        transform: 'translateX(-50%)',
      },
      [`${markContainerStyle}[data-orientation="vertical"] &`]: {
        top: markPercent,
        left: `calc((${component.slider.variants.default.thumb.size} - ${component.slider.variants.default.rail.size}) / 2 + (${component.slider.variants.default.rail.size} - ${component.slider.mark.size}) / 2)`,
        transform: 'translateY(-50%)',
      },
    },
  })],
  filled: [baseMarkStyle, layered({
    selectors: {
      [`${markContainerStyle}[data-orientation="horizontal"] &`]: {
        top: `calc((${component.slider.variants.filled.thumb.size} - ${component.slider.variants.filled.rail.size}) / 2 + (${component.slider.variants.filled.rail.size} - ${component.slider.mark.size}) / 2)`,
        left: markPercent,
        transform: 'translateX(-50%)',
      },
      [`${markContainerStyle}[data-orientation="vertical"] &`]: {
        top: markPercent,
        left: `calc((${component.slider.variants.filled.thumb.size} - ${component.slider.variants.filled.rail.size}) / 2 + (${component.slider.variants.filled.rail.size} - ${component.slider.mark.size}) / 2)`,
        transform: 'translateY(-50%)',
      },
    },
  })],
});
