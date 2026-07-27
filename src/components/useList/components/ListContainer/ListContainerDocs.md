# ListContainer

Default non-virtualized tree container for [TreeList](/docs/lab-treelist--docs) / [TreeSelect](/docs/lab-treeselect--docs): walks `list.structure` and renders items recursively, wrapped in [`ListContainerView`](#listcontainerview).

## Usage

Used as the default `renderContainer`, or can be passed explicitly:

```tsx
import {ListContainer, TreeList, useList} from '@gravity-ui/tree-select';

const list = useList({items});

<TreeList
  list={list}
  mapItemDataToContentProps={(item) => item}
  renderContainer={(props) => <ListContainer {...props} fixedHeight />}
/>;
```

For production overrides (virtualization, DnD, empty states), use `renderContainer` on [`TreeList`](/docs/lab-treelist--docs#customization) or [`TreeSelect`](/docs/lab-treeselect--docs#customization).

## `ListContainerView`

Presentational listbox shell used inside `ListContainer` (and useful when you build a custom container yourself).

```tsx
import {ListContainerView} from '@gravity-ui/tree-select';

<ListContainerView id="list-1" fixedHeight className="my-list">
  {children}
</ListContainerView>;
```

| Prop                                 | Role                                            |
| ------------------------------------ | ----------------------------------------------- |
| `fixedHeight`                        | Fixed height + no `overflow: auto` on the shell |
| `as`                                 | Root element type (default `div`)               |
| `role`                               | Default `listbox`                               |
| `style` / `className` / `extraProps` | DOM customization                               |

```css
.my-list {
  --g-ts-list-container-height: 240px;
}
```

With `fixedHeight`, height is `var(--g-ts-list-container-height, 300px)`. Without it, the container grows with content and uses `overflow: auto`.
