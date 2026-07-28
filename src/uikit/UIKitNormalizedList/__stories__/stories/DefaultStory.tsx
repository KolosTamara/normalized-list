import * as React from 'react';

import {Flex, Text} from '@gravity-ui/uikit';

import {useNormalizedList} from '../../../../components/useNormalizedList';
import {createRandomizedData} from '../../../../components/useNormalizedList/__stories__/utils/makeData';
import {UIKitNormalizedList} from '../../../UIKitNormalizedList';
import type {UIKitNormalizedListProps} from '../../../UIKitNormalizedList';

type TreeItemData = {
    name: string;
};

const mapTreeItemToContentProps: UIKitNormalizedListProps<TreeItemData>['mapItemDataToContentProps'] =
    (item) => ({
        title: item.name,
    });

export interface DefaultStoryProps extends Omit<
    UIKitNormalizedListProps<TreeItemData>,
    'items' | 'mapItemDataToContentProps' | 'list'
> {
    itemsCount?: number;
}

/**
 * Happy-path UIKitNormalizedList preset.
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

    const listWithGroups = useNormalizedList({items});

    const listWithNoGroups = useNormalizedList({
        items,
        withExpandedState: false,
    });

    return (
        <Flex gap={5}>
            <Flex direction="column" gap={3}>
                <Text color="secondary">UIKitNormalizedList</Text>
                <UIKitNormalizedList
                    {...props}
                    list={listWithGroups}
                    mapItemDataToContentProps={mapTreeItemToContentProps}
                />
            </Flex>
            <Flex direction="column" gap={3}>
                <Text color="secondary">
                    List with `withExpandedState` false option in list state
                </Text>
                <UIKitNormalizedList
                    {...props}
                    list={listWithNoGroups}
                    onItemClick={null}
                    mapItemDataToContentProps={mapTreeItemToContentProps}
                />
            </Flex>
        </Flex>
    );
};
