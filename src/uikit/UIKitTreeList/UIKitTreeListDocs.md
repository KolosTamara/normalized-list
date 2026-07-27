# UIKitTreeList

`TreeList` with default `renderItem` set to `renderUIKitListItem` (Gravity UI list row).

## Basic usage

```tsx
import {useList} from '@gravity-ui/tree-select';
import {UIKitTreeList} from '@gravity-ui/tree-select/uikit';

const list = useList({items});

<UIKitTreeList list={list} multiple mapItemDataToContentProps={(item) => ({title: item.title})} />;
```

Pass your own `renderItem` / `renderContainer` to override the UIKit defaults while keeping the same list state API as core `TreeList`.
