### getItemRenderState

Maps `useList` state + structure to `ListItemView` props for a given id.

```tsx
import {
  ListItemView,
  getItemRenderState,
  getListItemClickHandler,
  useList,
} from '@gravity-ui/tree-select';

const list = useList({items});
const onItemClick = getListItemClickHandler({list});

const {data, props, context} = getItemRenderState({
  qa: 'some-qa-id',
  id,
  multiple: true,
  size,
  onItemClick,
  mapItemDataToContentProps: (item) => ({title: item.title}),
  list,
});

return <ListItemView {...props} />;
```

#### Props:

| Name                      | Description                                     |                  Type                  | Default |
| :------------------------ | :---------------------------------------------- | :------------------------------------: | :-----: |
| id                        | List item id                                    |              `ListItemId`              |         |
| list                      | Result of `useList`                             |            `UseListResult`             |         |
| multiple                  | Multi-select view                               |               `boolean`                | `false` |
| onItemClick               | Optional click handler                          |           `ListOnItemClick`            |         |
| size                      | Item size                                       |          `s \| m \| l \| xl`           |   `m`   |
| mapItemDataToContentProps | Map item data (`T`) to `ListItemView` `content` | `(data: T) => ListItemViewContentType` |         |
| qa                        | Base test id (per-item via `getListItemQa`)     |                `string`                |         |

#### Returns:

| Name    | Description                                         |            Type            |
| :------ | :-------------------------------------------------- | :------------------------: |
| data    | Item data for this id                               |            `T`             |
| props   | Prepared `ListItemView` common props                | `ListItemViewCommonProps`  |
| context | Item/group context (`indentation`, `isLastItem`, …) | `ListItemListContextProps` |

#### Usage with recursive renderer:

```tsx
import {
  ListContainerView,
  ListItemRecursiveRenderer,
  ListItemView,
  getItemRenderState,
  getListItemClickHandler,
  useList,
} from '@gravity-ui/tree-select';

const list = useList({items});
const onItemClick = getListItemClickHandler({list});

<ListContainerView>
  {list.structure.items.map((itemSchema, index) => (
    <ListItemRecursiveRenderer
      key={index}
      itemSchema={itemSchema}
      id={list.structure.rootIds[index]}
      list={list}
    >
      {(id) => {
        const {props} = getItemRenderState({
          id,
          onItemClick,
          mapItemDataToContentProps: (title) => ({title}),
          list,
        });

        return <ListItemView {...props} />;
      }}
    </ListItemRecursiveRenderer>
  ))}
</ListContainerView>;
```
