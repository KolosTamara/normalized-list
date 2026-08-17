# UIKitNormalizedSelect

[`NormalizedSelect`](/docs/normalized-list-normalizedselect--docs) with `@gravity-ui/uikit` defaults for control, popup, list item ([`UIKitListItemView`](/docs/normalized-list-uikit-uikitlistitemview--docs)), and outside error text.

Requires `@gravity-ui/uikit` and `@gravity-ui/icons`.

There are many usage patterns for this component — see the Storybook stories alongside these docs.

## Basic usage

```tsx
import {useState} from 'react';
import {UIKitNormalizedSelect} from '@gravity-ui/normalized-list/uikit';

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

Prop descriptions match core NormalizedSelect — see [`NormalizedSelect` docs](/docs/normalized-list-normalizedselect--docs) / [Important props](/docs/normalized-list-normalizedselect--docs#important-props).

## Customization

You can customize the same things as core [`NormalizedSelect`](/docs/normalized-list-normalizedselect--docs#customization): control, popup, error, list item, container, and slots before/after the list.

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

Defaults: [`UIKitNormalizedSelectControl`](#uikitnormalizedselectcontrol) and [`UIKitNormalizedSelectPopup`](#uikitnormalizedselectpopup).

### List item and container

```tsx
<UIKitNormalizedSelect
  renderItem={({props, renderContainerProps}) => <MyRow {...props} {...renderContainerProps} />}
  renderContainer={(containerProps) => <ListContainer {...containerProps} fixedHeight />}
  slotBeforeListBody={<MyFilter />}
  slotAfterListBody={<MyFooter />}
/>
```

## `UIKitNormalizedSelectControl`

Default `renderControl` for `UIKitNormalizedSelect`: select control styled for `@gravity-ui/uikit`.

## `UIKitNormalizedSelectPopup`

Default `renderPopup` for `UIKitNormalizedSelect`: `@gravity-ui/uikit` `Popup` wrapper (placement, width middlewares, `returnFocus` to the control).

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

See [`NormalizedSelect` docs](/docs/normalized-list-normalizedselect--docs#getitemid-and-value) for the full explanation.
