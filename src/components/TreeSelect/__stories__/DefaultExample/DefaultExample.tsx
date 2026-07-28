import * as React from 'react';

import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

import './DefaultExample.scss';

interface Entity {
    title: string;
}

export interface DefaultExampleProps extends Omit<
    TreeSelectProps<Entity>,
    'items' | 'mapItemDataToContentProps' | 'value' | 'onUpdate' | 'defaultValue'
> {
    itemsCount?: number;
}

/**
 * Plain TreeSelect with fallback UI (no UIKit).
 */
export const DefaultExample = ({itemsCount = 5, ...props}: DefaultExampleProps) => {
    const items = React.useMemo(
        () => createRandomizedData<Entity>({num: itemsCount}),
        [itemsCount],
    );
    const [value, setValue] = React.useState<string[]>([]);

    return (
        <div className="tree-select-default-example">
            <TreeSelect
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
