# renderUIKitListItem

Default `renderItem` for [`UIKitNormalizedList`](/docs/lab-uikit-uikitnormalizedlist--docs) / [`UIKitNormalizedSelect`](/docs/lab-uikit-uikitnormalizedselect--docs): composes [`NormalizedListItemView`](/docs/lab-uikit-normalizedlistitemview--docs) + [`NormalizedListItemViewContent`](/docs/lab-uikit-normalizedlistitemview--docs#treelistitemviewcontent) + [`NormalizedListItemExpandIcon`](/docs/lab-uikit-normalizedlistitemexpandicon--docs).

## Usage

```tsx
import {NormalizedList} from '@gravity-ui/tree-select';
import {renderUIKitListItem} from '@gravity-ui/tree-select/uikit';

<NormalizedList
  list={list}
  mapItemDataToContentProps={(item) => ({title: item.title})}
  renderItem={renderUIKitListItem}
/>;
```

[`UIKitNormalizedList`](/docs/lab-uikit-uikitnormalizedlist--docs) already sets this as the default. Wrap or replace it when you need extra row chrome (links, actions, DnD handles) while keeping the UIKit look:

```tsx
renderItem={(args) => {
  if (args.context.isLastItem) {
    return <MyCustomLastRow {...args} />;
  }
  return renderUIKitListItem(args);
}}
```
