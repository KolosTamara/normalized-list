# renderUIKitListItem

Default `renderItem` for [`UIKitNormalizedList`](/docs/lab-uikit-uikitnormalizedlist--docs) / [`UIKitNormalizedSelect`](/docs/lab-uikit-uikitnormalizedselect--docs): composes [`UIKitListItemView`](/docs/lab-uikit-uikitlistitemview--docs) + [`UIKitListItemViewContent`](/docs/lab-uikit-uikitlistitemview--docs#uikitlistitemviewcontent) + [`UIKitListItemExpandIcon`](/docs/lab-uikit-uikitlistitemexpandicon--docs).

## Usage

```tsx
import {NormalizedList} from '@gravity-ui/normalized-list';
import {renderUIKitListItem} from '@gravity-ui/normalized-list/uikit';

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
