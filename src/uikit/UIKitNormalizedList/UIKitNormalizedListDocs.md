# UIKitNormalizedList

[`NormalizedList`](/docs/lab-normalizedlist--docs) with default `renderItem` set to [`renderUIKitListItem`](/docs/lab-uikit-renderuikitlistitem--docs) (Gravity UI list row).

Requires `@gravity-ui/uikit` and `@gravity-ui/icons`.

There are many usage patterns for this component — see the Storybook stories alongside these docs.

## Basic usage

```tsx
import {useNormalizedList} from '@gravity-ui/tree-select';
import {UIKitNormalizedList} from '@gravity-ui/tree-select/uikit';

const list = useNormalizedList({items});

<UIKitNormalizedList
  list={list}
  multiple
  mapItemDataToContentProps={(item) => ({title: item.title})}
/>;
```

Prop descriptions match core NormalizedList — see [`NormalizedList` Props](/docs/lab-normalizedlist--docs#props).
