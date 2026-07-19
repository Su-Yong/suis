import { createContext, useContext } from 'solid-js';
import type { SetStoreFunction } from 'solid-js/store';

export type SliderTo = 'right' | 'left' | 'top' | 'bottom';
export type SliderOrientation = 'horizontal' | 'vertical';

export type SliderThumbRegistration = {
  id: symbol;
  disabled: () => boolean;
  element: () => HTMLElement | null;
};

export type SliderContextType = {
  values: number[];
  min: number;
  max: number;
  step: number;
  to: SliderTo | undefined;
  disabled: boolean;
  rail: HTMLElement | null;
  thumbs: SliderThumbRegistration[];
  focusHistory: symbol[];
  onChangeValues: (values: number[]) => void;
};

type SliderContextValue = [SliderContextType, SetStoreFunction<SliderContextType>];

export const SliderContext = createContext<SliderContextValue>();

export const useSliderContext = () => {
  const context = useContext(SliderContext);

  if (!context) {
    throw new Error('useSlider must be used within a Slider');
  }

  return context;
};
