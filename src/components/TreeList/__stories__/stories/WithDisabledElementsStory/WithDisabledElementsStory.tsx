import * as React from 'react';

import {Button, Flex, Text} from '@gravity-ui/uikit';

import {getListItemClickHandler, useList} from '../../../../useList';
import type {ListItemType} from '../../../../useList';
import {TreeList} from '../../../TreeList';
import type {TreeListProps} from '../../../types';
import {ListItemExpandIcon, ListItemView, ListItemViewContent} from '../../../../../uikit';

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

    const renderUIKitItem: TreeListProps<TreeItemData>['renderItem'] = ({
        props: itemProps,
        renderContainerProps,
    }) => {
        const {content, selectionViewType, selected, disabled, ...shellProps} = itemProps;

        return (
            <ListItemView
                {...shellProps}
                {...renderContainerProps}
                selected={selected}
                disabled={disabled}
                selectionViewType={selectionViewType}
                content={
                    <ListItemViewContent
                        {...content}
                        hasSelectionIcon={selectionViewType === 'multiple'}
                        selected={selected}
                        disabled={disabled}
                        renderExpandIcon={ListItemExpandIcon}
                    />
                }
            />
        );
    };

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
            <TreeList
                {...storyProps}
                list={list}
                containerRef={containerRef}
                mapItemDataToContentProps={mapTreeItemToContentProps}
                renderItem={renderUIKitItem}
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
