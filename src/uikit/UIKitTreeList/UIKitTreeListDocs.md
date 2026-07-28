# UIKitTreeList

[`TreeList`](/docs/lab-treelist--docs) with default `renderItem` set to [`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs) (Gravity UI list row).

Requires `@gravity-ui/uikit` and `@gravity-ui/icons`.

There are many usage patterns for this component — see the Storybook stories alongside these docs.

## Basic usage

```tsx
import {useList} from '@gravity-ui/tree-select';
import {UIKitTreeList} from '@gravity-ui/tree-select/uikit';

const list = useList({items});

<UIKitTreeList list={list} multiple mapItemDataToContentProps={(item) => ({title: item.title})} />;
```

Prop descriptions match core TreeList — see [`TreeList` Props](/docs/lab-treelist--docs#props).
