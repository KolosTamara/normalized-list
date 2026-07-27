# renderUIKitListItem

Default `renderItem` for `UIKitTreeList` / `UIKitTreeSelect`: composes `TreeListItemView` + `TreeListItemViewContent` + `TreeListItemExpandIcon`.

## Usage

```tsx
import {TreeList} from '@gravity-ui/tree-select';
import {renderUIKitListItem} from '@gravity-ui/tree-select/uikit';

<TreeList
  list={list}
  mapItemDataToContentProps={(item) => ({title: item.title})}
  renderItem={renderUIKitListItem}
/>;
```

`UIKitTreeList` already sets this as the default. Wrap or replace it when you need extra row chrome (links, actions, DnD handles) while keeping the UIKit look:

```tsx
renderItem={(args) => {
  if (args.context.isLastItem) {
    return <MyCustomLastRow {...args} />;
  }
  return renderUIKitListItem(args);
}}
```
