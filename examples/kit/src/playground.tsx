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

type SinglePlaygroundData = InputPlaygroundData | SelectPlaygroundData | CheckBoxPlaygroundData;
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

  const [backgroundType, setBackgroundType] = createSignal('light');

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
      maxH={'60vh'}
      justify={'flex-start'}
      align={'stretch'}
      gap={'xs'}
      mt={'xl'}
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
        r={'lg'}
        gap={'md'}
        mt={'md'}
        style={{ overflow: 'hidden' }}
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
            style={{
              top: vars.size.space.md,
              right: vars.size.space.md,
            }}
          >
            <Select
              value={backgroundType()}
              data={['light', 'dark']}
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
          style={{ overflow: 'auto' }}
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

            <Box pl={'md'} gap={'md'} bc={'surface.higher'} style={{ 'border-style': 'none', "border-left-style": 'solid' }}>
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
        <Box direction={'row'} justify={'space-between'} align={'center'} gap={'xs'}>
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
          </Switch>
        </Box>
      </Match>
    </Switch>
  );
};
