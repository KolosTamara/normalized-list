# TreeListItemExpandIcon

Expand/collapse control for tree groups, built with Gravity UI `ArrowToggle`.

Used as default `renderExpandIcon` inside `TreeListItemViewContent` / `renderUIKitListItem`.

## Usage

```tsx
import {TreeListItemExpandIcon} from '@gravity-ui/tree-select/uikit';

<TreeListItemExpandIcon expanded={expanded} behavior="state" />;
```

## Props

| Name     | Description                   | Type                                   | Default  |
| :------- | :---------------------------- | :------------------------------------- | :------: |
| expanded | Icon state                    | `boolean`                              |          |
| disabled | Disabled view type            | `boolean`                              |          |
| behavior | The behavior of the component | `state` \| `state-inverse` \| `action` | `action` |
