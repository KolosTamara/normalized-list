# Fallback UI

Minimal default view components (`FallbackNormalizedSelectControl`, `FallbackNormalizedSelectPopup`,
`FallbackNormalizedSelectError`) used when consumers do not provide custom renderers
(`renderControl`, `renderPopup`, `renderError`).

These components are **internal**. Do not export them from the package public API.

For production UI override them via render props instead of relying on these fallbacks.
If you use `@gravity-ui/uikit` consider the `@gravity-ui/tree-select/uikit` layer.
