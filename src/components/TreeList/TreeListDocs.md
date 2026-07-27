# TreeList

The basic component for working with lists, including tree-like. You own list state via [useList](/docs/lab-uselist--docs) and pass it in; TreeList handles item rendering, expand/select clicks, and keyboard focus inside the container.

It's supplied with a default UI for demos and exploration. For production, prefer supplying your own UI blocks — see [Customization](#customization).

For Gravity UI use [UIKitTreeList](/docs/lab-uikit-uikittreelist--docs).

## Basic example

```tsx
import {type ListItemType, TreeList, useList} from '@gravity-ui/tree-select';

const items: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

const list = useList({items});

<TreeList list={list} mapItemDataToContentProps={(item) => ({title: item})} />;
```

## Example with state

```tsx
import {type ListItemType, TreeList, useList} from '@gravity-ui/tree-select';

const items: ListItemType<{title: string}>[] = [
  {title: 'one'},
  {title: 'two'},
  {title: 'free'},
  {title: 'four'},
  {title: 'five'},
];

const Component = () => {
  const list = useList({items});

  const handleItemClick = ({id}) => {
    list.state.setSelected({[id]: true});
  };

  return (
    <TreeList
      list={list}
      onItemClick={handleItemClick}
      mapItemDataToContentProps={({title}) => ({title})}
    />
  );
};
```

## Customization

```tsx
<TreeList
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

Build selection UX with `list.state` (`selectedById`, `expandedById`, `setSelected`, …) from `useList`.

## Props

| Name                      | Description                                                                                                              |                                               Type                                                |     Default     |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------------------------------: | :-------------: |
| list                      | Result of the [`useList`](/docs/lab-uselist--docs) hook                                                                  |                                        `UseListResult<T>`                                         |                 |
| mapItemDataToContentProps | Maps list item data (`T`) to [`ListItemView`](/docs/lab-listitemview--docs) `content`                                    |                              `(data: T) => ListItemViewContentType`                               |                 |
| containerRef              | Ref to the list container DOM node (keyboard navigation, scroll-to-item)                                                 |                             `React.RefObject<HTMLDivElement \| null>`                             |                 |
| className                 | Class name mixed onto the list container                                                                                 |                                             `string`                                              |                 |
| qa                        | Test selector (`data-qa`)                                                                                                |                                             `string`                                              |                 |
| id                        | Id attribute for the list                                                                                                |                                             `string`                                              |                 |
| size                      | List item size                                                                                                           |                                        `s \| m \| l \| xl`                                        |       `m`       |
| multiple                  | Multi-select click behavior (toggle) vs single-select                                                                    |                                             `boolean`                                             |     `false`     |
| renderItem                | Override item rendering (dividers, links, custom rows). Default view is [`ListItemView`](/docs/lab-listitemview--docs)   |                                    `TreeListRenderItem<T, P>`                                     |                 |
| renderContainer           | Override list container (virtualization, DnD, empty states). Default is [`ListContainer`](/docs/lab-listcontainer--docs) |                                   `TreeListRenderContainer<T>`                                    | `ListContainer` |
| onItemClick               | Override default click behavior. Pass `null` to disable the click handler                                                | `null \| ((payload: {id: ListItemId; list: UseListResult<T>}, e?: React.SyntheticEvent) => void)` |                 |

## `renderItem` callback props

| Name                 | Description                                                          |            Type            |   Default   |
| :------------------- | :------------------------------------------------------------------- | :------------------------: | :---------: |
| id                   | List item id                                                         |        `ListItemId`        |             |
| data                 | List item data                                                       |            `T`             |             |
| props                | Prepared [`ListItemView`](/docs/lab-listitemview--docs) common props | `ListItemViewCommonProps`  |             |
| context              | Item context (`isLastItem`, group/item state, …)                     | `ListItemListContextProps` |             |
| list                 | Result of the [`useList`](/docs/lab-uselist--docs) hook              |     `UseListResult<T>`     |             |
| index                | Index in the flattened visible ids                                   |          `number`          |             |
| renderContainerProps | Extra props from a custom `renderContainer`, if any                  |            `P`             | `undefined` |

## `renderContainer` callback props

| Name         | Description                                                                         |                                       Type                                       | Default |
| :----------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------: | :-----: |
| id           | Id attribute                                                                        |                                     `string`                                     |         |
| list         | Result of the [`useList`](/docs/lab-uselist--docs) hook                             |                                `UseListResult<T>`                                |         |
| size         | List item size (passed through from `TreeList`)                                     |                               `s \| m \| l \| xl`                                |   `m`   |
| className    | Class name mixed onto the container                                                 |                                     `string`                                     |         |
| qa           | Test selector (`data-qa`)                                                           |                                     `string`                                     |         |
| containerRef | Ref to the list container DOM node                                                  |                    `React.RefObject<HTMLDivElement \| null>`                     |         |
| renderItem   | Render a visible item by id/index (optional third arg for container-provided props) | `(id: ListItemId, index: number, renderContainerProps?: P) => React.JSX.Element` |         |
