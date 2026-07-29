# renderUIKitListItem

Default `renderItem` for [`UIKitNormalizedList`](/docs/normalized-list-uikit-uikitnormalizedlist--docs) / [`UIKitNormalizedSelect`](/docs/normalized-list-uikit-uikitnormalizedselect--docs): composes [`UIKitListItemView`](/docs/normalized-list-uikit-uikitlistitemview--docs) + [`UIKitListItemViewContent`](/docs/normalized-list-uikit-uikitlistitemview--docs#uikitlistitemviewcontent) + [`UIKitListItemExpandIcon`](/docs/normalized-list-uikit-uikitlistitemexpandicon--docs).

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

[`UIKitNormalizedList`](/docs/normalized-list-uikit-uikitnormalizedlist--docs) already sets this as the default. Wrap or replace it when you need extra row chrome (links, actions, DnD handles) while keeping the UIKit look:

```tsx
renderItem={(args) => {
  if (args.context.isLastItem) {
    return <MyCustomLastRow {...args} />;
  }
  return renderUIKitListItem(args);
}}
```
