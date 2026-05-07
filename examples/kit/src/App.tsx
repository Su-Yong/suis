import { createSignal, For, onCleanup } from 'solid-js';
import { Box, Button, CheckBox, Popup, createHoverAway, Select, Input, createTheme, token, useTheme, Tooltip } from '@suis-ui/kit';
import { Moon, Star } from 'lucide-solid';

import { Playground } from './playground';
import { BoxPlayground } from './components/box';

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

      <BoxPlayground />
      <Playground
        title={'Button'}
        description={'test'}
        data={[
          {
            type: 'select',
            name: 'variant',
            description: 'Variant of the button',
            defaultValue: 'default',
            items: ['default', 'primary', 'secondary', 'ghost'],
          },
          {
            type: 'select',
            name: 'size',
            description: 'Size of the button',
            defaultValue: 'md',
            items: ['xs', 'sm', 'md', 'lg', 'xl'],
          },
          {
            type: 'select',
            name: 'type',
            description: 'Type of the button',
            defaultValue: 'button',
            items: ['button', 'icon'],
          },
          {
            type: 'checkbox',
            name: 'disabled',
            description: 'Disabled state of the button',
            defaultValue: false,
          },
          {
            type: 'checkbox',
            name: 'active',
            description: 'Active state of the button',
            defaultValue: false,
          },
          {
            type: 'input',
            name: 'children',
            description: 'Content of the button',
            defaultValue: 'Button',
          }
        ]}
      >
        {(props) => <Button {...props} />}
      </Playground>

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

      <Box text={'title'} mt={'xl'}>Tooltip</Box>
      <Box text={'body'} mb={'md'}>
        TODO
      </Box>
      <Box r={'lg'} bc={'surface.higher'} p={'md'} gap={'md'}>
        <Tooltip
          content={'This is a tooltip'}
        >
          <Button>
            Hover me
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};
