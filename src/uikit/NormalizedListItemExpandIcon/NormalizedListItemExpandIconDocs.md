# NormalizedListItemExpandIcon

Expand/collapse control for tree groups, built with Gravity UI `ArrowToggle`.

Used as default `renderExpandIcon` inside `NormalizedListItemViewContent` / `renderUIKitListItem`.

## Usage

```tsx
import {NormalizedListItemExpandIcon} from '@gravity-ui/tree-select/uikit';

<NormalizedListItemExpandIcon expanded={expanded} behavior="state" />;
```

## Props

| Name     | Description                   | Type                                   | Default  |
| :------- | :---------------------------- | :------------------------------------- | :------: |
| expanded | Icon state                    | `boolean`                              |          |
| disabled | Disabled view type            | `boolean`                              |          |
| behavior | The behavior of the component | `state` \| `state-inverse` \| `action` | `action` |
