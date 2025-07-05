import { type ComponentProps, mergeProps, splitProps, type ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export type PolymorphicProps<T extends ValidComponent> = ComponentProps<T> & {
  as?: T;
};
export const Polymorphic = <T extends ValidComponent>(props: PolymorphicProps<T>) => {
  const [local, rest] = splitProps(
    mergeProps({ as: 'div' }, props),
    ['as'],
  );

  return (
    // @ts-ignore: TS cannot infer the correct type
    <Dynamic
      component={local.as}
      {...rest}
    />
  );
};
