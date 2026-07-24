import * as React from 'react';

import type {ListItemType} from '../../../components/useList';
import type {UIKitTreeSelectProps} from '../UIKitTreeSelect';
import {UIKitTreeSelect} from '../UIKitTreeSelect';

interface Entity {
    text: string;
    id: string;
}

export interface WithDisabledElementsExampleProps extends Omit<
    UIKitTreeSelectProps<Entity>,
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
 * UIKitTreeSelect with disabled items.
 */
export const WithDisabledElementsExample = (props: WithDisabledElementsExampleProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <UIKitTreeSelect
            {...props}
            items={items}
            getItemId={({id}) => id}
            containerRef={containerRef}
            mapItemDataToContentProps={({text}) => ({title: text})}
        />
    );
};
