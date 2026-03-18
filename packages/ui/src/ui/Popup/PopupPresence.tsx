import { JSX, mergeProps, splitProps, ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clx, sx } from '@suis/primitives';

import { PopupAnimation } from './animation.css';
import { usePlacement } from './usePlacement';

import { Box, BoxProps } from '../Box';

import { animationStyle, placementX, placementY, popupXAlignStyle, popupYAlignStyle } from './Popup.css';

type PopupPresenceOnlyProps<T extends ValidComponent> = {
  enter: boolean;
  exit: boolean;
  animation: PopupAnimation;
  children: JSX.Element;

  animationWrapperProps?: Omit<PopupAnimationWrapperProps<T>, keyof PopupAnimationWrapperOnlyProps>;
  renderAnimationWrapper?: <T extends ValidComponent>(props: PopupAnimationWrapperProps<T>) => JSX.Element;
};
export type PopupPresenceProps<T extends ValidComponent, U extends ValidComponent> =
  Omit<BoxProps<T>, keyof PopupPresenceOnlyProps<U>>
  & PopupPresenceOnlyProps<U>;
export const PopupPresence = <T extends ValidComponent, U extends ValidComponent>(
  props: PopupPresenceProps<T, U>,
) => {
  const [local, elementProps, renderer, rest] = splitProps(
    mergeProps(
      {
        renderAnimationWrapper: PopupAnimationWrapper,
      },
      props,
    ),
    ['animation', 'enter', 'exit', 'children'],
    ['animationWrapperProps'],
    ['renderAnimationWrapper'],
  );

  const placementOffset = usePlacement();

  return (
    <Box
      {...rest as BoxProps<T>}
      data-placement-x={placementOffset().x}
      data-placement-y={placementOffset().y}
      class={clx({
        [popupXAlignStyle[placementOffset().x]]: true,
        [popupYAlignStyle[placementOffset().y]]: true,
      }, rest.classList, rest.class)}
      style={sx(
        assignInlineVars({
          [placementX]: `${placementOffset().x}`,
          [placementY]: `${placementOffset().y}`,
        }),
        rest.style,
      )}
    >
      <Dynamic
        component={renderer.renderAnimationWrapper as typeof PopupAnimationWrapper}
        enter={local.enter}
        exit={local.exit}
        animation={local.animation}
        {...elementProps.animationWrapperProps}
      >
        {local.children}
      </Dynamic>
    </Box>
  );
};

type PopupAnimationWrapperOnlyProps = {
  enter: boolean;
  exit: boolean;
  animation: PopupAnimation;
};
export type PopupAnimationWrapperProps<T extends ValidComponent> =
  Omit<BoxProps<T>, keyof PopupAnimationWrapperOnlyProps>
  & PopupAnimationWrapperOnlyProps;
export const PopupAnimationWrapper = <T extends ValidComponent>(props: PopupAnimationWrapperProps<T>) => {
  const [local, rest] = splitProps(props, ['enter', 'exit', 'animation']);

  return (
    <div
      {...rest as BoxProps<T>}
      class={clx({
        [animationStyle]: true,
        [local.animation.enter]: local.enter,
        [local.animation.exit]: local.exit,
      }, rest.classList, rest.class)}
    >
      {props.children}
    </div>
  );
};
