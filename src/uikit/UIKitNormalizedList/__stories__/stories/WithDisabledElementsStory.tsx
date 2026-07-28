import * as React from 'react';

import {Button, Flex, Text} from '@gravity-ui/uikit';

import {getListItemClickHandler, useNormalizedList} from '../../../../components/useNormalizedList';
import type {ListItemType} from '../../../../components/useNormalizedList';
import {UIKitNormalizedList} from '../../../UIKitNormalizedList';
import type {UIKitNormalizedListProps as NormalizedListProps} from '../../../UIKitNormalizedList';

type TreeItemData = {
    text: string;
};

const items: ListItemType<TreeItemData>[] = [
    {
        text: 'default disabled',
        disabled: true,
    },
    {
        text: 'two',
    },
    {
        text: 'default selected',
        selected: true,
    },
    {
        text: 'four',
    },
    {
        text: 'five',
    },
];

const mapTreeItemToContentProps: NormalizedListProps<TreeItemData>['mapItemDataToContentProps'] = ({
    text,
}) => ({
    title: text,
});

export interface WithDisabledElementsStoryProps extends Omit<
    NormalizedListProps<TreeItemData>,
    'items' | 'mapItemDataToContentProps' | 'renderItem'
> {}

export const WithDisabledElementsStory = ({...storyProps}: WithDisabledElementsStoryProps) => {
    const list = useNormalizedList({items, withExpandedState: false});
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <Flex width={500} gap={5} direction="column" alignItems="flex-start">
            <Flex alignItems="center" gap={1}>
                <Button
                    onClick={() => {
                        containerRef.current?.focus();
                    }}
                >
                    focus elements
                </Button>
                <Text color="secondary">to control from keyboard</Text>
            </Flex>
            <UIKitNormalizedList
                {...storyProps}
                list={list}
                containerRef={containerRef}
                mapItemDataToContentProps={mapTreeItemToContentProps}
                onItemClick={({id}) => {
                    getListItemClickHandler({list})({id});
                    alert(
                        `Clicked by item with id :"${id}" and data: ${JSON.stringify(list.structure.itemsById[id])}`,
                    );
                }}
            />
        </Flex>
    );
};
