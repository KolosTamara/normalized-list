# ListItemView

Structural row shell for tree/list items: size, selection, active/hover, disabled, dragging. Provided with neutral default visuals, theme or replace for production.

For Gravity UI use theme wrapper: [TreeListItemView](/docs/lab-uikit-treelistitemview--docs) from `@gravity-ui/tree-select/uikit`.

## Basic usage

```tsx
import {ListItemView} from '@gravity-ui/tree-select';

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

Classes use namespace `g-ts-`. Override variables on `.g-ts-list-item-view` or a parent:

| Variable                               | Purpose                   |
| -------------------------------------- | ------------------------- |
| `--g-ts-list-item-background-hover`    | Hover / active background |
| `--g-ts-list-item-background-selected` | Selected background       |
| `--g-ts-list-item-background-dragging` | Dragging background       |
| `--g-ts-list-item-border-radius`       | Corner radius             |
| `--g-ts-list-item-dragging-z-index`    | Z-index while dragging    |

```css
.my-list {
  --g-ts-list-item-background-selected: #e8f0fe;
}
```

## Related

Default row renderer inside [`TreeList`](/docs/lab-treelist--docs) / [`TreeSelect`](/docs/lab-treeselect--docs). Prefer `renderItem` for a fully custom row — see [TreeList Customization](/docs/lab-treelist--docs#customization) and [TreeSelect Customization](/docs/lab-treeselect--docs#customization).

UIKit row: [`TreeListItemView`](/docs/lab-uikit-treelistitemview--docs).
