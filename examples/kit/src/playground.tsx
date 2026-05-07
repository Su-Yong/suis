import { Box, Button, CheckBox, Input, Select, SelectData, SelectItem, SelectItemProps, vars } from '@suis-ui/kit';
import { ChevronDown, ChevronUp } from 'lucide-solid';
import { createEffect, createSignal, For, JSX, Match, Show, Switch } from 'solid-js';
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
type NumberPlaygroundData = BasePlaygroundData & {
  type: 'number';
  placeholder?: string;
  defaultValue?: number;
};
type SelectPlaygroundData = BasePlaygroundData & {
  type: 'select';
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  items: SelectData[];
  renderer?: (itemProps: SelectData) => JSX.Element;
};
type CheckBoxPlaygroundData = BasePlaygroundData & {
  type: 'checkbox';
  defaultValue?: boolean;
};
type JsonPlaygroundData = BasePlaygroundData & {
  type: 'json';
  defaultValue?: unknown;
};

type SinglePlaygroundData = InputPlaygroundData | NumberPlaygroundData | SelectPlaygroundData | CheckBoxPlaygroundData | JsonPlaygroundData;
type GroupPlaygroundData = {
  type: 'group';
  name: string;
  description?: string;
  expand?: boolean;
  items: PlaygroundData[];
};
export type PlaygroundData = SinglePlaygroundData | GroupPlaygroundData;
export type PlaygroundProps = {
  title: string;
  description: string;

  data: PlaygroundData[];
  children?: (data: Record<string, unknown>) => JSX.Element;
};
export const Playground = (props: PlaygroundProps) => {
  const [playgroundData, setPlaygroundData] = createStore<Record<string, unknown>>({});

  const [backgroundType, setBackgroundType] = createSignal('auto');

  createEffect(() => {
    const initPlaygroundData: Record<string, unknown> = {};

    props.data.forEach((data) => {
      if ('defaultValue' in data) {
        initPlaygroundData[data.name] = data.defaultValue;
      }
    });

    setPlaygroundData(initPlaygroundData);
  });

  return (
    <Box
      id={props.title}
      as={'section'}
      w={'100%'}
      maxH={'60vh'}
      justify={'flex-start'}
      align={'stretch'}
      gap={'xs'}
    >
      <Box text={'title'}>
        {props.title}
      </Box>
      <Box text={'body'} c={'text.caption'}>
        {props.description}
      </Box>
      <Box
        direction={'row'}
        align={'stretch'}
        bc={'surface.higher'}
        bd={'md'}
        r={'lg'}
        gap={'md'}
        mt={'md'}
        overflow={'hidden'}
      >
        <Box
          flex
          pos={'relative'}
          justify={'center'}
          align={'center'}
          bg={(
            backgroundType() === 'light' ? 'gray.100' :
              backgroundType() === 'dark' ? 'gray.900' :
                'surface.high'
          )}
          p={'md'}
          gap={'md'}
        >
          <Box
            pos={'absolute'}
            t={vars.size.space.md}
            r={vars.size.space.md}
          >
            <Select
              value={backgroundType()}
              data={['auto', 'light', 'dark']}
              onChangeValue={(value: string | null) => value && setBackgroundType(value)}
            />
          </Box>
          <Dynamic component={props.children} {...playgroundData} />
        </Box>
        <Box
          w={'40rem'}
          direction={'column'}
          justify={'flex-start'}
          align={'stretch'}
          gap={'md'}
          p={'md'}
          overflow={'auto'}
        >
          <For each={props.data}>
            {(data) => (
              <DataRenderer
                data={data}
                state={playgroundData}
                initialExpand={data.type === 'group' ? (data as GroupPlaygroundData).expand : undefined}
                onStateChange={(name, value) => setPlaygroundData(name, value)}
              />
            )}
          </For>
        </Box>
      </Box>
    </Box>
  );
};

