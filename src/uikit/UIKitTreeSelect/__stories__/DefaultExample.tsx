import * as React from 'react';

import {createRandomizedData} from '../../../components/useList/__stories__/utils/makeData';
import type {UIKitTreeSelectProps} from '../UIKitTreeSelect';
import {UIKitTreeSelect} from '../UIKitTreeSelect';

interface Entity {
    title: string;
}

export interface DefaultExampleProps extends Omit<
    UIKitTreeSelectProps<Entity>,
    'items' | 'mapItemDataToContentProps' | 'value' | 'onUpdate' | 'defaultValue'
> {
    itemsCount?: number;
}

/**
 * Happy-path UIKitTreeSelect preset.
 */
export const DefaultExample = ({itemsCount = 5, ...props}: DefaultExampleProps) => {
    const items = React.useMemo(
        () => createRandomizedData<Entity>({num: itemsCount}),
        [itemsCount],
    );
    const [value, setValue] = React.useState<string[]>([]);

    return (
        <div style={{maxWidth: 320}}>
            <UIKitTreeSelect
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
