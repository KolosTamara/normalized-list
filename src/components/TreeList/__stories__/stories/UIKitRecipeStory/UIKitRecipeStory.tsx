import * as React from 'react';

import {Flex, Text} from '@gravity-ui/uikit';

import {ListItemView, useList} from '../../../../useList';
import {createRandomizedData} from '../../../../useList/__stories__/utils/makeData';
import {TreeList} from '../../../TreeList';
import type {TreeListProps} from '../../../types';
import {UIKitListItemExpandIcon} from '../../recipes/UIKitListItemExpandIcon';
import {UIKitListItemViewContent} from '../../recipes/UIKitListItemViewContent';

import './UIKitRecipeStory.scss';

type TreeItemData = {
    name: string;
};

const mapTreeItemToContentProps: TreeListProps<TreeItemData>['mapItemDataToContentProps'] = (
    item,
) => ({
    title: item.name,
});

export interface UIKitRecipeStoryProps extends Omit<
    TreeListProps<TreeItemData>,
    'items' | 'mapItemDataToContentProps' | 'renderItem'
> {
    itemsCount?: number;
}

export const UIKitRecipeStory = ({itemsCount = 5, ...props}: UIKitRecipeStoryProps) => {
    const items = React.useMemo(
        () =>
            createRandomizedData<TreeItemData>({
                num: itemsCount,
                getData: (name) => ({name}),
            }),
        [itemsCount],
    );

    const listWithGroups = useList({items});

    const listWithNoGroups = useList({
        items,
        withExpandedState: false,
    });

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
                className={'g-list-item-view_theme-uikit'}
                content={
                    <UIKitListItemViewContent
                        {...content}
                        hasSelectionIcon={selectionViewType === 'multiple'}
                        selected={selected}
                        disabled={disabled}
                        renderExpandIcon={UIKitListItemExpandIcon}
                    />
                }
            />
        );
    };

    return (
        <Flex gap={5}>
            <Flex direction="column" gap={3}>
                <Text color="secondary">UIKit recipe TreeList</Text>
                <TreeList
                    {...props}
                    list={listWithGroups}
                    mapItemDataToContentProps={mapTreeItemToContentProps}
                    renderItem={renderUIKitItem}
                />
            </Flex>
            <Flex direction="column" gap={3}>
                <Text color="secondary">
                    List with `withExpandedState` false option in list state
                </Text>
                <TreeList
                    {...props}
                    list={listWithNoGroups}
                    onItemClick={null}
                    mapItemDataToContentProps={mapTreeItemToContentProps}
                    renderItem={renderUIKitItem}
                />
            </Flex>
        </Flex>
    );
};
