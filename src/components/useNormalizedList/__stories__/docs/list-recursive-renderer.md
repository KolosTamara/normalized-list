### ListRecursiveRenderer

Renders a tree node and its children while preserving nested HTML (`ul` / group role). Respects `expandedById`.

Usually you do not need this unless you reimplement [`ListContainer`](/docs/normalized-list-usenormalizedlist-listcontainer--docs).

#### Props:

| Name       | Description                        |                          Type                          | Default |
| :--------- | :--------------------------------- | :----------------------------------------------------: | :-----: |
| id         | Current node id                    |                      `ListItemId`                      |         |
| list       | Result of `useNormalizedList`      |              `UseNormalizedListResult<T>`              |         |
| itemSchema | Original item (flat or tree node)  |                   `ListItemType<T>`                    |         |
| children   | Render visible row by id and index | `(id: ListItemId, index: number) => React.JSX.Element` |         |
| style      | Inline styles on group `ul`        |                 `React.CSSProperties`                  |         |
| className  | Class on group `ul`                |                        `string`                        |         |

#### Usage example:

```tsx
import {
  type ListItemType,
  ListContainerView,
  ListItemRecursiveRenderer,
  ListItemView,
  getItemRenderState,
  getListItemClickHandler,
  useNormalizedList,
} from '@gravity-ui/normalized-list';

const items: ListItemType<string>[] = [
  {data: 'one'},
  {data: 'two', children: [{data: 'tree', children: [{data: 'four'}, {data: 'five'}]}]},
];

function List() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const list = useNormalizedList({items});
  const onItemClick = getListItemClickHandler({list});

  return (
    <ListContainerView ref={containerRef}>
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
              mapItemDataToContentProps: (title) => ({title}),
              onItemClick,
              list,
            });

            return <ListItemView {...props} />;
          }}
        </ListItemRecursiveRenderer>
      ))}
    </ListContainerView>
  );
}
```
