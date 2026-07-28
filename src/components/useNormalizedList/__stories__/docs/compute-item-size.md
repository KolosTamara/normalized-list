### computeItemSize

Computes list item height from size and whether the row has a subtitle (two-line).

Uses `modToHeight` under the hood.

#### Usage example:

```tsx
<VirtualizedListContainer
  items={visibleFlattenIds}
  itemSize={(index) =>
    computeItemSize(size, Boolean(itemsById[visibleFlattenIds[index]]?.subtitle))
  }
/>
```
