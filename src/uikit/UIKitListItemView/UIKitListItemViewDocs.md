# UIKitListItemView

[ListItemView](/docs/normalized-list-usenormalizedlist-listitemview--docs) with `@gravity-ui/uikit` theme modifier (`_theme-uikit`): maps `--g-nl-list-item-*` variables to `--g-color-*` tokens.

## Usage

```tsx
import {UIKitListItemView} from '@gravity-ui/normalized-list/uikit';

<UIKitListItemView
  id={id}
  selected={selected}
  selectionViewType="multiple"
  content={{title: 'Row'}}
/>;
```

Object `content` is rendered with [`UIKitListItemViewContent`](#uikitlistitemviewcontent) (not the core fallback). Pass a React node as `content` to fully customize the row body.

Same props as core [`ListItemView`](/docs/normalized-list-usenormalizedlist-listitemview--docs). Prefer [`UIKitNormalizedList`](/docs/normalized-list-uikit-uikitnormalizedlist--docs) / [`UIKitNormalizedSelect`](/docs/normalized-list-uikit-uikitnormalizedselect--docs) for the default wiring, or use this component directly in a custom `renderItem`.

## `UIKitListItemViewContent`

List row content layout for `@gravity-ui/uikit`: title/subtitle (`Text`), selection check, expand control, start/end slots.

```tsx
import {UIKitListItemViewContent, UIKitListItemExpandIcon} from '@gravity-ui/normalized-list/uikit';

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

Use explicitly as a React `content` node when you need extra props/slots, or pass a content object to `UIKitListItemView` and it will be wired automatically.
