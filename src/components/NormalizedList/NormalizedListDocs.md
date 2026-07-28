# NormalizedList

The basic component for working with lists, including tree-like. You own list state via [useNormalizedList](/docs/lab-usenormalizedlist-docs--docs) and pass it in; NormalizedList handles item rendering, expand/select clicks, and keyboard focus inside the container.

It's supplied with a default UI for demos and exploration. For production, prefer supplying your own UI blocks — see [Customization](#customization).

For Gravity UI use [UIKitNormalizedList](/docs/lab-uikit-uikitnormalizedlist--docs).

## Basic example

```tsx
import {type ListItemType, NormalizedList, useNormalizedList} from '@gravity-ui/normalized-list';

const items: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

const list = useNormalizedList({items});

<NormalizedList list={list} mapItemDataToContentProps={(item) => ({title: item})} />;
```

## Example with state

```tsx
import {type ListItemType, NormalizedList, useNormalizedList} from '@gravity-ui/normalized-list';

const items: ListItemType<{title: string}>[] = [
  {title: 'one'},
  {title: 'two'},
  {title: 'free'},
  {title: 'four'},
  {title: 'five'},
];

const Component = () => {
  const list = useNormalizedList({items});

  const handleItemClick = ({id}) => {
    list.state.setSelected({[id]: true});
  };

  return (
    <NormalizedList
      list={list}
      onItemClick={handleItemClick}
      mapItemDataToContentProps={({title}) => ({title})}
    />
  );
};
```

## Customization

```tsx
<NormalizedList
  list={list}
  mapItemDataToContentProps={(item) => item}
  renderItem={({id, props, context, renderContainerProps}) => (
    <MyItem
      {...props}
      {...renderContainerProps}
      isLast={context.isLastItem}
      onOpenDetails={() => console.log(id)}
    />
  )}
  renderContainer={(props) => <VirtualizedContainer {...props} />}
/>
```

Build selection UX with `list.state` (`selectedById`, `expandedById`, `setSelected`, …) from `useNormalizedList`.

## Props

| Name                      | Description                                                                                                                                |                                                    Type                                                     |     Default     |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------: | :-------------: |
| list                      | Result of the [`useNormalizedList`](/docs/lab-usenormalizedlist-docs--docs) hook                                                           |                                        `UseNormalizedListResult<T>`                                         |                 |
| mapItemDataToContentProps | Maps list item data (`T`) to [`ListItemView`](/docs/lab-usenormalizedlist-listitemview--docs) `content`                                    |                                   `(data: T) => ListItemViewContentType`                                    |                 |
| containerRef              | Ref to the list container DOM node (keyboard navigation, scroll-to-item)                                                                   |                                  `React.RefObject<HTMLDivElement \| null>`                                  |                 |
| className                 | Class name mixed onto the list container                                                                                                   |                                                  `string`                                                   |                 |
| qa                        | Test selector (`data-qa`)                                                                                                                  |                                                  `string`                                                   |                 |
| id                        | Id attribute for the list                                                                                                                  |                                                  `string`                                                   |                 |
| size                      | List item size                                                                                                                             |                                             `s \| m \| l \| xl`                                             |       `m`       |
| multiple                  | Multi-select click behavior (toggle) vs single-select                                                                                      |                                                  `boolean`                                                  |     `false`     |
| renderItem                | Override item rendering (dividers, links, custom rows). Default view is [`ListItemView`](/docs/lab-usenormalizedlist-listitemview--docs)   |                                      `NormalizedListRenderItem<T, P>`                                       |                 |
| renderContainer           | Override list container (virtualization, DnD, empty states). Default is [`ListContainer`](/docs/lab-usenormalizedlist-listcontainer--docs) |                                     `NormalizedListRenderContainer<T>`                                      | `ListContainer` |
| onItemClick               | Override default click behavior. Pass `null` to disable the click handler                                                                  | `null \| ((payload: {id: ListItemId; list: UseNormalizedListResult<T>}, e?: React.SyntheticEvent) => void)` |                 |

## `renderItem` callback props

| Name                 | Description                                                                            |             Type             |   Default   |
| :------------------- | :------------------------------------------------------------------------------------- | :--------------------------: | :---------: |
| id                   | List item id                                                                           |         `ListItemId`         |             |
| data                 | List item data                                                                         |             `T`              |             |
| props                | Prepared [`ListItemView`](/docs/lab-usenormalizedlist-listitemview--docs) common props |  `ListItemViewCommonProps`   |             |
| context              | Item context (`isLastItem`, group/item state, …)                                       |  `ListItemListContextProps`  |             |
| list                 | Result of the [`useNormalizedList`](/docs/lab-usenormalizedlist-docs--docs) hook       | `UseNormalizedListResult<T>` |             |
| index                | Index in the flattened visible ids                                                     |           `number`           |             |
| renderContainerProps | Extra props from a custom `renderContainer`, if any                                    |             `P`              | `undefined` |

## `renderContainer` callback props

| Name         | Description                                                                         |                                       Type                                       | Default |
| :----------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------: | :-----: |
| id           | Id attribute                                                                        |                                     `string`                                     |         |
| list         | Result of the [`useNormalizedList`](/docs/lab-usenormalizedlist-docs--docs) hook    |                           `UseNormalizedListResult<T>`                           |         |
| size         | List item size (passed through from `NormalizedList`)                               |                               `s \| m \| l \| xl`                                |   `m`   |
| className    | Class name mixed onto the container                                                 |                                     `string`                                     |         |
| qa           | Test selector (`data-qa`)                                                           |                                     `string`                                     |         |
| containerRef | Ref to the list container DOM node                                                  |                    `React.RefObject<HTMLDivElement \| null>`                     |         |
| renderItem   | Render a visible item by id/index (optional third arg for container-provided props) | `(id: ListItemId, index: number, renderContainerProps?: P) => React.JSX.Element` |         |
