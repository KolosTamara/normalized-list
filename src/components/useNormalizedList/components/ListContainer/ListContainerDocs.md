# ListContainer

Default non-virtualized container for [NormalizedList](/docs/normalized-list-normalizedlist--docs) / [NormalizedSelect](/docs/normalized-list-normalizedselect--docs): walks `list.structure` and renders items recursively, wrapped in [`ListContainerView`](#listcontainerview).

## Usage

Used as the default `renderContainer`, or can be passed explicitly:

```tsx
import {ListContainer, NormalizedList, useNormalizedList} from '@gravity-ui/normalized-list';

const list = useNormalizedList({items});

<NormalizedList
  list={list}
  mapItemDataToContentProps={(item) => item}
  renderContainer={(props) => <ListContainer {...props} fixedHeight />}
/>;
```

For production overrides (virtualization, DnD, empty states), use `renderContainer` on [`NormalizedList`](/docs/normalized-list-normalizedlist--docs#customization) or [`NormalizedSelect`](/docs/normalized-list-normalizedselect--docs#customization).

## `ListContainerView`

Presentational listbox shell used inside `ListContainer` (and useful when you build a custom container yourself).

```tsx
import {ListContainerView} from '@gravity-ui/normalized-list';

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
  --g-nl-list-container-height: 240px;
}
```

With `fixedHeight`, height is `var(--g-nl-list-container-height, 300px)`. Without it, the container grows with content and uses `overflow: auto`.
