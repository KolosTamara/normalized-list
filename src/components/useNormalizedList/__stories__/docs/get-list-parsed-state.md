### getListParsedState

Used under the hood of `useNormalizedList` to build `structure` and initial state. Call it when you need initial maps (`expandedById`, …) from the items declaration.

#### Usage example:

```tsx
import {getListParsedState} from '@gravity-ui/normalized-list';

const [expandedById, setExpanded] = React.useState(
  () => getListParsedState({items}).initialState.expandedById,
);
```
