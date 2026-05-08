import { createMemo, createSignal, JSX, Show, splitProps, ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { arrow, type Middleware } from '@floating-ui/dom';
import {
  Tooltip as BaseTooltip,
  TooltipTrigger as BaseTooltipTrigger,
  TooltipContent as BaseTooltipContent,
  TooltipProps as BaseTooltipProps,
  createPopupController,
  clx,
  sx,
  useTooltip as useBaseTooltip,
} from '@suis-ui/primitives';

import { Box, BoxProps } from '../Box';
import { PopupPresence } from '../Popup/PopupPresence';
import { usePopupAnimation } from '../Popup/usePopupAnimation';

import { arrowStaticOffset, arrowStyle, arrowX, arrowY, contentStyle, tooltipAnimation } from './Tooltip.css';

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
  withArrow?: boolean | number;

  renderArrow?: <T extends ValidComponent>(props: TooltipArrowProps<T>) => JSX.Element;
}
type TooltipArrowComponent = (props: TooltipArrowProps<'div'>) => JSX.Element;
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
  const [arrowElement, setArrowElement] = createSignal<HTMLElement | null>(null);

  const { state, runAnimation } = usePopupAnimation(animationElement);
  const middleware = createMemo(() => {
    const result: Middleware[] = [...(baseProps.middleware ?? [])];
    const element = arrowElement();

    if (local.withArrow !== undefined && element) {
      result.push(arrow({
        element,
        padding: typeof local.withArrow === 'number' ? local.withArrow : 4,
      }));
    }

    return result;
  });

  const TooltipContent = () => {
    const [context] = useBaseTooltip();

    createPopupController(async (open) => {
      await runAnimation(open);

      return open;
    });

    const arrowStyleVars = createMemo(() => {
      const data = context.position?.middlewareData.arrow;

      return assignInlineVars({
        [arrowX]: data?.x != null ? `${data.x}px` : undefined,
        [arrowY]: data?.y != null ? `${data.y}px` : undefined,
      });
    });

    const arrowStaticStyle = createMemo(() => {
      const side = context.position?.placement?.split('-')?.[0];

      if (side === 'top') return { bottom: arrowStaticOffset };
      if (side === 'bottom') return { top: arrowStaticOffset };
      if (side === 'left') return { right: arrowStaticOffset };
      if (side === 'right') return { left: arrowStaticOffset };

      return {};
    });

    return (
      <Box
        {...rest as BoxProps<T>}
        class={clx(contentStyle, rest.class, rest.classList)}
      >
        <Show when={local.withArrow}>
          <Dynamic<TooltipArrowComponent>
            component={local.renderArrow ?? TooltipArrow}
            ref={setArrowElement}
            class={arrowStyle}
            style={sx(arrowStyleVars(), arrowStaticStyle())}
          />
        </Show>
        {local.content}
      </Box>
    );
  };

  return (
    <BaseTooltip
      {...baseProps}
      flip={baseProps.flip ?? true}
      offset={baseProps.offset ?? 4}
      middleware={middleware()}
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
