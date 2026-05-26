import { render } from 'solid-js/web';
import KitLiveDemo, { type KitLiveDemoProps } from './KitLiveDemo.solid';

export function mountKitLiveDemo(
  el: HTMLElement,
  props: KitLiveDemoProps = {},
): () => void {
  return render(() => <KitLiveDemo {...props} />, el);
}
