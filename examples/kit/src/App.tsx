import { For } from 'solid-js';
import { Box, Button, createTheme, Item, token, useTheme } from '@suis-ui/kit';
import { ChevronRight, Moon } from 'lucide-solid';

import { BoxPlayground } from './components/box';
import { ButtonPlayground } from './components/button';
import { CheckboxPlayground } from './components/checkbox';
import { PopupPlayground } from './components/popup';
import { SelectPlayground } from './components/select';
import { InputPlayground } from './components/input';
import { ItemPlayground } from './components/item';
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
      overflow={'auto'}
      style={{
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
        top={'0'}
        z={100}
        bc={'surface.higher'}
        bbd={'md'}
        style={{
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
        m={'xl'}
        top={'5.6rem'}
        left={'0'}
        z={100}
      >
        <Box
          as={'ul'}
          bg={'surface.main'}
          bc={'surface.higher'}
          bd={'md'}
          p={'xs'}
          r={'lg'}
          gap={'xs'}
          shadow={'sm'}
        >
          <For each={['Box', 'Button', 'Checkbox', 'Popup', 'Select', 'Input', 'Item', 'Tooltip']}>
            {(item) => (
              <Box as={'li'} w={'100%'}>
                <Item
                  as={Button}
                  variant={'ghost'}
                  title={item}
                  action={<Box as={ChevronRight} w={'1.6rem'} h={'1.6rem'} />}
                  onClick={() => {
                    const element = document.querySelector(`#${item}`);
                    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                />
              </Box>
            )}
          </For>
        </Box>
      </Box>

      <Box
        pos={'relative'}
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
        <ItemPlayground />
        <TooltipPlayground />
      </Box>
    </Box>
  );
};
