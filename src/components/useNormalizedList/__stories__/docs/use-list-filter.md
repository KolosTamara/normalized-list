### useListFilter

Ready-made filtration for tree-like item arrays. Prefer this before writing custom recursive filter logic.

```tsx
import {useListFilter} from '@gravity-ui/tree-select';
```

#### Props:

| Name               | Description                                        |                               Type                               | Default |
| :----------------- | :------------------------------------------------- | :--------------------------------------------------------------: | :-----: |
| items              | Original items (same shape as `useNormalizedList`) |                       `ListItemType<T>[]`                        |         |
| initialFilterValue | Initial filter string                              |                             `string`                             |  `''`   |
| filterItem         | Predicate per leaf data; applied recursively       |              `(value: string, item: T) => boolean`               |         |
| filterItems        | Replace filtration entirely                        | `(value: string, items: ListItemType<T>[]) => ListItemType<T>[]` |         |
| onFilterChange     | Side effect when filter string changes             |                    `(value: string) => void`                     |         |
| debounceTimeout    | Delay before applying the filtered result          |                             `number`                             |  `300`  |

#### Returns:

| Name           | Description                   |                Type                 |
| :------------- | :---------------------------- | :---------------------------------: |
| filterRef      | Ref for the filter input      | `React.RefObject<HTMLInputElement>` |
| filter         | Current filter value          |              `string`               |
| reset          | Reset filter to initial value |            `() => void`             |
| items          | Filtered items                |         `ListItemType<T>[]`         |
| onFilterUpdate | Update filter value           |     `(filter: string) => void`      |

#### Usage example:

```tsx
import {useNormalizedList, useListFilter} from '@gravity-ui/tree-select';

const List = () => {
  const {items, filter, onFilterUpdate, filterRef} = useListFilter({
    items: sourceItems,
  });

  const list = useNormalizedList({items});

  return <input ref={filterRef} value={filter} onChange={(e) => onFilterUpdate(e.target.value)} />;
};
```
