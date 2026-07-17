import { JSX, onCleanup, splitProps, ValidComponent } from 'solid-js';

import { forwardRef, Polymorphic, PolymorphicProps } from '../Polymorphic';
import { useSliderParts } from './useSlider';
import { sx } from '../helper';

type SlideThumbOnlyProps<T extends ValidComponent> = {
  disabled?: boolean;
  onKeyDown?: JSX.EventHandlerUnion<T, KeyboardEvent>;
  onPointerCancel?: JSX.EventHandlerUnion<T, PointerEvent>;
  onPointerDown?: JSX.EventHandlerUnion<T, PointerEvent>;
  onPointerMove?: JSX.EventHandlerUnion<T, PointerEvent>;
  onPointerUp?: JSX.EventHandlerUnion<T, PointerEvent>;
  style?: string | JSX.CSSProperties;
};

export type SlideThumbProps<T extends ValidComponent> =
  Omit<PolymorphicProps<T>, keyof SlideThumbOnlyProps<T>>
  & SlideThumbOnlyProps<T>;

const callHandler = <E extends Event>(
  handler: JSX.EventHandlerUnion<HTMLElement, E> | undefined,
  event: E,
) => {
  if (!handler) return;
  const solidEvent = event as E & { currentTarget: HTMLElement; target: Element };
  if (typeof handler === 'function') handler(solidEvent);
  else handler[0](handler[1], solidEvent);
};

export const SlideThumb = <T extends ValidComponent = 'div'>(props: SlideThumbProps<T>) => {
  const [local, rest] = splitProps(props, [
    'disabled',
    'onKeyDown',
    'onPointerCancel',
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'style',
  ]);
  const [state, actions] = useSliderParts();
  const id = Symbol('slider-thumb');
  let element: HTMLElement | null = null;
  let activePointerId: number | null = null;

  const index = () => actions.getThumbIndex(id);
  const value = () => state.values[index()];
  const validDomain = () => Number.isFinite(state.min)
    && Number.isFinite(state.max)
    && Number.isFinite(state.step)
    && state.min < state.max
    && state.step > 0;
  const percent = () => {
    const current = value();
    return Number.isFinite(current) ? actions.valueToPercent(current) : 0;
  };
  const disabled = () => !actions.isInteractive(index());
  const style = () => sx(local.style, { '--slider-thumb-percent': `${percent()}%` });

  const onSetup = (nextElement: HTMLElement) => {
    element = nextElement;
    const unregister = actions.registerThumb({
      id,
      disabled: () => !!local.disabled,
      element: () => element,
    });

    const requestPointerValue = (event: PointerEvent) => {
      const nextValue = actions.pointerToValue(event.clientX, event.clientY);
      const currentIndex = index();
      if (nextValue !== null && currentIndex >= 0) {
        actions.requestValue(currentIndex, nextValue);
      }
    };
    const finishPointer = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      activePointerId = null;
      if (nextElement.hasPointerCapture(event.pointerId)) {
        nextElement.releasePointerCapture(event.pointerId);
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      callHandler(local.onPointerDown, event);
      const currentIndex = index();
      if (
        event.defaultPrevented
        || !event.isPrimary
        || event.button !== 0
        || !actions.isInteractive(currentIndex)
      ) return;

      activePointerId = event.pointerId;
      nextElement.setPointerCapture(event.pointerId);
      actions.setFocusedThumb(id);
      nextElement.focus();
      requestPointerValue(event);
    };
    const handlePointerMove = (event: PointerEvent) => {
      callHandler(local.onPointerMove, event);
      if (event.defaultPrevented || event.pointerId !== activePointerId) return;
      requestPointerValue(event);
    };
    const handlePointerUp = (event: PointerEvent) => {
      callHandler(local.onPointerUp, event);
      finishPointer(event);
    };
    const handlePointerCancel = (event: PointerEvent) => {
      callHandler(local.onPointerCancel, event);
      finishPointer(event);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      callHandler(local.onKeyDown, event);
      if (event.defaultPrevented) return;
      if (actions.requestKey(index(), event.key)) event.preventDefault();
    };
    const handleFocus = () => actions.setFocusedThumb(id);

    nextElement.addEventListener('pointerdown', handlePointerDown);
    nextElement.addEventListener('pointermove', handlePointerMove);
    nextElement.addEventListener('pointerup', handlePointerUp);
    nextElement.addEventListener('pointercancel', handlePointerCancel);
    nextElement.addEventListener('keydown', handleKeyDown);
    nextElement.addEventListener('focus', handleFocus);
    onCleanup(() => {
      nextElement.removeEventListener('pointerdown', handlePointerDown);
      nextElement.removeEventListener('pointermove', handlePointerMove);
      nextElement.removeEventListener('pointerup', handlePointerUp);
      nextElement.removeEventListener('pointercancel', handlePointerCancel);
      nextElement.removeEventListener('keydown', handleKeyDown);
      nextElement.removeEventListener('focus', handleFocus);
      if (activePointerId !== null && nextElement.hasPointerCapture(activePointerId)) {
        nextElement.releasePointerCapture(activePointerId);
      }
      activePointerId = null;
      element = null;
      unregister();
    });
  };

  return (
    <Polymorphic
      {...rest as PolymorphicProps<T>}
      as={rest.as ?? 'div'}
      ref={forwardRef(onSetup, rest.ref)}
      role={'slider'}
      tabindex={rest.tabindex ?? 0}
      aria-valuemin={validDomain() ? state.min : undefined}
      aria-valuemax={validDomain() ? state.max : undefined}
      aria-valuenow={validDomain() && Number.isFinite(value()) ? value() : undefined}
      aria-orientation={state.orientation}
      aria-disabled={disabled() || undefined}
      data-slider-thumb={''}
      data-disabled={disabled() ? '' : undefined}
      data-orientation={state.orientation}
      data-to={state.to}
      data-value={Number.isFinite(value()) ? value() : undefined}
      data-percent={percent()}
      style={style()}
    >
      {rest.children}
    </Polymorphic>
  );
};
