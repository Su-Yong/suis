import { createSignal } from 'solid-js';
import { Box, Button, CheckBox, DefaultComponentClass, Input, Item, Select } from '@suis-ui/kit';
import { DefaultLightThemeClass, DefaultTokenClass } from '@/theme/token';

export interface KitLiveDemoProps {
  title?: string;
  initialCount?: number;
}

type DemoSize = 'sm' | 'md' | 'lg';

const sizeOptions = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
];

const isDemoSize = (value: string | null): value is DemoSize => (
  value === 'sm' || value === 'md' || value === 'lg'
);

export default function KitLiveDemo(props: KitLiveDemoProps) {
  const [name, setName] = createSignal('VitePress');
  const [count, setCount] = createSignal(props.initialCount ?? 0);
  const [compact, setCompact] = createSignal(false);
  const [size, setSize] = createSignal<DemoSize>('md');

  const resetCount = () => setCount(props.initialCount ?? 0);
  const selectedSizeLabel = () => (
    sizeOptions.find((option) => option.value === size())?.label ?? size()
  );

  return (
    <Box
      class={`solid-kit-demo ${DefaultTokenClass} ${DefaultLightThemeClass} ${DefaultComponentClass}`}
      bg="surface.main"
      c="text.main"
      bc="surface.higher"
      bd="md"
      r="lg"
      p={compact() ? 'md' : 'lg'}
      gap={compact() ? 'sm' : 'md'}
      shadow="sm"
    >
      <Box gap="xs">
        <Box as="span" text="caption" c="text.caption">
          SolidJS widget mounted inside VitePress
        </Box>
        <Box as="strong" text="h3">
          {props.title ?? 'SUIS Kit Live Demo'}
        </Box>
      </Box>

      <div class="solid-kit-demo__fields">
        <Box as="label" gap="xs">
          <Box as="span" text="caption" c="text.caption">
            Name
          </Box>
          <Input
            value={name()}
            placeholder="Enter a name"
            onInput={(event) => setName(event.currentTarget.value)}
          />
        </Box>

        <Box as="label" gap="xs">
          <Box as="span" text="caption" c="text.caption">
            Button size
          </Box>
          <Select
            data={sizeOptions}
            value={size()}
            onChangeValue={(value) => {
              if (isDemoSize(value)) setSize(value);
            }}
            placeholder="Choose a size"
            renderValue={(value) => (
              sizeOptions.find((option) => option.value === value)?.label ?? value
            )}
          />
        </Box>
      </div>

      <CheckBox
        name="Compact layout"
        checked={compact()}
        onChecked={setCompact}
      />

      <Box direction="row" wrap="wrap" gap="sm">
        <Button
          variant="primary"
          size={size()}
          props={{ type: 'button' }}
          onClick={() => setCount(count() + 1)}
        >
          Add click
        </Button>
        <Button
          variant="secondary"
          size={size()}
          props={{ type: 'button' }}
          onClick={resetCount}
        >
          Reset
        </Button>
      </Box>

      <Item
        title={`${name() || 'Anonymous'} clicked ${count()} time${count() === 1 ? '' : 's'}`}
        description={`${selectedSizeLabel()} button - ${compact() ? 'compact' : 'comfortable'} layout`}
        action={(
          <Button
            variant="ghost"
            size="sm"
            active={compact()}
            props={{ type: 'button' }}
            onClick={() => setCompact(!compact())}
          >
            Toggle
          </Button>
        )}
      />
    </Box>
  );
}
