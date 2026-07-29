# UIKitListItemExpandIcon

Expand/collapse control for tree groups, built with `@gravity-ui/uikit` `ArrowToggle`.

Used as default `renderExpandIcon` inside [`UIKitListItemViewContent`](/docs/normalized-list-uikit-uikitlistitemview--docs#uikitlistitemviewcontent) / [`renderUIKitListItem`](/docs/normalized-list-uikit-renderuikitlistitem--docs).

## Usage

```tsx
import {UIKitListItemExpandIcon} from '@gravity-ui/normalized-list/uikit';

<UIKitListItemExpandIcon expanded={expanded} behavior="state" />;
```

## Props

| Name     | Description                   | Type                                   | Default  |
| :------- | :---------------------------- | :------------------------------------- | :------: |
| expanded | Icon state                    | `boolean`                              |          |
| disabled | Disabled view type            | `boolean`                              |          |
| behavior | The behavior of the component | `state` \| `state-inverse` \| `action` | `action` |
