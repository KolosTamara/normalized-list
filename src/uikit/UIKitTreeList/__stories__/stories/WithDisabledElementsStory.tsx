import * as React from 'react';

import {Button, Flex, Text} from '@gravity-ui/uikit';

import {getListItemClickHandler, useList} from '../../../../components/useList';
import type {ListItemType} from '../../../../components/useList';
import {UIKitTreeList} from '../../../UIKitTreeList';
import type {UIKitTreeListProps as TreeListProps} from '../../../UIKitTreeList';

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

const mapTreeItemToContentProps: TreeListProps<TreeItemData>['mapItemDataToContentProps'] = ({
    text,
}) => ({
    title: text,
});

export interface WithDisabledElementsStoryProps extends Omit<
    TreeListProps<TreeItemData>,
    'items' | 'mapItemDataToContentProps' | 'renderItem'
> {}

export const WithDisabledElementsStory = ({...storyProps}: WithDisabledElementsStoryProps) => {
    const list = useList({items, withExpandedState: false});
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
            <UIKitTreeList
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
