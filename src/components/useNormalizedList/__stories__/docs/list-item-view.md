### ListItemView

Structural row shell for list items. Full docs: [`ListItemView`](/docs/lab-usenormalizedlist-listitemview--docs).

```tsx
import {ListItemView} from '@gravity-ui/normalized-list';
```

#### Usage example:

```tsx
import {type ListItemType, ListItemView} from '@gravity-ui/normalized-list';

type Entity = {title: string; subtitle: string; icon: React.ReactNode};

const items: ListItemType<Entity>[] = [
  {title: 'some title 1', subtitle: 'some subtitle 1', icon: <Icon />},
  {title: 'some title 2', subtitle: 'some subtitle 2', icon: <Icon />},
];

const List = () => (
  <>
    {items.map((item, i) => (
      <ListItemView
        key={i}
        id={String(i)}
        content={{
          title: item.title,
          subtitle: item.subtitle,
          endSlot: item.icon,
        }}
        // content={<YourCustomComponent />}
      />
    ))}
  </>
);
```

#### Props:

| Name              | Description                                                    |                     Type                     |  Default   |
| :---------------- | :------------------------------------------------------------- | :------------------------------------------: | :--------: |
| id                | Required. Sets `[data-list-item="${id}"]` for scroll-to-item   |                   `string`                   |            |
| as                | Override root HTML tag                                         |             `React.ElementType`              |    `li`    |
| size              | Item size                                                      |             `s \| m \| l \| xl`              |    `m`     |
| height            | Height in px; or CSS `--g-nl-list-item-height`                 |                   `number`                   |            |
| selected          | Selected state                                                 |                  `boolean`                   |            |
| active            | Focused / keyboard-active state                                |                  `boolean`                   |            |
| disabled          | Disabled; blocks click                                         |                  `boolean`                   |            |
| selectionViewType | Selection chrome (`single` \| `multiple`)                      |           `'single' \| 'multiple'`           | `multiple` |
| activeOnHover     | Hover active styles (defaults to `true` when `onClick` is set) |                  `boolean`                   |            |
| dragging          | Dragging styles                                                |                  `boolean`                   |            |
| onClick           | Click handler (DOM event; ignored when `disabled`)             |          `React.MouseEventHandler`           |            |
| content           | Content object or custom React node                            | `ListItemViewContentType \| React.ReactNode` |            |
| qa                | Test selector (`data-qa`)                                      |                   `string`                   |            |
| role              | ARIA role                                                      |               `React.AriaRole`               |  `option`  |
| style             | Inline styles                                                  |            `React.CSSProperties`             |            |
| className         | Class name                                                     |                   `string`                   |            |

#### Content object:

| Name                | Description           |             Type             |
| :------------------ | :-------------------- | :--------------------------: |
| title               | Required              |      `React.ReactNode`       |
| subtitle            | Under title           |      `React.ReactNode`       |
| startSlot / endSlot | Slots around title    |      `React.ReactNode`       |
| indentation         | Visual nest level     |           `number`           |
| isGroup / expanded  | Group expand UI       |          `boolean`           |
| expandIconPlacement | `start` \| `end`      |      `'start' \| 'end'`      |
| renderExpandIcon    | Custom expand control | `(props) => React.ReactNode` |