type DataRendererProps = {
  data: PlaygroundData;
  state: Record<string, unknown>;
  onStateChange: (name: string, value: unknown) => void;
  initialExpand?: boolean;
};
const DataRenderer = (props: DataRendererProps) => {
  const [expand, setExpand] = createSignal(props.initialExpand ?? true);

  const isVertical = () => props.data.type === 'json';

  return (
    <Switch>
      <Match when={props.data.type === 'group'}>
        <Box gap={'md'}>
          <Box direction={'row'} justify={'space-between'} align={'center'}>
            <Box>
              <Box text={'body'}>
                {props.data.name}
              </Box>
              <Show when={props.data.description}>
                <Box text={'caption'} c={'text.caption'}>
                  {props.data.description}
                </Box>
              </Show>
            </Box>
            <Button
              type={'icon'}
              variant={'ghost'}
              size={'sm'}
              r={'full'}
              onClick={() => setExpand(!expand())}
            >
              <Box as={expand() ? ChevronUp : ChevronDown} w={'1.6rem'} h={'1.6rem'} />
            </Button>
          </Box>
          <Show when={expand()}>

            <Box pl={'md'} gap={'md'} blc={'surface.higher'} bdl={'md'}>
              <For each={(props.data as GroupPlaygroundData).items}>
                {(item) => (
                  <DataRenderer
                    data={item}
                    state={props.state}
                    initialExpand={item.type === 'group' ? (item as GroupPlaygroundData).expand : undefined}
                    onStateChange={(name, value) => props.onStateChange(name, value)}
                  />
                )}
              </For>
            </Box>
          </Show>
        </Box>
      </Match>
      <Match when={props.data.type !== 'group'}>
        <Box
          direction={isVertical() ? 'column' : 'row'}
          justify={isVertical() ? 'center' : 'space-between'}
          align={isVertical() ? 'flex-start' : 'center'}
          gap={'xs'}
        >
          <Box>
            <Box text={'body'}>
              {props.data.name}
            </Box>
            <Show when={props.data.description}>
              <Box text={'caption'} c={'text.caption'}>
                {props.data.description}
              </Box>
            </Show>
          </Box>
          <Switch>
            <Match when={props.data.type === 'number'}>
              <Input
                type={'number'}
                value={props.state[props.data.name] as string}
                placeholder={(props.data as NumberPlaygroundData).placeholder}
                onChange={(e) => props.onStateChange(props.data.name, e.currentTarget.value)}
              />
            </Match>
            <Match when={props.data.type === 'input'}>
              <Input
                value={props.state[props.data.name] as string}
                placeholder={(props.data as InputPlaygroundData).placeholder}
                onChange={(e) => props.onStateChange(props.data.name, e.currentTarget.value)}
              />
            </Match>
            <Match when={props.data.type === 'select'}>
              <Select
                required={(props.data as SelectPlaygroundData).required}
                data={(props.data as SelectPlaygroundData).items}
                placeholder={(props.data as SelectPlaygroundData).placeholder}
                value={props.state[props.data.name] as string}
                onChangeValue={(value: string | null) => props.onStateChange(props.data.name, value)}
                renderItem={(itemProps: SelectItemProps) => (
                  <SelectItem {...itemProps}>
                    <Box direction={'row'} align={'center'} gap={'md'}>
                      <Dynamic component={(props.data as SelectPlaygroundData).renderer} value={itemProps.value} />
                      {itemProps.children}
                    </Box>
                  </SelectItem>
                )}
              />
            </Match>
            <Match when={props.data.type === 'checkbox'}>
              <CheckBox
                checked={props.state[props.data.name] as boolean}
                onChecked={(checked: boolean) => props.onStateChange(props.data.name, checked)}
              />
            </Match>
            <Match when={props.data.type === 'json'}>
              <Input
                as={'textarea'}
                value={JSON.stringify(props.state[props.data.name], null, 2)}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  try {
                    const json = JSON.parse(value);
                    props.onStateChange(props.data.name, json);
                  } catch (error) {
                    props.onStateChange(props.data.name, props.state[props.data.name]);
                  }
                }}
              />
            </Match>
          </Switch>
        </Box>
      </Match>
    </Switch>
  );
};
