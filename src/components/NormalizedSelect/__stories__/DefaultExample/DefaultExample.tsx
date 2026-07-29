import * as React from 'react';

import {createRandomizedData} from '../../../useNormalizedList/__stories__/utils/makeData';
import {NormalizedSelect} from '../../NormalizedSelect';
import type {NormalizedSelectProps} from '../../types';

import './DefaultExample.scss';

interface Entity {
    title: string;
}

export interface DefaultExampleProps extends Omit<
    NormalizedSelectProps<Entity>,
    'items' | 'mapItemDataToContentProps' | 'value' | 'onUpdate' | 'defaultValue'
> {
    itemsCount?: number;
}

/**
 * Plain NormalizedSelect with fallback UI (no UIKit).
 */
export const DefaultExample = ({itemsCount = 5, ...props}: DefaultExampleProps) => {
    const items = React.useMemo(
        () => createRandomizedData<Entity>({num: itemsCount}),
        [itemsCount],
    );
    const [value, setValue] = React.useState<string[]>([]);

    return (
        <div className="normalized-select-default-example">
            <NormalizedSelect
                {...props}
                items={items}
                value={value}
                onUpdate={setValue}
                placeholder="Select items"
                mapItemDataToContentProps={(item) => item}
            />
        </div>
    );
};
