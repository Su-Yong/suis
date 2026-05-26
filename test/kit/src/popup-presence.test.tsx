import { describe, expect, it } from 'vitest';
import { Popup as BasePopup } from '@suis-ui/primitives';

import {
  PopupAnimationWrapper,
  PopupPresence,
  type PopupAnimationWrapperProps,
} from '@/ui/Popup/PopupPresence';
import { boxContractProps, expectBoxContract } from './box-props-contract';
import { renderScreen } from './test-utils';

describe('PopupPresence', () => {
  it('renders placement data and applies BoxProps', async () => {
    const { screen } = renderScreen(() => {
      const presenceProps = boxContractProps('presence');

      return (
        <BasePopup open placement="bottom-start">
          <BasePopup.Anchor>
            <button type="button">Anchor</button>
          </BasePopup.Anchor>
          <BasePopup.Element>
            {(style) => (
              <PopupPresence
                {...presenceProps}
                style={[style(), presenceProps.style]}
                enter
                exit={false}
                animation={{ enter: 'enter-test', exit: 'exit-test' }}
              >
                <div role="dialog">Presence content</div>
              </PopupPresence>
            )}
          </BasePopup.Element>
        </BasePopup>
      );
    });

    const presence = screen.getByTestId('presence');
    await expect.element(presence).toHaveAttribute('data-placement-x', '0');
    await expect.element(presence).toHaveAttribute('data-placement-y', '0');
    await expect.element(screen.getByRole('dialog')).toHaveTextContent('Presence content');
    expect(presence.element().querySelector('.enter-test')).not.toBeNull();
    await expectBoxContract(presence, { skipLayout: true });
  });

  it('applies animationWrapperProps to the default wrapper', async () => {
    const { screen } = renderScreen(() => (
      <BasePopup open>
        <BasePopup.Anchor>
          <button type="button">Anchor</button>
        </BasePopup.Anchor>
        <BasePopup.Element>
          {() => (
            <PopupPresence
              enter
              exit={false}
              animation={{ enter: 'enter-test', exit: 'exit-test' }}
              animationWrapperProps={{
                'data-testid': 'animation-wrapper',
                class: 'animation-wrapper-class',
                style: { outline: '2px solid rgb(4, 5, 6)' },
              }}
            >
              <div>Wrapped content</div>
            </PopupPresence>
          )}
        </BasePopup.Element>
      </BasePopup>
    ));

    const wrapper = screen.getByTestId('animation-wrapper');
    expect(wrapper.element().classList.contains('animation-wrapper-class')).toBe(true);
    expect(getComputedStyle(wrapper.element()).outlineWidth).toBe('2px');
    await expect.element(wrapper).toHaveTextContent('Wrapped content');
  });

  it('uses custom animation wrapper renderers', async () => {
    const { screen } = renderScreen(() => (
      <BasePopup open>
        <BasePopup.Anchor>
          <button type="button">Anchor</button>
        </BasePopup.Anchor>
        <BasePopup.Element>
          {() => (
            <PopupPresence
              enter
              exit={false}
              animation={{ enter: 'enter-test', exit: 'exit-test' }}
              animationWrapperProps={{
                'data-wrapper-prop': 'forwarded',
              }}
              renderAnimationWrapper={(props: PopupAnimationWrapperProps<'div'>) => (
                <div
                  {...props}
                  data-testid="custom-animation-wrapper"
                  data-enter={props.enter}
                  data-exit={props.exit}
                >
                  {props.children}
                </div>
              )}
            >
              <div>Custom wrapper content</div>
            </PopupPresence>
          )}
        </BasePopup.Element>
      </BasePopup>
    ));

    const wrapper = screen.getByTestId('custom-animation-wrapper');
    await expect.element(wrapper).toHaveAttribute('data-enter', 'true');
    await expect.element(wrapper).toHaveAttribute('data-exit', 'false');
    await expect.element(wrapper).toHaveAttribute('data-wrapper-prop', 'forwarded');
    await expect.element(wrapper).toHaveTextContent('Custom wrapper content');
  });
});

describe('PopupAnimationWrapper', () => {
  it('applies DOM props and animation state classes', async () => {
    const { screen } = renderScreen(() => (
      <PopupAnimationWrapper
        data-testid="standalone-animation-wrapper"
        class="standalone-wrapper-class"
        enter
        exit={false}
        animation={{ enter: 'enter-test', exit: 'exit-test' }}
      >
        Standalone wrapper
      </PopupAnimationWrapper>
    ));

    const wrapper = screen.getByTestId('standalone-animation-wrapper');
    expect(wrapper.element().classList.contains('standalone-wrapper-class')).toBe(true);
    expect(wrapper.element().classList.contains('enter-test')).toBe(true);
    expect(wrapper.element().classList.contains('exit-test')).toBe(false);
    await expect.element(wrapper).toHaveTextContent('Standalone wrapper');
  });
});
