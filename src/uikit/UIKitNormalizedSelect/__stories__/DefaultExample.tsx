import * as React from 'react';

import {createRandomizedData} from '../../../components/useNormalizedList/__stories__/utils/makeData';
import type {UIKitNormalizedSelectProps} from '../UIKitNormalizedSelect';
import {UIKitNormalizedSelect} from '../UIKitNormalizedSelect';

interface Entity {
    title: string;
}

export interface DefaultExampleProps extends Omit<
    UIKitNormalizedSelectProps<Entity>,
    'items' | 'mapItemDataToContentProps' | 'value' | 'onUpdate' | 'defaultValue'
> {
    itemsCount?: number;
}

/**
 * Happy-path UIKitNormalizedSelect preset.
 */
export const DefaultExample = ({itemsCount = 5, ...props}: DefaultExampleProps) => {
    const items = React.useMemo(
        () => createRandomizedData<Entity>({num: itemsCount}),
        [itemsCount],
    );
    const [value, setValue] = React.useState<string[]>([]);

    return (
        <div style={{maxWidth: 320}}>
            <UIKitNormalizedSelect
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
