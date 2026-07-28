# UIKitNormalizedSelectControl

Gravity UI–styled select control for `NormalizedSelect` / [`UIKitNormalizedSelect`](/docs/lab-uikit-uikitnormalizedselect--docs) (`renderControl`).

## Usage

```tsx
import {UIKitNormalizedSelectControl, getSelectedOptionsContent} from '@gravity-ui/normalized-list/uikit';

renderControl={(controlProps) => (
  <UIKitNormalizedSelectControl
    {...controlProps}
    selectedOptionsContent={getSelectedOptionsContent(
      controlProps,
      mapItemDataToContentProps,
    )}
  />
)}
```

Accepts `NormalizedSelectRenderControlProps` plus required `selectedOptionsContent`. When `hasClear` is set and there is a value, a clear (×) button is rendered inside the control.

CSS block: `.g-nl-normalized-select-control`.

## `getSelectedOptionsContent`

Builds the comma-separated label shown in the control from the current `value` and list structure.

Takes `{list, value}` (from `NormalizedSelectRenderControlProps`) and the same `mapItemDataToContentProps` you pass to the select. Missing ids are skipped; titles are joined with `", "`.

Replace this helper when you need tags, counts, or custom formatting in the control.
