import * as React from 'react';

import {useNormalizedList} from '../../../useNormalizedList';
import './DefaultStory.scss';
import {createRandomizedData} from '../../../useNormalizedList/__stories__/utils/makeData';
import {NormalizedList, NormalizedListProps} from '../../../NormalizedList';

type TreeItemData = {
    name: string;
};

const mapTreeItemToContentProps: NormalizedListProps<TreeItemData>['mapItemDataToContentProps'] = (
    item,
) => ({
    title: item.name,
});

export interface DefaultStoryProps extends Omit<
    NormalizedListProps<TreeItemData>,
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

    const listWithGroups = useNormalizedList({items});

    const listWithNoGroups = useNormalizedList({
        items,
        withExpandedState: false,
    });

    return (
        <div className="normalized-list-default-story">
            <div className="normalized-list-default-story__column">
                <span className="normalized-list-default-story__label">Default NormalizedList</span>
                <NormalizedList
                    {...props}
                    list={listWithGroups}
                    mapItemDataToContentProps={mapTreeItemToContentProps}
                />
            </div>
            <div className="normalized-list-default-story__column">
                <span className="normalized-list-default-story__label">
                    List with `withExpandedState` false option in list state
                </span>

                <NormalizedList
                    {...props}
                    list={listWithNoGroups}
                    onItemClick={null}
                    mapItemDataToContentProps={mapTreeItemToContentProps}
                />
            </div>
        </div>
    );
};
