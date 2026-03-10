import { Accessor } from 'solid-js';

import { usePopup as useBasePopup } from '@suis/primitives';

type PlacementOffset = 0 | 0.5 | 1;
type PlacementOffsets = {
  x: PlacementOffset;
  y: PlacementOffset;
};
export const usePlacement = (): Accessor<PlacementOffsets> => {
  const [context] = useBasePopup();

  return () => {
    const placement = context.position?.placement;
    if (!placement) return { x: 0.5, y: 0.5 };

    let x: PlacementOffset = 0.5;
    let y: PlacementOffset = 0.5;

    if (placement.startsWith('top')) y = 1;
    if (placement.startsWith('bottom')) y = 0;
    if (placement.startsWith('left')) x = 1;
    if (placement.startsWith('right')) x = 0;

    if (placement.endsWith('-start')) {
      if (placement.startsWith('top') || placement.startsWith('bottom')) x = 0;
      else y = 0;
    }
    if (placement.endsWith('-end')) {
      if (placement.startsWith('top') || placement.startsWith('bottom')) x = 1;
      else y = 1;
    }

    return { x, y };
  };
};
