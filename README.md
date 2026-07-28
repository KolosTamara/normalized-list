# @gravity-ui/tree-select

Headless tree list and tree select primitives for React, plus an optional Gravity UI (`@gravity-ui/uikit`) presentation layer.

## Install

```bash
npm install @gravity-ui/tree-select
```

Peer dependencies: `react`, `react-dom`. For the UIKit layer also install `@gravity-ui/uikit` and `@gravity-ui/icons`.

## Package layout

| Entry | Import                          | What you get                                                                        |
| ----- | ------------------------------- | ----------------------------------------------------------------------------------- |
| Core  | `@gravity-ui/tree-select`       | `NormalizedSelect`, `NormalizedList`, `useNormalizedList`, list building blocks     |
| UIKit | `@gravity-ui/tree-select/uikit` | `UIKitNormalizedSelect`, `UIKitNormalizedList`, themed controls and list item views |

Core ships **minimal fallback UI** when you do not pass render props. Prefer custom renderers or the UIKit entry for production.

## Quick start

### UIKit NormalizedList (recommended for Gravity UI apps)

```tsx
import {useNormalizedList} from '@gravity-ui/tree-select';
import {UIKitNormalizedList} from '@gravity-ui/tree-select/uikit';

const items = [
  {
    data: {title: 'Parent'},
    children: [{data: {title: 'Child'}}],
  },
];

export function Example() {
  const list = useNormalizedList({items, defaultExpandedState: 'expanded'});

  return <UIKitNormalizedList list={list} multiple mapItemDataToContentProps={(item) => item} />;
}
```

### Core NormalizedList + `useNormalizedList`

```tsx
import {NormalizedList, useNormalizedList} from '@gravity-ui/tree-select';

const items = [{data: {title: 'One'}}, {data: {title: 'Two'}}];

export function Example() {
  const list = useNormalizedList({items});

  return <NormalizedList list={list} mapItemDataToContentProps={(item) => item} />;
}
```

## Customization

- **Render props** on `NormalizedSelect` / `NormalizedList`: `renderItem`, `renderContainer`, and on select also `renderControl`, `renderPopup`, `renderError`.
- **Slots** on `NormalizedSelect`: `slotBeforeListBody`, `slotAfterListBody` (filter, footer, loader).
- **Theming**: CSS classes use the package namespace `g-nl-`. Override variables such as `--g-nl-list-item-background-hover` on a parent or theme class.

## CSS namespace

All package BEM roots and package-owned CSS variables (core and UIKit) are prefixed with `g-nl-`. Override variables such as `--g-nl-list-item-background-hover` on a parent or theme class.

The UIKit entry additionally maps those variables to Gravity UI design tokens (`--g-color-*`, `--g-spacing-*`, …)

## Storybook

Interactive examples live under **Lab** (core) and **Lab/UIKit**. Component docs are MDX pages (`*Docs.md`) next to each Storybook entry.

## License

MIT
