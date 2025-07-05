import { JSX } from 'solid-js';

import { useCheckBoxContext } from './CheckBoxContext';

export type CheckBoxLabelProps = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, 'for'>;
export const CheckBoxLabel = (props: CheckBoxLabelProps) => {
  const context = useCheckBoxContext();

  return (
    <label
      {...props}
      for={context.id}
    >
      {props.children}
    </label>
  );
};
