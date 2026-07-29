### getListItemClickHandler

Default click behavior: activate item; toggle expand on groups; select (single or multi) on leaves.

```tsx
import {getListItemClickHandler} from '@gravity-ui/normalized-list';
```

#### Props:

| Name     | Description                   |           Type            | Default |
| :------- | :---------------------------- | :-----------------------: | :-----: |
| list     | Result of `useNormalizedList` | `UseNormalizedListResult` |         |
| multiple | Multi-select toggle vs single |         `boolean`         |         |

#### Result:

`onItemClick` callback: `(payload: {id: ListItemId}, e?: React.SyntheticEvent) => void`

#### Usage example:

```tsx
const filterState = useListFilter({items});
const list = useNormalizedList({items: filterState.items});
const onItemClick = getListItemClickHandler({list, multiple: true});

useListKeydown({
  containerRef,
  onItemClick,
  list,
});
```
