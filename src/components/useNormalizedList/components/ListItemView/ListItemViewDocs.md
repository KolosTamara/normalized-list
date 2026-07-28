# ListItemView

Structural row shell for tree/list items: size, selection, active/hover, disabled, dragging. Provided with neutral default visuals, theme or replace for production.

For Gravity UI use theme wrapper: [UIKitListItemView](/docs/lab-uikit-uikitlistitemview--docs) from `@gravity-ui/normalized-list/uikit`.

## Basic usage

```tsx
import {ListItemView} from '@gravity-ui/normalized-list';

<ListItemView
  id="item-1"
  size="m"
  selected={false}
  selectionViewType="multiple"
  content={{title: 'Label', subtitle: 'Optional'}}
  onClick={() => {}}
/>;
```

`content` accepts either a content object (`title`, `subtitle`, `startSlot`, `endSlot`, indentation, expand props) or a custom React node.

## Theming

Classes use namespace `g-nl-`. Override variables on `.g-nl-list-item-view` or a parent:

| Variable                               | Purpose                   |
| -------------------------------------- | ------------------------- |
| `--g-nl-list-item-background-hover`    | Hover / active background |
| `--g-nl-list-item-background-selected` | Selected background       |
| `--g-nl-list-item-background-dragging` | Dragging background       |
| `--g-nl-list-item-border-radius`       | Corner radius             |
| `--g-nl-list-item-dragging-z-index`    | Z-index while dragging    |

```css
.my-list {
  --g-nl-list-item-background-selected: #e8f0fe;
}
```

## Related

Default row renderer inside [`NormalizedList`](/docs/lab-normalizedlist--docs) / [`NormalizedSelect`](/docs/lab-normalizedselect--docs). Prefer `renderItem` for a fully custom row — see [NormalizedList Customization](/docs/lab-normalizedlist--docs#customization) and [NormalizedSelect Customization](/docs/lab-normalizedselect--docs#customization).

UIKit row: [`UIKitListItemView`](/docs/lab-uikit-uikitlistitemview--docs).
