### useNormalizedList

The main hook: normalized list representation (`structure`) and list state (`state`).

#### Props:

| Name                 | Description                                                           |               Type                |  Default   |
| :------------------- | :-------------------------------------------------------------------- | :-------------------------------: | :--------: |
| items                | Flat or tree-like data                                                |        `ListItemType<T>[]`        |            |
| getItemId            | Custom id from item data                                              |     `(itemData: T) => string`     |            |
| defaultExpandedState | Default expand state for nodes with children when `withExpandedState` |      `expanded` \| `closed`       | `expanded` |
| withExpandedState    | Whether nodes with children are expandable                            |             `boolean`             |   `true`   |
| initialState         | Initial state values                                                  | `Partial<InitialListParsedState>` |            |
| controlledState      | Override state with controlled values                                 |       `Partial<ListState>`        |            |

#### Result (`UseNormalizedListResult`):

| Name      | Description                      |      Type       |
| :-------- | :------------------------------- | :-------------: |
| state     | Current list state and setters   |   `ListState`   |
| structure | Normalized list data and helpers | `ListStructure` |

#### ListState:

| Name            | Description                                                |                      Type                       |
| :-------------- | :--------------------------------------------------------- | :---------------------------------------------: |
| selectedById    | Selected items by id                                       |          `Record<ListItemId, boolean>`          |
| disabledById    | Disabled items by id                                       |          `Record<ListItemId, boolean>`          |
| expandedById    | Expanded groups by id (when `withExpandedState` is `true`) |          `Record<ListItemId, boolean>`          |
| activeItemId    | Active item id                                             |           `ListItemId` \| `undefined`           |
| setSelected     | Update selection                                           | `ListStateHandler<Record<ListItemId, boolean>>` |
| setDisabled     | Update disabled map                                        | `ListStateHandler<Record<ListItemId, boolean>>` |
| setExpanded     | Update expanded map (when `withExpandedState` is `true`)   | `ListStateHandler<Record<ListItemId, boolean>>` |
| setActiveItemId | Update active item                                         |   `ListStateHandler<ListItemId \| undefined>`   |

#### ListStructure:

| Name              | Description                                                                                                                                            |                  Type                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------: |
| items             | Original `items` reference                                                                                                                             |          `ListItemType<T>[]`           |
| itemsState        | Per-item meta (`parentId`, `indentation`)                                                                                                              |    `Record<ListItemId, ItemState>`     |
| groupsState       | Group meta (`childrenIds`) when the item is a group                                                                                                    | `Record<ListItemId, GroupParsedState>` |
| itemsById         | Normalized item data by id. Default ids are `{root-index}` / `{root}-{child}-…`. Override via `getItemId` or `id` on the item node (not inside `data`) |        `Record<ListItemId, T>`         |
| rootIds           | Root-level item ids in declaration order                                                                                                               |             `ListItemId[]`             |
| visibleFlattenIds | Visible ids in order (collapsed groups hide descendants)                                                                                               |             `ListItemId[]`             |
| idToFlattenIndex  | Map id → index in `visibleFlattenIds` (useful for DnD / virtualization)                                                                                |      `Record<ListItemId, number>`      |

#### Item variants

```ts
const simple: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

const arbitraryObject: ListItemType<{text: string}>[] = [
  {text: 'one'},
  {text: 'two'},
  {text: 'free'},
  {text: 'four'},
  {text: 'five'},
];

const withNestedChildren: ListItemType<string>[] = [
  {data: 'one'},
  {data: 'two', children: [{data: 'tree', children: [{data: 'four'}, {data: 'five'}]}]},
];

// Prefer `id` on the node, or pass getItemId — ids inside `data` alone are not list ids
const withNestedChildrenComplexExample: ListItemType<{title: string}>[] = [
  {id: '1', disabled: true, data: {title: 'one'}},
  {
    id: '2',
    expanded: true,
    data: {title: 'two'},
    children: [
      {
        id: '3',
        data: {title: 'tree'},
        children: [
          {id: '4', data: {title: 'four'}},
          {id: '5', data: {title: 'five'}},
        ],
      },
    ],
  },
];

// Same with getItemId when the id lives on data:
// useNormalizedList({items, getItemId: (item) => item.id})
```

#### Object declaration reserved properties:

```tsx
interface ListItemInitialProps {
  id?: string;
  disabled?: boolean;
  selected?: boolean;
  expanded?: boolean;
}

type ListFlattenItemType<T> = T extends {} ? T & ListItemInitialProps : T;

interface ListTreeItemType<T> extends ListItemInitialProps {
  data: T;
  children?: ListTreeItemType<T>[];
}

type ListItemType<T> = ListTreeItemType<T> | ListFlattenItemType<T>;
```

#### Controlled values example:

```tsx
const [selectedById, setSelected] = React.useState<Record<ListItemId, boolean>>({});

const list = useNormalizedList({
  items,
  controlledState: {
    selectedById,
    setSelected,
  },
});
```
