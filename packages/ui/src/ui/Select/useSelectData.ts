import { Accessor, createMemo } from 'solid-js';

type SimpleSelectData = string;
type SingleSelectData = {
  value: string;
  label: string;
};
type GroupedSelectData = {
  label: string;
  options: SimpleSelectData[] | SingleSelectData[];
};
export type SelectData = SimpleSelectData | SingleSelectData | GroupedSelectData;

type InnerSelectData = {
  value: string;
  label: string;
  group?: string;
};
export const useSelectData = <T extends SelectData>(data: Accessor<T[]>) => {
  const list = createMemo(() => {
    const raw = data();
    const result: InnerSelectData[] = [];

    raw.forEach((item) => {
      if (isSimpleSelectData(item)) {
        result.push({
          value: item,
          label: item,
        });
      } else if (isSingleSelectData(item)) {
        result.push({
          value: item.value,
          label: item.label,
        });
      } else if (isGroupedSelectData(item)) {
        item.options.forEach((option) => {
          if (isSimpleSelectData(option)) {
            result.push({
              value: option,
              label: option,
              group: item.label,
            });
          } else if (isSingleSelectData(option)) {
            result.push({
              value: option.value,
              label: option.label,
              group: item.label,
            });
          }
        });
      }
    });

    return result;
  });

  const groupedList = createMemo(() => {
    const map = new Map<string, InnerSelectData[]>();

    list().forEach((item) => {
      const group = item.group ?? '';
      if (!map.has(group)) map.set(group, []);

      map.get(group)!.push(item);
    });

    return Array.from(map.entries()).map(([group, data]) => ({
      group: group === '' ? null : group,
      data,
    }));
  });

  return {
    list,
    groupedList,
  };
};

const isSimpleSelectData = (data: SelectData): data is SimpleSelectData => typeof data === 'string';
const isSingleSelectData = (data: SelectData): data is SingleSelectData => typeof data === 'object' && 'value' in data && 'label' in data;
const isGroupedSelectData = (data: SelectData): data is GroupedSelectData => typeof data === 'object' && 'label' in data && 'options' in data;
