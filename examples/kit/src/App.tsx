import { For } from 'solid-js';
import { Box, Button, createTheme, token, useTheme } from '@suis-ui/kit';
import { Moon } from 'lucide-solid';

import { BoxPlayground } from './components/box';
import { ButtonPlayground } from './components/button';
import { CheckboxPlayground } from './components/checkbox';
import { PopupPlayground } from './components/popup';
import { SelectPlayground } from './components/select';
import { InputPlayground } from './components/input';
import { TooltipPlayground } from './components/tooltip';

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
      align={'center'}
      style={{
        overflow: 'auto',
        'scroll-behavior': 'smooth',
        'scroll-snap-align': 'center'
      }}
    >
      <Box
        as={'header'}
        pos={'sticky'}
        w={'100%'}
        h={'5.6rem'}
        direction={'row'}
        justify={'space-between'}
        align={'center'}
        gap={'md'}
        p={'md'}
        zIndex={1}
        bc={'surface.higher'}
        style={{
          top: 0,
          'z-index': 100,
          'backdrop-filter': 'blur(10px)',
        }}
      >
        <Box text={'title'}>
          SUIS Playground
        </Box>

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
      <Box
        as={'aside'}
        pos={'absolute'}
        w={'20rem'}
        m={'md'}
        style={{
          top: '5.6rem',
          left: 0,
          'z-index': 100,
        }}
      >
        <Box
          as={'ul'}
          bg={'surface.main'}
          bc={'surface.higher'}
          p={'xs'}
          r={'md'}
          gap={'xs'}
        >
          <For each={['Box', 'Button', 'Checkbox', 'Popup', 'Select', 'Input', 'Tooltip']}>
            {(item) => (
              <Box as={'li'} w={'100%'}>
                <Button as={'a'} href={`#${item}`} variant={'ghost'} w={'100%'} align={'flex-start'}>
                  {item}
                </Button>
              </Box>)}
          </For>
        </Box>
      </Box>

      <Box
        w={'100%'}
        maxW={'120rem'}
        direction={'column'}
        justify={'flex-start'}
        align={'stretch'}
        gap={'xl'}
        p={'lg'}
      >
        <BoxPlayground />
        <ButtonPlayground />
        <CheckboxPlayground />
        <PopupPlayground />
        <SelectPlayground />
        <InputPlayground />
        <TooltipPlayground />
      </Box>
    </Box>
  );
};
