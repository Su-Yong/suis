import { JSX, splitProps } from 'solid-js';

import { useCheckBoxContext } from './CheckBoxContext';

export type CheckBoxIndicatorProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'>;
export const CheckBoxIndicator = (props: CheckBoxIndicatorProps) => {
  const [local, rest] = splitProps(props, ['children']);

  const context = useCheckBoxContext();

  return (
    <>
      <input
        {...rest}
        type={'checkbox'}
        id={context.id}
      />
      {local.children}
    </>
  );
};
