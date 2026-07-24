import * as React from 'react';

import {Flex, Text} from '@gravity-ui/uikit';

import {useList} from '../../../../components/useList';
import {createRandomizedData} from '../../../../components/useList/__stories__/utils/makeData';
import {UIKitTreeList} from '../../../UIKitTreeList';
import type {UIKitTreeListProps} from '../../../UIKitTreeList';

type TreeItemData = {
    name: string;
};

const mapTreeItemToContentProps: UIKitTreeListProps<TreeItemData>['mapItemDataToContentProps'] = (
    item,
) => ({
    title: item.name,
});

export interface DefaultStoryProps extends Omit<
    UIKitTreeListProps<TreeItemData>,
    'items' | 'mapItemDataToContentProps' | 'list'
> {
    itemsCount?: number;
}

/**
 * Happy-path UIKitTreeList preset.
 */
export const DefaultStory = ({itemsCount = 5, ...props}: DefaultStoryProps) => {
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

    return (
        <Flex gap={5}>
            <Flex direction="column" gap={3}>
                <Text color="secondary">UIKitTreeList</Text>
                <UIKitTreeList
                    {...props}
                    list={listWithGroups}
                    mapItemDataToContentProps={mapTreeItemToContentProps}
                />
            </Flex>
            <Flex direction="column" gap={3}>
                <Text color="secondary">
                    List with `withExpandedState` false option in list state
                </Text>
                <UIKitTreeList
                    {...props}
                    list={listWithNoGroups}
                    onItemClick={null}
                    mapItemDataToContentProps={mapTreeItemToContentProps}
                />
            </Flex>
        </Flex>
    );
};
