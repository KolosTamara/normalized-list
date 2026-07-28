# UIKitTreeSelect

[`TreeSelect`](/docs/lab-treeselect--docs) with Gravity UI defaults for control, popup, list item ([`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs)), and outside error text.

Requires `@gravity-ui/uikit` and `@gravity-ui/icons`.

There are many usage patterns for this component — see the Storybook stories alongside these docs.

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

Prop descriptions match core TreeSelect — see [`TreeSelect` docs](/docs/lab-treeselect--docs) / [Important props](/docs/lab-treeselect--docs#important-props).

## Customization

You can customize the same things as core [`TreeSelect`](/docs/lab-treeselect--docs#customization): control, popup, error, list item, container, and slots before/after the list.

### Control / popup / error

```tsx
<UIKitTreeSelect
  renderControl={(props) => <MyControl {...props} />}
  renderPopup={(props) => <MyPopup {...props} />}
  renderError={({errorMessage, errorMessageId}) => (
    <div id={errorMessageId} role="alert">
      {errorMessage}
    </div>
  )}
  {/* ... */}
/>
```

UIKit defaults: [`TreeSelectControl`](/docs/lab-uikit-treeselectcontrol--docs) and [`TreeSelectPopup`](#treeselectpopup).

### List item and container

```tsx
<UIKitTreeSelect
  renderItem={({props, renderContainerProps}) => <MyRow {...props} {...renderContainerProps} />}
  renderContainer={(containerProps) => <ListContainer {...containerProps} fixedHeight />}
  slotBeforeListBody={<MyFilter />}
  slotAfterListBody={<MyFooter />}
/>
```

## `TreeSelectPopup`

Gravity UI `Popup` wrapper implementing `TreeSelect`’s `renderPopup` contract (placement, width middlewares, `returnFocus` to the control).

```tsx
import {TreeSelectPopup} from '@gravity-ui/tree-select/uikit';

renderPopup={(props) => <TreeSelectPopup {...props} />}
```

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
