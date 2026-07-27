# UIKitTreeSelect

`TreeSelect` preset wired to Gravity UI: [`TreeSelectControl`](/docs/lab-uikit-treeselectcontrol--docs), [`TreeSelectPopup`](#customization-treeselectpopup), themed list items ([`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs)), and outside error text.

Requires `@gravity-ui/uikit` and `@gravity-ui/icons`.

## Basic usage

```tsx
import {useState} from 'react';
import {UIKitTreeSelect} from '@gravity-ui/tree-select/uikit';

export function Example() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <UIKitTreeSelect
      items={items}
      value={value}
      onUpdate={setValue}
      multiple
      size="l"
      placeholder="Select items"
      mapItemDataToContentProps={(item) => item}
    />
  );
}
```

Props match core [`TreeSelect`](/docs/lab-treeselect--docs). Override any renderer when needed:

```tsx
<UIKitTreeSelect
  renderControl={(props) => <TreeSelectControl {...props} selectedOptionsContent="…" />}
  renderPopup={(props) => <TreeSelectPopup {...props} />}
  renderItem={customRenderItem}
  renderError={({errorMessage, errorMessageId}) => <span id={errorMessageId}>{errorMessage}</span>}
/>
```

## Customization: `TreeSelectPopup`

Gravity UI `Popup` wrapper implementing `TreeSelect`’s `renderPopup` contract (placement, width middlewares, `returnFocus` to the control).

```tsx
import {TreeSelectPopup} from '@gravity-ui/tree-select/uikit';

renderPopup={(props) => <TreeSelectPopup {...props} />}
```

Props are `TreeSelectRenderPopupProps` (`open`, `onClose`, `anchorRef`, `controlRef`, `children`, `width`, `placement`, `disablePortal`, …).

CSS block: `.g-ts-tree-select-popup` with `max-height: 90vh` and flex column layout (list scrolls inside).

## `getItemId` and `value`

Same as core `TreeSelect`: `value` is a list of **item ids**. Without `getItemId`, ids are index-based (`'0'`, `'1'`, `'0-1'`, …), so `value={['two']}` will not match an item whose label is `"two"`.

```tsx
<UIKitTreeSelect
  value={['two']}
  getItemId={(id) => id}
  items={['one', 'two', 'free']}
  mapItemDataToContentProps={(title) => ({title})}
/>
```

See [`TreeSelect` docs](/docs/lab-treeselect--docs#getitemid-and-value) for the full explanation.

## Related bricks

[`TreeSelectControl`](/docs/lab-uikit-treeselectcontrol--docs) (includes [`getSelectedOptionsContent`](/docs/lab-uikit-treeselectcontrol--docs#getselectedoptionscontent)), [`TreeListItemView`](/docs/lab-uikit-treelistitemview--docs), [`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs) — same `@gravity-ui/tree-select/uikit` entry.
