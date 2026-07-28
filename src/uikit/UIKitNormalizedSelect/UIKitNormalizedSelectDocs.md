# UIKitNormalizedSelect

[`NormalizedSelect`](/docs/lab-normalizedselect--docs) with Gravity UI defaults for control, popup, list item ([`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs)), and outside error text.

Requires `@gravity-ui/uikit` and `@gravity-ui/icons`.

There are many usage patterns for this component — see the Storybook stories alongside these docs.

## Basic usage

```tsx
import {useState} from 'react';
import {UIKitNormalizedSelect} from '@gravity-ui/tree-select/uikit';

export function Example() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <UIKitNormalizedSelect
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

Prop descriptions match core NormalizedSelect — see [`NormalizedSelect` docs](/docs/lab-normalizedselect--docs) / [Important props](/docs/lab-normalizedselect--docs#important-props).

## Customization

You can customize the same things as core [`NormalizedSelect`](/docs/lab-normalizedselect--docs#customization): control, popup, error, list item, container, and slots before/after the list.

### Control / popup / error

```tsx
<UIKitNormalizedSelect
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

UIKit defaults: [`UIKitNormalizedSelectControl`](/docs/lab-uikit-uikitnormalizedselectcontrol--docs) and [`UIKitNormalizedSelectPopup`](#uikitnormalizedselectpopup).

### List item and container

```tsx
<UIKitNormalizedSelect
  renderItem={({props, renderContainerProps}) => <MyRow {...props} {...renderContainerProps} />}
  renderContainer={(containerProps) => <ListContainer {...containerProps} fixedHeight />}
  slotBeforeListBody={<MyFilter />}
  slotAfterListBody={<MyFooter />}
/>
```

## `UIKitNormalizedSelectPopup`

Gravity UI `Popup` wrapper implementing `NormalizedSelect`’s `renderPopup` contract (placement, width middlewares, `returnFocus` to the control).

```tsx
import {UIKitNormalizedSelectPopup} from '@gravity-ui/tree-select/uikit';

renderPopup={(props) => <UIKitNormalizedSelectPopup {...props} />}
```

CSS block: `.g-nl-normalized-select-popup` with `max-height: 90vh` and flex column layout (list scrolls inside).

## `getItemId` and `value`

Same as core `NormalizedSelect`: `value` is a list of **item ids**. Without `getItemId`, ids are index-based (`'0'`, `'1'`, `'0-1'`, …), so `value={['two']}` will not match an item whose label is `"two"`.

```tsx
<UIKitNormalizedSelect
  value={['two']}
  getItemId={(id) => id}
  items={['one', 'two', 'free']}
  mapItemDataToContentProps={(title) => ({title})}
/>
```

See [`NormalizedSelect` docs](/docs/lab-normalizedselect--docs#getitemid-and-value) for the full explanation.
