# @gravity-ui/normalized-list

Core of the package is **`useNormalizedList`**: it takes list items in either a **flat** or **tree** shape and turns them into one normalized model — id-keyed data, hierarchy meta, visible order, and interactive state (selection, expansion, focus).

UI components (`NormalizedList`, `NormalizedSelect`, and the optional UIKit layer) sit **on top of that model** and stay customizable via render props.

## Install

```bash
npm install @gravity-ui/normalized-list
```

Peer dependencies: `react`, `react-dom`. For the UIKit layer also install `@gravity-ui/uikit` and `@gravity-ui/icons`.

Migrating from `@gravity-ui/uikit/unstable` (`TreeSelect`, `TreeList`, `useList`)? See [MIGRATION.md](./MIGRATION.md).

## Idea

```text
items (flat | tree)
        │
        ▼
  useNormalizedList
        │
        ├─ structure  → itemsById, groupsState, visibleFlattenIds, …
        └─ state      → selectedById, expandedById, activeItemId, …
                │
                ▼
     NormalizedList / NormalizedSelect
     (or your own view / UIKitNormalized*)
```

What the hook solves:

- one API for **flat** and **tree** authoring formats;
- O(1) access by id after normalize;
- selection / expand / keyboard-friendly **visible** order (`visibleFlattenIds`);
- UI stays dumb: pass `list` in and customize rendering.

## Two input shapes

Payload `T` is yours. The list contract is only the **node wrapper**:

**Flattened** — item is `T` itself (optional `id` / `selected` / `disabled`):

```ts
import type {ListItemType} from '@gravity-ui/normalized-list';

const flat: ListItemType<string>[] = ['one', 'two', 'three'];

const flatObjects: ListItemType<{title: string}>[] = [
  {title: 'one'},
  {title: 'two', selected: true},
];
```

**Tree** — item has `data: T` and optional `children`:

```ts
const tree: ListItemType<{title: string}>[] = [
  {
    data: {title: 'Fruits'},
    children: [{data: {title: 'Apple'}}, {data: {title: 'Orange'}}],
  },
];
```

Both normalize into the same `structure` + `state`.

## Package layout

| Entry | Import                              | What you get                                                                        |
| ----- | ----------------------------------- | ----------------------------------------------------------------------------------- |
| Core  | `@gravity-ui/normalized-list`       | `useNormalizedList`, `NormalizedList`, `NormalizedSelect`, headless building blocks |
| UIKit | `@gravity-ui/normalized-list/uikit` | `UIKitNormalizedList`, `UIKitNormalizedSelect`, themed item/control views           |

Core ships a **minimal fallback UI** when you omit render props. For production, pass your own renderers or use the UIKit entry.

## Quick start

### 1. Hook only

```tsx
import {useNormalizedList} from '@gravity-ui/normalized-list';

const list = useNormalizedList({
  items: ['one', 'two', 'three'],
  getItemId: (item) => item,
});

// list.structure.itemsById
// list.structure.visibleFlattenIds
// list.state.selectedById / setSelected / …
```

### 2. List UI on top of the hook

Core `NormalizedList` / `NormalizedSelect` are supplied with **fallback views** for demos and exploration. For production, prefer your own UI that matches your design system — see [Customizable views](#customizable-views).

```tsx
import {NormalizedList, useNormalizedList} from '@gravity-ui/normalized-list';

const items = [{data: {title: 'Parent'}, children: [{data: {title: 'Child'}}]}];

export function Example() {
  const list = useNormalizedList({items, defaultExpandedState: 'expanded'});

  return <NormalizedList list={list} multiple mapItemDataToContentProps={(item) => item} />;
}
```

### 3. UIKit preset

The uikit entry is a set of presets for `@gravity-ui/uikit`: themed defaults for list rows, select control, and popup. They address the “bring your own view” gap from [§2](#2-list-ui-on-top-of-the-hook) for that one case — you still can override via render props.

```tsx
import {useNormalizedList} from '@gravity-ui/normalized-list';
import {UIKitNormalizedList} from '@gravity-ui/normalized-list/uikit';

export function Example() {
  const list = useNormalizedList({
    items: ['one', 'two', 'three'],
    getItemId: (item) => item,
  });

  return (
    <UIKitNormalizedList list={list} multiple mapItemDataToContentProps={(title) => ({title})} />
  );
}
```

`NormalizedSelect` / `UIKitNormalizedSelect` use the same model inside (items → normalize → list in a popup).

## Customizable views

Override presentation without rewriting list logic:

- **`NormalizedList` / `NormalizedSelect`**: `renderItem`, `renderContainer`
- **`NormalizedSelect`**: also `renderControl`, `renderPopup`, `renderError`, slots `slotBeforeListBody` / `slotAfterListBody`
- **UIKit**: swap defaults (`renderUIKitListItem`, `UIKitNormalizedSelectControl`, …) the same way

```tsx
<NormalizedList
  list={list}
  mapItemDataToContentProps={(item) => item}
  renderItem={({id, props, context, renderContainerProps}) => (
    <MyRow {...props} {...renderContainerProps} isLast={context.isLastItem} />
  )}
  renderContainer={(containerProps) => <VirtualizedContainer {...containerProps} />}
/>
```

## CSS namespace

BEM roots and package CSS variables use the `g-nl-` prefix (for example `--g-nl-list-item-background-hover`).

The UIKit entry maps those variables to `@gravity-ui/uikit` tokens (`--g-color-*`, `--g-spacing-*`, …).

## Storybook

Examples live under **normalized-list** (core) and **normalized-list/UIKit**. Docs are `*Docs.md` next to each Storybook entry.

## License

MIT
