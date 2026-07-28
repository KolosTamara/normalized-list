import * as React from 'react';

import type {ListItemType} from '../../../components/useNormalizedList';
import type {UIKitNormalizedSelectProps} from '../UIKitNormalizedSelect';
import {UIKitNormalizedSelect} from '../UIKitNormalizedSelect';

interface Entity {
    text: string;
    id: string;
}

export interface WithDisabledElementsExampleProps extends Omit<
    UIKitNormalizedSelectProps<Entity>,
    'items' | 'mapItemDataToContentProps' | 'renderControl' | 'renderPopup' | 'renderItem'
> {}

const items: ListItemType<Entity>[] = [
    {
        data: {id: '1', text: 'default disabled'},
        disabled: true,
    },
    {
        data: {id: '2', text: 'two'},
        disabled: true,
    },
    {
        data: {id: '3', text: 'default selected'},
    },
    {
        data: {id: '4', text: 'four'},
        disabled: true,
    },
    {
        data: {id: '5', text: 'five'},
    },
];

/**
 * UIKitNormalizedSelect with disabled items.
 */
export const WithDisabledElementsExample = (props: WithDisabledElementsExampleProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <UIKitNormalizedSelect
            {...props}
            items={items}
            getItemId={({id}) => id}
            containerRef={containerRef}
            mapItemDataToContentProps={({text}) => ({title: text})}
        />
    );
};
