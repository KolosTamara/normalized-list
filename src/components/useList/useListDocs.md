# useList

Hooks and utilities for tree list state: parsed structure, selection, expansion, filtering helpers, and keyboard navigation.

## `useList`

```tsx
const list = useList({
  items,
  multiple: true, // via controlled selection / click handlers
  defaultExpandedState: 'expanded', // or 'collapsed'
  withExpandedState: true,
  getItemId: (data) => data.id,
  controlledState: {
    selectedById,
    setSelected,
  },
});
```

`list.structure` holds flattened/visible ids and `itemsById`. `list.state` exposes selection, expansion, and active item APIs used by `TreeList` / `TreeSelect`.

## `useListFilter`

Client-side filter over tree items; returns filtered `items`, `filter`, `onFilterUpdate`, and an input `filterRef` (for focus when the popup opens).

```tsx
const filterState = useListFilter({items});

<TreeSelect
  items={filterState.items}
  slotBeforeListBody={
    <input
      ref={filterState.filterRef}
      value={filterState.filter}
      onChange={(e) => filterState.onFilterUpdate(e.target.value)}
    />
  }
/>;
```

## `useListKeydown`

Attaches arrow/home/enter keyboard behavior to a list container. `TreeList` already wires this; call it only in custom list shells.

## Utilities

Also exported: `getItemRenderState`, `getListItemClickHandler`, `computeItemSize`, `scrollToListItem`, `getListParsedState`, `getListItemQa`, `modToHeight`.
