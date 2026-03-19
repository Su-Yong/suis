import { Box, CheckBox, Input, Select } from '@suis/ui';
import { createEffect, For, JSX, Match, Show, Switch } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';

type BasePlaygroundData = {
  name: string;
  description?: string;
};
type InputPlaygroundData = BasePlaygroundData & {
  type: 'input';
  placeholder?: string;
  defaultValue?: string;
};
type SelectPlaygroundData = BasePlaygroundData & {
  type: 'select';
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  items: string[];
};
type CheckBoxPlaygroundData = BasePlaygroundData & {
  type: 'checkbox';
  defaultValue?: boolean;
};
type PlaygroundData = InputPlaygroundData | SelectPlaygroundData | CheckBoxPlaygroundData;
export type PlaygroundProps = {
  title: string;
  description: string;

  data: PlaygroundData[];
  children?: (data: Record<string, unknown>) => JSX.Element;
};
export const Playground = (props: PlaygroundProps) => {
  const [playgroundData, setPlaygroundData] = createStore<Record<string, unknown>>({});

  createEffect(() => {
    const initPlaygroundData: Record<string, unknown> = {};

    props.data.forEach((data) => {
      if (data.type === 'input' && (data as InputPlaygroundData).defaultValue !== undefined) {
        initPlaygroundData[data.name] = (data as InputPlaygroundData).defaultValue;
      } else if (data.type === 'select' && (data as SelectPlaygroundData).defaultValue !== undefined) {
        initPlaygroundData[data.name] = (data as SelectPlaygroundData).defaultValue;
      } else if (data.type === 'checkbox' && (data as CheckBoxPlaygroundData).defaultValue !== undefined) {
        initPlaygroundData[data.name] = (data as CheckBoxPlaygroundData).defaultValue;
      }
    });

    setPlaygroundData(initPlaygroundData);
  });

  return (
    <Box
      w={'100%'}
      justify={'flex-start'}
      align={'stretch'}
      gap={'xs'}
      mt={'xl'}
    >
      <Box text={'title'}>
        {props.title}
      </Box>
      <Box text={'body'}>
        {props.description}
      </Box>
      <Box
        direction={'row'}
        align={'stretch'}
        bc={'surface.higher'}
        r={'lg'}
        gap={'md'}
        mt={'md'}
        style={{ overflow: 'hidden' }}
      >
        <Box
          flex
          justify={'center'}
          align={'center'}
          bg={'surface.high'}
          p={'md'}
          gap={'md'}
        >
          <Dynamic component={props.children} {...playgroundData} />
        </Box>
        <Box
          w={'40rem'}
          direction={'column'}
          justify={'flex-start'}
          align={'stretch'}
          gap={'md'}
          p={'md'}
        >
          <For each={props.data}>
            {(data) => (
              <Box direction={'row'} justify={'space-between'} align={'center'} gap={'xs'}>
                <Box>
                  <Box text={'body'}>
                    {data.name}
                  </Box>
                  <Show when={data.description}>
                    <Box text={'caption'} c={'text.caption'}>
                      {data.description}
                    </Box>
                  </Show>
                </Box>
                <Switch>
                  <Match when={data.type === 'input'}>
                    <Input
                      value={playgroundData[data.name] as string}
                      placeholder={(data as InputPlaygroundData).placeholder}
                      onChange={(e) => setPlaygroundData(data.name, e.currentTarget.value)}
                    />
                  </Match>
                  <Match when={data.type === 'select'}>
                    <Select
                      required={(data as SelectPlaygroundData).required}
                      data={(data as SelectPlaygroundData).items}
                      placeholder={(data as SelectPlaygroundData).placeholder}
                      value={playgroundData[data.name] as string}
                      onChangeValue={(value: string | null) => setPlaygroundData(data.name, value)}
                    />
                  </Match>
                  <Match when={data.type === 'checkbox'}>
                    <CheckBox
                      checked={playgroundData[data.name] as boolean}
                      onChecked={(checked: boolean) => setPlaygroundData(data.name, checked)}
                    />
                  </Match>
                </Switch>
              </Box>
            )}
          </For>
        </Box>
      </Box>
    </Box>
  )
};
