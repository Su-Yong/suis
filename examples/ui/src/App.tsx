import { createSignal, For, onCleanup } from 'solid-js';
import { Box, Button, CheckBox, Popup, createHoverAway, Select } from '@suis/ui';

const Star = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-star-icon lucide-star">
    <path
      d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);

export const App = () => {
  const [popup1, setPopup1] = createSignal(false);
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <Box
      w={'100vw'}
      h={'100vh'}
      bg={'surface.main'}
    >
      <Box
        bg={'surface.higher'}
        p={'md'}
      >
        This is a Box component from the SUIS UI library.
      </Box>

      <Box p={'md'} gap={'md'}>
        <For each={[false, true] as const}>
          {(disabled) => (
            <For each={['default', 'primary', 'secondary', 'ghost'] as const}>
              {(variant) => (
                <Box direction={'row'} align={'center'} gap={'md'}>
                  <For each={['xs', 'sm', 'md', 'lg', 'xl'] as const}>
                    {(size) => (
                      <Button
                        disabled={disabled}
                        variant={variant}
                        size={size}
                      >
                        Button
                      </Button>
                    )}
                  </For>
                  <For each={['xs', 'sm', 'md', 'lg', 'xl'] as const}>
                    {(size) => (
                      <Button
                        type={'icon'}
                        disabled={disabled}
                        variant={variant}
                        size={size}
                      >
                        <Star />
                      </Button>
                    )}
                  </For>
                  <For each={['xs', 'sm', 'md', 'lg', 'xl'] as const}>
                    {(size) => (
                      <Button
                        active
                        disabled={disabled}
                        variant={variant}
                        size={size}
                      >
                        Active Button
                      </Button>
                    )}
                  </For>
                </Box>
              )}
            </For>
          )}
        </For>
      </Box>

      <CheckBox name={'CheckBox 1'} />

      <Popup
        placement={'bottom'}
        element={
          <Box
            p={'md'}
            bg={'surface.main'}
          >
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
          </Box>
        }
      >
        <Button>
          Popup
        </Button>
      </Popup>
      <Popup
        open={popup1()}
        placement={'bottom'}
        element={
          <Box
            p={'md'}
            bg={'surface.main'}
          >
            <div>Controlled Item 1</div>
            <div>Controlled Item 2</div>
            <div>Controlled Item 3</div>
          </Box>
        }
      >
        <Button
          ref={(element) => {
            const register = createHoverAway(() => setPopup1(false), { delay: 500 });
            onCleanup(register(element));
          }}
          onPointerEnter={() => setPopup1(true)}
        >
          Controlled Popup
        </Button>
      </Popup>

      <Select
        data={[
          {
            label: 'Group 1',
            options: ['Option 1', 'Option 2', 'Option 3'],
          },
          {
            label: 'Group 2',
            options: [
              { value: '4', label: 'Option 4' },
              { value: '5', label: 'Option 5' },
              { value: '6', label: 'Option 6' },
            ],
          }
        ]}
        placeholder={'placeholder'}
      />
      <Select
        value={value()}
        onChangeValue={setValue}
        data={['Controlled Option 1', 'Controlled Option 2', 'Controlled Option 3']}
        placeholder={'placeholder'}
      />
      <Button onClick={() => setValue('Controlled Option 3')}>set value 3</Button>
    </Box>
  );
};
