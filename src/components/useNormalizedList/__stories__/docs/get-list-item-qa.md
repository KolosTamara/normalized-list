### getListItemQa

Builds a per-item `qa` / test id: `` `${qa}-${id}` ``.

Use the same helper in tests to target a specific row.

#### Usage example:

```ts
import {getListItemQa} from '@gravity-ui/normalized-list';

await locator.getByTestId(getListItemQa('some-list-qa', '0'));
```
