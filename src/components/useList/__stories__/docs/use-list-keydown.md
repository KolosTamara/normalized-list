### useListKeydown

Keyboard support for tree/list containers (arrow up/down, Enter/Space).

[`TreeList`](/docs/lab-treelist--docs) already wires this — call it only in custom list shells.

#### Props:

| Name         | Description                                                     |                              Type                               | Default |
| :----------- | :-------------------------------------------------------------- | :-------------------------------------------------------------: | :-----: |
| list         | Result of `useList`                                             |                         `UseListResult`                         |         |
| onItemClick  | Called on `Enter` / `Space`                                     | `(payload: {id: ListItemId}, e?: React.SyntheticEvent) => void` |         |
| containerRef | Ref to the list container DOM node                              |            `React.RefObject<HTMLDivElement \| null>`            |         |
| enabled      | When `true`, keyboard handling is **disabled** (runtime toggle) |                            `boolean`                            |         |

#### Usage example:

```tsx
import {useList, useListKeydown, getListItemClickHandler} from '@gravity-ui/tree-select';

const containerRef = React.useRef<HTMLDivElement>(null);
const list = useList({items});
const onItemClick = getListItemClickHandler({list});

useListKeydown({
  onItemClick,
  containerRef,
  list,
});
```
