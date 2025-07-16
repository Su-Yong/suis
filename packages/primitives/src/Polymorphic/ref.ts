type CallbackRef<T> = (el: T) => void;
type SolidRef<T> = T | CallbackRef<T> | undefined;
export const forwardRef = <T>(callback: CallbackRef<T>, ref: SolidRef<T>): SolidRef<T> => {
  return (el: T) => {
    if (ref && typeof ref === 'function') (ref as CallbackRef<T>)(el);

    callback(el);
  };
};
