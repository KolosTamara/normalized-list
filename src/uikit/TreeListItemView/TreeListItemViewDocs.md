# TreeListItemView

`ListItemView` with Gravity UI theme modifier (`_theme-uikit`): maps `--g-ts-list-item-*` variables to `--g-color-*` tokens.

## Usage

```tsx
import {TreeListItemView, TreeListItemViewContent} from '@gravity-ui/tree-select/uikit';

<TreeListItemView
  id={id}
  selected={selected}
  selectionViewType="multiple"
  content={<TreeListItemViewContent title="Row" hasSelectionIcon selected={selected} />}
/>;
```

Same props as core [`ListItemView`](/docs/lab-listitemview--docs). Prefer [`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs) / [`UIKitTreeList`](/docs/lab-uikit-uikittreelist--docs) unless you need a custom composition.

## `TreeListItemViewContent`

Gravity UI content layout for a list row: title/subtitle (`Text`), selection check, expand control, start/end slots.

```tsx
import {TreeListItemViewContent, TreeListItemExpandIcon} from '@gravity-ui/tree-select/uikit';

<TreeListItemViewContent
  title="Group"
  subtitle="3 items"
  hasSelectionIcon
  selected={selected}
  isGroup
  expanded={expanded}
  indentation={1}
  renderExpandIcon={TreeListItemExpandIcon}
  endSlot={<Actions />}
/>;
```

Pass as `content` to `TreeListItemView` / `ListItemView`, or rely on `renderUIKitListItem`, which wires this automatically.
