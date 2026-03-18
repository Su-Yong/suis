import { createSignal, JSX, Show, splitProps, ValidComponent } from 'solid-js';
import {
  Tooltip as BaseTooltip,
  TooltipTrigger as BaseTooltipTrigger,
  TooltipContent as BaseTooltipContent,
  TooltipProps as BaseTooltipProps,
  createPopupController,
  clx,
} from '@suis/primitives';

import { Box, BoxProps } from '../Box';
import { PopupPresence } from '../Popup/PopupPresence';
import { usePopupAnimation } from '../Popup/usePopupAnimation';

import { arrowStyle, contentStyle, tooltipAnimation } from './Tooltip.css';
import { Dynamic } from 'solid-js/web';

const TooltipOnlyProps = [
  'content',
  'withArrow',
  'renderArrow',
] as const;
const BaseTooltipOnlyProps = [
  'openDelay',
  'closeDelay',

  'placement',
  'strategy',
  'offset',
  'shift',
  'flip',
  'autoUpdate',
  'middleware',
] as const;

type TooltipOnlyProps = {
  content: JSX.Element;
  withArrow?: boolean;

  renderArrow?: <T extends ValidComponent>(props: TooltipArrowProps<T>) => JSX.Element;
}
export type TooltipProps<T extends ValidComponent> = (
  Omit<BoxProps<T>, keyof BaseTooltipProps | keyof TooltipOnlyProps>
  & BaseTooltipProps
  & TooltipOnlyProps
);
export const Tooltip = <T extends ValidComponent>(props: TooltipProps<T>) => {
  const [baseProps, local, rest] = splitProps(
    props,
    BaseTooltipOnlyProps,
    TooltipOnlyProps,
  );

  const [animationElement, setAnimationElement] = createSignal<HTMLElement | null>(null);
  const { state, runAnimation } = usePopupAnimation(animationElement);

  const TooltipContent = () => {
    createPopupController(async (open) => {
      await runAnimation(open);

      return open;
    });

    return (
      <Box
        {...rest as BoxProps<T>}
        class={clx(contentStyle, rest.class, rest.classList)}
      >
        {local.content}
        <Show when={local.withArrow}>
          <Dynamic
            component={local.renderArrow ?? TooltipArrow}
          />
        </Show>
      </Box>
    );
  };

  return (
    <BaseTooltip
      {...baseProps}
      flip={baseProps.flip ?? true}
      offset={baseProps.offset ?? 4}
    >
      <BaseTooltipTrigger>
        {props.children}
      </BaseTooltipTrigger>
      <BaseTooltipContent
        as={PopupPresence}
        enter={state.enter}
        exit={state.exit}
        animation={tooltipAnimation}
        animationWrapperProps={{ ref: setAnimationElement }}
      >
        <TooltipContent />
      </BaseTooltipContent>
    </BaseTooltip>
  );
};

export type TooltipArrowProps<T extends ValidComponent> = BoxProps<T>;
export const TooltipArrow = <T extends ValidComponent>(props: TooltipArrowProps<T>) => {
  return (
    <Box
      {...props}
      class={clx(arrowStyle, props.class, props.classList)}
    />
  );
};
