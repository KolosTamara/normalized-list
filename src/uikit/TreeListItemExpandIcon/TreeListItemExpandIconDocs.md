# TreeListItemExpandIcon

Expand/collapse control for tree groups, built with Gravity UI `ArrowToggle`.

## Usage

```tsx
import {TreeListItemExpandIcon} from '@gravity-ui/tree-select/uikit';

<TreeListItemExpandIcon expanded={expanded} behavior="state" />;
```

`behavior`: `state` (reflects expanded) or `action` (always points to the expand affordance). Used as default `renderExpandIcon` inside `TreeListItemViewContent` / `renderUIKitListItem`.
