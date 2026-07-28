# UIKitListItemView

[ListItemView](/docs/lab-usenormalizedlist-listitemview--docs) with Gravity UI theme modifier (`_theme-uikit`): maps `--g-nl-list-item-*` variables to `--g-color-*` tokens.

## Usage

```tsx
import {UIKitListItemView, UIKitListItemViewContent} from '@gravity-ui/tree-select/uikit';

<UIKitListItemView
  id={id}
  selected={selected}
  selectionViewType="multiple"
  content={<UIKitListItemViewContent title="Row" hasSelectionIcon selected={selected} />}
/>;
```

Same props as core [`ListItemView`](/docs/lab-usenormalizedlist-listitemview--docs). Prefer [`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs) / [`UIKitNormalizedList`](/docs/lab-uikit-uikitnormalizedlist--docs) unless you need a custom composition.

## `UIKitListItemViewContent`

Gravity UI content layout for a list row: title/subtitle (`Text`), selection check, expand control, start/end slots.

```tsx
import {UIKitListItemViewContent, UIKitListItemExpandIcon} from '@gravity-ui/tree-select/uikit';

<UIKitListItemViewContent
  title="Group"
  subtitle="3 items"
  hasSelectionIcon
  selected={selected}
  isGroup
  expanded={expanded}
  indentation={1}
  renderExpandIcon={UIKitListItemExpandIcon}
  endSlot={<Actions />}
/>;
```

Pass as `content` to `UIKitListItemView` / [`ListItemView`](/docs/lab-usenormalizedlist-listitemview--docs), or rely on [`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs), which wires this automatically.
