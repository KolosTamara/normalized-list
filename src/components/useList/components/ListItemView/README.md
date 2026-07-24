# ListItemView

Public structural shell for a list row: layout, click/active/selected/dragging
behavior, and size/radius modifiers.

It ships with **default visual styles** (hover / selected / dragging backgrounds,
padding, border-radius). Those defaults are intentionally neutral placeholders —
consumers are expected to **theme or override** them for production UI.

## Theming

Override CSS variables on `.g-ts-list-item-view` (or a theme class).
Variable names follow the package namespace (`g-ts-` from `$ns` / `NAMESPACE`):

| Variable                               | Purpose                                            |
| -------------------------------------- | -------------------------------------------------- |
| `--g-ts-list-item-background-hover`    | Hover / active background                          |
| `--g-ts-list-item-background-selected` | Selected background (single selection)             |
| `--g-ts-list-item-background-dragging` | Dragging background                                |
| `--g-ts-list-item-border-radius`       | Corner radius (optional; size mods have fallbacks) |
| `--g-ts-list-item-dragging-z-index`    | Z-index while dragging                             |

Example: `@gravity-ui/tree-select/uikit` wraps this component and remaps the
variables to Gravity UI color tokens via `.g-ts-list-item-view_theme-uikit`.

Default **content** renderers (`FallbackListItemViewContent`, `FallbackListItemExpandIcon`) live
in `../fallback` and are internal — prefer custom `content` / UIKit recipes.
