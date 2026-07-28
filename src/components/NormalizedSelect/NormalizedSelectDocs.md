# NormalizedSelect

The basic component for selecting from lists, including tree-like. Supports controlled/uncontrolled value, open state, keyboard navigation, and a list popup.

It's supplied with a default UI for demos and exploration. For production, prefer supplying your own UI blocks — see [Customization](#customization).

For Gravity UI use [UIKitNormalizedSelect](/docs/lab-uikit-uikitnormalizedselect--docs).

## Basic usage

```tsx
import {useState} from 'react';
import {NormalizedSelect} from '@gravity-ui/tree-select';

const items = [
  {
    data: {title: 'Fruits'},
    children: [{data: {title: 'Apple'}}, {data: {title: 'Orange'}}],
  },
];

export function Example() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <NormalizedSelect
      items={items}
      value={value}
      onUpdate={setValue}
      multiple
      placeholder="Select"
      mapItemDataToContentProps={(item) => item}
    />
  );
}
```

## Important props

| Prop                                                | Role                                                                                     |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `items`                                             | Tree data (`data` + optional `children` / `disabled`)                                    |
| `mapItemDataToContentProps`                         | Maps each item’s `data` to list-item content (`title`, optional `subtitle`, slots, etc.) |
| `value` / `defaultValue` / `onUpdate`               | Selected item ids                                                                        |
| `multiple`                                          | Multi-select                                                                             |
| `open` / `defaultOpen` / `onOpenChange`             | Popup open state                                                                         |
| `size`                                              | Control and list size (`s` \| `m` \| `l` \| `xl`)                                        |
| `hasClear`                                          | Clear button when there is a value                                                       |
| `errorMessage`, `validationState`, `errorPlacement` | Validation (`outside` \| `inside`)                                                       |
| `getItemId`                                         | Custom id from `data` (default: internal index-based ids)                                |

## `getItemId` and `value`

Take a look at this example:

```tsx
<NormalizedSelect
  value={['two']}
  items={['one', 'two', 'free']}
  mapItemDataToContentProps={(title) => ({title})}
/>
```

In this case we will see select with `empty` value.

Why this happens?

Internal list representation make own `id` for every item. By default it bases on index of base and nested arrays.
Result `id` will be computed by formula: `{root-array-item-index}-{child-array-index-if-exists}-{...}`.
In example to select second item you need to set as a value item index:

```sh
value={['1']}
```

To fix our example we need to use `getItemId` prop and explicitly tell `NormalizedSelect` to use items values as uniq ids:

```diff
<NormalizedSelect
  value={['two']}
+ getItemId={(id) => id}
  items={['one', 'two', 'free']}
  mapItemDataToContentProps={(title) => ({title})}
/>
```

Now we will se selected element with value `two`

## Customization

### Control / popup / error

```tsx
<NormalizedSelect
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

### List item and container

```tsx
<NormalizedSelect
  renderItem={({props, renderContainerProps}) => <MyRow {...props} {...renderContainerProps} />}
  renderContainer={(containerProps) => <ListContainer {...containerProps} fixedHeight />}
  slotBeforeListBody={<MyFilter />}
  slotAfterListBody={<MyFooter />}
/>
```
