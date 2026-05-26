<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    initialCount?: number;
  }>(),
  {
    title: 'SUIS Kit Live Demo',
    initialCount: 0,
  },
);

const host = ref<HTMLElement | null>(null);

let dispose: (() => void) | undefined;
let isMounted = false;
let mountVersion = 0;

async function mount() {
  const currentVersion = ++mountVersion;
  const currentHost = host.value;

  if (!currentHost) return;

  dispose?.();
  dispose = undefined;

  const { mountKitLiveDemo } = await import('../solid/mountKitLiveDemo.solid');

  if (!isMounted || currentVersion !== mountVersion || host.value !== currentHost) return;

  dispose = mountKitLiveDemo(currentHost, {
    title: props.title,
    initialCount: props.initialCount,
  });
}

onMounted(() => {
  isMounted = true;
  void mount();
});

watch(
  () => [props.title, props.initialCount] as const,
  () => {
    if (isMounted) void mount();
  },
);

onBeforeUnmount(() => {
  isMounted = false;
  mountVersion += 1;
  dispose?.();
  dispose = undefined;
});
</script>

<template>
  <div ref="host" class="solid-kit-demo-host" />
</template>

<style scoped>
.solid-kit-demo-host {
  margin: 1rem 0;
}

.solid-kit-demo-host :deep(.solid-kit-demo) {
  width: 100%;
  max-width: 42rem;
  box-sizing: border-box;
}

.solid-kit-demo-host :deep(.solid-kit-demo__fields) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 0.75rem;
}
</style>
