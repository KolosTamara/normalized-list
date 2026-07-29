import type * as React from 'react';

import type {NormalizedSelectRenderControlProps} from '../components/NormalizedSelect/types';

export function getSelectedOptionsContent<T>(
    {list, value}: Pick<NormalizedSelectRenderControlProps<T>, 'list' | 'value'>,
    mapItemDataToContentProps: (item: T) => {title?: React.ReactNode},
): string {
    return value
        .map((itemId) =>
            itemId in list.structure.itemsById
                ? mapItemDataToContentProps(list.structure.itemsById[itemId]).title
                : '',
        )
        .filter(Boolean)
        .join(', ');
}
