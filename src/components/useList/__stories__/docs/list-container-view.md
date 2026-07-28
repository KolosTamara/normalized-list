### ListContainerView

Presentational listbox shell. Also documented under [`ListContainer`](/docs/lab-uselist-listcontainer--docs#listcontainerview).

#### Props:

| Name        | Description                                                                          |             Type              |  Default  |
| :---------- | :----------------------------------------------------------------------------------- | :---------------------------: | :-------: |
| id          | Optional id                                                                          |           `string`            |           |
| as          | Root element type                                                                    | `keyof JSX.IntrinsicElements` |   `div`   |
| role        | ARIA role                                                                            |       `React.AriaRole`        | `listbox` |
| style       | Inline styles                                                                        |     `React.CSSProperties`     |           |
| className   | Class name                                                                           |           `string`            |           |
| fixedHeight | Fixed height + no `overflow: auto` (`--g-ts-list-container-height`, default `300px`) |           `boolean`           |           |
| extraProps  | Extra HTML attributes                                                                | `React.HTMLAttributes<'div'>` |           |

#### Usage example:

```tsx
const containerRef = React.useRef<HTMLDivElement>(null);

<ListContainerView ref={containerRef} fixedHeight>
  <ListItemView content={{title: '123'}} id="1" />
  <ListItemView content={{title: '456'}} id="2" />
</ListContainerView>;
```

For a ready-made recursive walk of `list.structure`, prefer [`ListContainer`](/docs/lab-uselist-listcontainer--docs).
