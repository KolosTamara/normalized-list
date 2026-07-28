# NormalizedListItemView

[ListItemView](/docs/lab-usenormalizedlist-listitemview--docs) with Gravity UI theme modifier (`_theme-uikit`): maps `--g-nl-list-item-*` variables to `--g-color-*` tokens.

## Usage

```tsx
import {NormalizedListItemView, NormalizedListItemViewContent} from '@gravity-ui/tree-select/uikit';

<NormalizedListItemView
  id={id}
  selected={selected}
  selectionViewType="multiple"
  content={<NormalizedListItemViewContent title="Row" hasSelectionIcon selected={selected} />}
/>;
```

Same props as core [`ListItemView`](/docs/lab-usenormalizedlist-listitemview--docs). Prefer [`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs) / [`UIKitNormalizedList`](/docs/lab-uikit-uikitnormalizedlist--docs) unless you need a custom composition.

## `NormalizedListItemViewContent`

Gravity UI content layout for a list row: title/subtitle (`Text`), selection check, expand control, start/end slots.

```tsx
import {
  NormalizedListItemViewContent,
  NormalizedListItemExpandIcon,
} from '@gravity-ui/tree-select/uikit';

<NormalizedListItemViewContent
  title="Group"
  subtitle="3 items"
  hasSelectionIcon
  selected={selected}
  isGroup
  expanded={expanded}
  indentation={1}
  renderExpandIcon={NormalizedListItemExpandIcon}
  endSlot={<Actions />}
/>;
```

Pass as `content` to `NormalizedListItemView` / [`ListItemView`](/docs/lab-usenormalizedlist-listitemview--docs), or rely on [`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs), which wires this automatically.
