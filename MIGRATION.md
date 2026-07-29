# Migration from `@gravity-ui/uikit/unstable`

List / tree building blocks moved out of `@gravity-ui/uikit/unstable` into `@gravity-ui/normalized-list`.

| Before (`@gravity-ui/uikit/unstable`)                                                 | After                                                            |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `TreeSelect`                                                                          | `UIKitNormalizedSelect` from `@gravity-ui/normalized-list/uikit` |
| `TreeList`                                                                            | `UIKitNormalizedList` from `@gravity-ui/normalized-list/uikit`   |
| `useList`                                                                             | `useNormalizedList` from `@gravity-ui/normalized-list`           |
| `UseListResult`                                                                       | `UseNormalizedListResult`                                        |
| `ListItemType` / `ListItemId`                                                         | same names from `@gravity-ui/normalized-list`                    |
| `ListItemView` (UIKit-styled)                                                         | `UIKitListItemView` from `@gravity-ui/normalized-list/uikit`     |
| `useListFilter`, `useListKeydown`, `getListItemClickHandler`, `getItemRenderState`, … | same names from `@gravity-ui/normalized-list`                    |

Install:

```bash
npm install @gravity-ui/normalized-list
```

Peers for the UIKit entry: `@gravity-ui/uikit`, `@gravity-ui/icons` (you likely already have them).

CSS namespace changed to `g-nl-` (for example `--g-nl-list-item-background-hover`). Update any overrides that targeted the old list classes / variables.

---

## `TreeSelect` → `UIKitNormalizedSelect`

Drop-in replacement for the UIKit-styled select. **All existing props stay the same.** Added optional `renderPopup` / `renderError` for customization.

### Before

```tsx
import {
  type unstable_ListItemType as ListItemType,
  unstable_TreeSelect as TreeSelect,
} from '@gravity-ui/uikit/unstable';

const items: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

<TreeSelect items={items} mapItemDataToContentProps={(item) => ({title: item})} />;
```

### After

```tsx
import {type ListItemType} from '@gravity-ui/normalized-list';
import {UIKitNormalizedSelect} from '@gravity-ui/normalized-list/uikit';

const items: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

<UIKitNormalizedSelect items={items} mapItemDataToContentProps={(item) => ({title: item})} />;
```

### Controlled tree example

```tsx
import {useState} from 'react';
import {type ListItemType} from '@gravity-ui/normalized-list';
import {UIKitNormalizedSelect} from '@gravity-ui/normalized-list/uikit';

const items: ListItemType<{title: string}>[] = [
  {
    data: {title: 'Fruits'},
    children: [{data: {title: 'Apple'}}, {data: {title: 'Orange'}}],
  },
];

export function Example() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <UIKitNormalizedSelect
      items={items}
      value={value}
      onUpdate={setValue}
      multiple
      mapItemDataToContentProps={(item) => item}
    />
  );
}
```

`getItemId` works as before: `value` is a list of **item ids**. Without `getItemId`, ids are index-based (`'0'`, `'1'`, `'0-1'`, …).

```tsx
<UIKitNormalizedSelect
  value={['two']}
  getItemId={(id) => id}
  items={['one', 'two', 'free']}
  mapItemDataToContentProps={(title) => ({title})}
/>
```

### Mobile (`useMobile` + `Sheet`)

**No built-in mobile support.** `TreeSelect` used `Sheet` on mobile (`useMobile()`); `UIKitNormalizedSelect` always opens a desktop `Popup`.

You can add mobile support yourself with a custom `renderPopup` (`Sheet` on mobile, `Popup` on desktop):

```tsx
import {Sheet, useMobile} from '@gravity-ui/uikit';
import {type ListItemType} from '@gravity-ui/normalized-list';
import {UIKitNormalizedSelect, UIKitNormalizedSelectPopup} from '@gravity-ui/normalized-list/uikit';
import type {NormalizedSelectRenderPopupProps} from '@gravity-ui/normalized-list';

function MobileAwarePopup(props: NormalizedSelectRenderPopupProps) {
  const mobile = useMobile();

  if (mobile) {
    return (
      <Sheet visible={Boolean(props.open)} onClose={props.onClose} className={props.className}>
        {props.children}
      </Sheet>
    );
  }

  return <UIKitNormalizedSelectPopup {...props} />;
}

const items: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

<UIKitNormalizedSelect
  items={items}
  mapItemDataToContentProps={(item) => ({title: item})}
  renderPopup={(props) => <MobileAwarePopup {...props} />}
/>;
```

