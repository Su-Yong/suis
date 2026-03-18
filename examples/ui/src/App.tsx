import { createSignal, For, onCleanup } from 'solid-js';
import { Box, Button, CheckBox, Popup, createHoverAway, Select, Input, createTheme, token, useTheme } from '@suis/ui';

const darkTheme = createTheme({
  vars: {
    color: {
      surface: {
        main: token.color.gray[900],
        contrast: token.color.gray[50],
        high: token.color.gray[800],
        higher: token.color.gray[700],
      },
      text: {
        main: token.color.gray[50],
        caption: token.color.gray[600],
        disabled: token.color.gray[500],
      },
    },
  },
});

const Star = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-star-icon lucide-star">
    <path
      d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);
const Moon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" /></svg>
);

export const App = () => {
  const [theme, setTheme] = useTheme();

  return (
    <Box
      w={'100vw'}
      h={'100vh'}
      bg={'surface.main'}
      p={'lg'}
      style={{ overflow: 'auto' }}
    >
      <Box text={'h3'} direction={'row'} justify={'space-between'} align={'center'} gap={'md'}>
        SUIS Playground
        <Button
          variant={'ghost'}
          type={'icon'}
          r={'full'}
          active={theme() === darkTheme}
          onClick={() => {
            setTheme(theme() === darkTheme ? null : darkTheme);
          }}
        >
          <Moon />
        </Button>
      </Box>

      <Box text={'title'} mt={'xl'}>Box</Box>
      <Box text={'body'} mb={'md'}>
        Box is a primitive component that can be used to create any layout. It provides a set of props for layout, spacing, colors, and typography. It also supports polymorphic 'as' prop for rendering different HTML elements.
      </Box>
      <Box r={'lg'} bc={'surface.higher'} p={'md'} gap={'md'}>
        <Box
          bg={'surface.higher'}
          p={'md'}
        >
          Box 1
        </Box>
        <Box
          bg={'surface.higher'}
          p={'md'}
          text={'title'}
        >
          Box with title text
        </Box>
        <Box
          as={'button'}
          bg={'surface.higher'}
          p={'md'}
        >
          Polymorphic Box (button)
        </Box>
      </Box>

      <Box text={'title'} mt={'xl'}>Button</Box>
      <Box text={'body'} mb={'md'}>
        Button is a component that can be used to trigger an action. It provides various variants and sizes. It also supports disabled and active states.
      </Box>
      <Box r={'lg'} bc={'surface.higher'} p={'md'} gap={'md'}>
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

      <Box text={'title'} mt={'xl'}>CheckBox</Box>
      <Box text={'body'} mb={'md'}>
        CheckBox is a component that can be used to toggle a boolean value. It provides a name prop for labeling the checkbox. It also supports controlled and uncontrolled usage.
      </Box>
      <Box r={'lg'} bc={'surface.higher'} p={'md'} gap={'md'}>
        <CheckBox name={'CheckBox 1'} />
        {(() => {
          const [checked, setChecked] = createSignal(false);

          return <Box direction={'row'} align={'center'} gap={'md'}>
            <CheckBox
              name={'Controlled CheckBox'}
              checked={checked()}
              onChecked={setChecked}
            />
            <Button onClick={() => setChecked(!checked())}>toggle</Button>
          </Box>;
        })()}
      </Box>

      <Box text={'title'} mt={'xl'}>Popup</Box>
      <Box text={'body'} mb={'md'}>
        Popup is a component that can be used to display a floating element. It provides a placement prop for positioning the popup relative to the trigger element. It also supports controlled and uncontrolled usage.
      </Box>
      <Box r={'lg'} bc={'surface.higher'} p={'md'} gap={'md'}>
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
        {(() => {
          const [popup1, setPopup1] = createSignal(false);

          return (
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
                  const register = createHoverAway(() => setPopup1(false));
                  onCleanup(register(element, { delay: 500 }));
                }}
                onPointerEnter={() => setPopup1(true)}
              >
                Controlled Popup
              </Button>
            </Popup>
          );
        })()}
      </Box>

      <Box text={'title'} mt={'xl'}>Select</Box>
      <Box text={'body'} mb={'md'}>
        Select is a component that can be used to select a value from a list of options. It provides a data prop for the options and a placeholder prop for the placeholder text. It also supports controlled and uncontrolled usage.
      </Box>
      <Box r={'lg'} bc={'surface.higher'} p={'md'} gap={'md'}>
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
        {(() => {
          const [value, setValue] = createSignal<string | null>(null);

          return (
            <Box direction={'row'} align={'center'} gap={'md'}>
              <Select
                value={value()}
                onChangeValue={setValue}
                data={['Controlled Option 1', 'Controlled Option 2', 'Controlled Option 3']}
                placeholder={'placeholder'}
              />
              <Button onClick={() => setValue('Controlled Option 3')}>set value 3</Button>
            </Box>
          );
        })()}
      </Box>
      <Box text={'title'} mt={'xl'}>Input</Box>
      <Box text={'body'} mb={'md'}>
        TODO
      </Box>
      <Box r={'lg'} bc={'surface.higher'} p={'md'} gap={'md'}>
        <Input placeholder={'Type something...'} />
        <Input type={'file'} placeholder={'file'} />
      </Box>
    </Box>
  );
};
