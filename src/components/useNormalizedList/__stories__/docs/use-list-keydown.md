### useListKeydown

Keyboard support for tree/list containers (arrow up/down, Enter/Space).

[`NormalizedList`](/docs/lab-normalizedlist--docs) already wires this — call it only in custom list shells.

#### Props:

| Name         | Description                                                     |                              Type                               | Default |
| :----------- | :-------------------------------------------------------------- | :-------------------------------------------------------------: | :-----: |
| list         | Result of `useNormalizedList`                                   |                    `UseNormalizedListResult`                    |         |
| onItemClick  | Called on `Enter` / `Space`                                     | `(payload: {id: ListItemId}, e?: React.SyntheticEvent) => void` |         |
| containerRef | Ref to the list container DOM node                              |            `React.RefObject<HTMLDivElement \| null>`            |         |
| enabled      | When `true`, keyboard handling is **disabled** (runtime toggle) |                            `boolean`                            |         |

#### Usage example:

```tsx
import {
  useNormalizedList,
  useListKeydown,
  getListItemClickHandler,
} from '@gravity-ui/normalized-list';

const containerRef = React.useRef<HTMLDivElement>(null);
const list = useNormalizedList({items});
const onItemClick = getListItemClickHandler({list});

useListKeydown({
  onItemClick,
  containerRef,
  list,
});
```