Requires a `MobileProvider` (or equivalent) from `@gravity-ui/uikit` so `useMobile()` returns the correct value.

---

## `TreeList` → `UIKitNormalizedList`

Drop-in replacement for the UIKit-styled list. **All props stay the same** (`list`, `mapItemDataToContentProps`, `multiple`, `renderItem`, `renderContainer`, `onItemClick`, …) — pass `list` from `useNormalizedList` instead of `useList`.

### Before

```tsx
import {
  type unstable_ListItemType as ListItemType,
  unstable_TreeList as TreeList,
  unstable_useList as useList,
} from '@gravity-ui/uikit/unstable';

const items: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

const list = useList({items});

<TreeList list={list} mapItemDataToContentProps={(item) => ({title: item})} />;
```

### After

```tsx
import {type ListItemType, useNormalizedList} from '@gravity-ui/normalized-list';
import {UIKitNormalizedList} from '@gravity-ui/normalized-list/uikit';

const items: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

const list = useNormalizedList({items});

<UIKitNormalizedList list={list} mapItemDataToContentProps={(item) => ({title: item})} />;
```

### Tree items

```tsx
import {type ListItemType, useNormalizedList} from '@gravity-ui/normalized-list';
import {UIKitNormalizedList} from '@gravity-ui/normalized-list/uikit';

const items: ListItemType<{title: string}>[] = [
  {
    data: {title: 'Fruits'},
    children: [{data: {title: 'Apple'}}, {data: {title: 'Orange'}}],
  },
];

const list = useNormalizedList({items, defaultExpandedState: 'expanded'});

<UIKitNormalizedList list={list} multiple mapItemDataToContentProps={(item) => item} />;
```

`renderItem` / `renderContainer` / `onItemClick` keep the same roles as on `TreeList`. To keep the UIKit row while adding chrome (links, actions), wrap `renderUIKitListItem`:

```tsx
import {renderUIKitListItem, UIKitNormalizedList} from '@gravity-ui/normalized-list/uikit';

<UIKitNormalizedList
  list={list}
  mapItemDataToContentProps={(item) => item}
  renderItem={(args) => {
    // e.g. wrap in a link, add actions, …
    return renderUIKitListItem(args);
  }}
/>;
```

---

## `useList` → `useNormalizedList`

API surface is largely the same (`items`, `getItemId`, `controlledState`, `structure` + `state`). Rename the import and the result type.

### Before

```tsx
import {unstable_useList as useList} from '@gravity-ui/uikit/unstable';

const list = useList({
  items,
  getItemId: (item) => item.id,
});

// list.structure.itemsById
// list.structure.visibleFlattenIds
// list.state.selectedById / setSelected / …
```

### After

```tsx
import {useNormalizedList} from '@gravity-ui/normalized-list';

const list = useNormalizedList({
  items,
  getItemId: (item) => item.id,
});

// list.structure.itemsById
// list.structure.visibleFlattenIds
// list.state.selectedById / setSelected / …
```

Related helpers (filter, keyboard, click handler, render state) move to the same package — no `unstable_` prefix:

```tsx
import {
  useNormalizedList,
  useListFilter,
  useListKeydown,
  getListItemClickHandler,
  getItemRenderState,
} from '@gravity-ui/normalized-list';
```

---

## Without `@gravity-ui/uikit`

If your project does **not** depend on `@gravity-ui/uikit`, skip the `/uikit` entry. Use core components and supply your own views via render props (core ships only a minimal fallback UI for demos).

```tsx
import {NormalizedList, NormalizedSelect, useNormalizedList} from '@gravity-ui/normalized-list';

// List
const list = useNormalizedList({items});

<NormalizedList
  list={list}
  mapItemDataToContentProps={(item) => ({title: item.title})}
  renderItem={({props, renderContainerProps}) => <MyRow {...props} {...renderContainerProps} />}
/>;

// Select
<NormalizedSelect
  items={items}
  mapItemDataToContentProps={(item) => ({title: item.title})}
  renderControl={(props) => <MyControl {...props} />}
  renderPopup={(props) => <MyPopup {...props} />}
  renderItem={({props, renderContainerProps}) => <MyRow {...props} {...renderContainerProps} />}
/>;
```

See the package [README](./README.md) for package layout, flat vs tree item shapes, and customization overview.
