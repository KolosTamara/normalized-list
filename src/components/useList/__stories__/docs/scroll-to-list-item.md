### scrollToListItem

Scrolls a list item into view by id inside a container (or `document`).

Looks up `[data-list-item="${id}"]`.

#### Usage example:

```tsx
import {ListContainerView, scrollToListItem} from '@gravity-ui/tree-select';

const containerRef = React.useRef<HTMLDivElement>(null);

React.useLayoutEffect(() => {
  if (open) {
    containerRef.current?.focus();
    list.state.setActiveItemId(selectedId ?? list.structure.visibleFlattenIds[0]);

    if (selectedId) {
      scrollToListItem(selectedId, containerRef.current);
    }
  }
}, [open]);

<ListContainerView ref={containerRef} />;
```
