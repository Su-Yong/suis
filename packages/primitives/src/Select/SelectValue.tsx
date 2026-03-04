import { JSX } from 'solid-js';

import { useSelect } from './SelectContext';

type SelectValueProps = {
  children: (value: string | null) => JSX.Element;
};
export const SelectValue = (props: SelectValueProps) => {
  const { value } = useSelect();

  return (
    <>
      {props.children(value())}
    </>
  );
};
