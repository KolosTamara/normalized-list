import * as React from 'react';

import {useList} from '../../../../useList';
import './DefaultStory.scss';
import {createRandomizedData} from '../../../../useList/__stories__/utils/makeData';
import {TreeList, TreeListProps} from '../../../../TreeList';

type TreeItemData = {
    name: string;
};

const mapTreeItemToContentProps: TreeListProps<TreeItemData>['mapItemDataToContentProps'] = (
    item,
) => ({
    title: item.name,
});

export interface DefaultStoryProps extends Omit<
    TreeListProps<TreeItemData>,
    'items' | 'mapItemDataToContentProps'
> {
    itemsCount?: number;
}

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
        <div className="tree-list-default-story">
            <div className="tree-list-default-story__column">
                <span className="tree-list-default-story__label">Default TreeList</span>
                <TreeList
                    {...props}
                    list={listWithGroups}
                    mapItemDataToContentProps={mapTreeItemToContentProps}
                />
            </div>
            <div className="tree-list-default-story__column">
                <span className="tree-list-default-story__label">
                    List with `withExpandedState` false option in list state
                </span>

                <TreeList
                    {...props}
                    list={listWithNoGroups}
                    onItemClick={null}
                    mapItemDataToContentProps={mapTreeItemToContentProps}
                />
            </div>
        </div>
    );
};
