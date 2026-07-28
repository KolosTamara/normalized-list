# TreeSelectControl

Gravity UI–styled select control for `TreeSelect` / [`UIKitTreeSelect`](/docs/lab-uikit-uikittreeselect--docs) (`renderControl`).

## Usage

```tsx
import {TreeSelectControl, getSelectedOptionsContent} from '@gravity-ui/tree-select/uikit';

renderControl={(controlProps) => (
  <TreeSelectControl
    {...controlProps}
    selectedOptionsContent={getSelectedOptionsContent(
      controlProps,
      mapItemDataToContentProps,
    )}
  />
)}
```

Accepts `TreeSelectRenderControlProps` plus required `selectedOptionsContent`. When `hasClear` is set and there is a value, a clear (×) button is rendered inside the control.

CSS block: `.g-ts-tree-select-control`.

## `getSelectedOptionsContent`

Builds the comma-separated label shown in the control from the current `value` and list structure.

Takes `{list, value}` (from `TreeSelectRenderControlProps`) and the same `mapItemDataToContentProps` you pass to the select. Missing ids are skipped; titles are joined with `", "`.

Replace this helper when you need tags, counts, or custom formatting in the control.
