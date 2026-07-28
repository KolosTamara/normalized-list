import * as React from 'react';

import {Button, Flex, Text, TextInput, spacing} from '@gravity-ui/uikit';

import {
    ListContainer,
    useListFilter,
    useNormalizedList,
} from '../../../../components/useNormalizedList';
import {createRandomizedData} from '../../../../components/useNormalizedList/__stories__/utils/makeData';
import {UIKitNormalizedList} from '../../../UIKitNormalizedList';
import type {
    NormalizedListContainerProps,
    NormalizedListProps,
} from '../../../../components/NormalizedList/types';

interface Entity {
    title: string;
}

export interface WithFiltrationAndControlsStoryProps extends Omit<
    NormalizedListProps<Entity>,
    'items' | 'mapItemDataToContentProps' | 'renderItem' | 'renderContainer'
> {
    itemsCount?: number;
}

export const WithFiltrationAndControlsStory = ({
    itemsCount = 5,
    ...treeListProps
}: WithFiltrationAndControlsStoryProps) => {
    const {items, renderContainer} = React.useMemo(() => {
        const baseItems = createRandomizedData<Entity>({num: itemsCount});
        const containerRenderer = (props: NormalizedListContainerProps<Entity>) => {
            if (props.list.structure.items.length === 0 && baseItems.length > 0) {
                return (
                    <Flex centerContent className={spacing({p: 2})} height="300px">
                        <Text variant="subheader-1">Nothing found</Text>
                    </Flex>
                );
            }

            return <ListContainer {...props} />;
        };

        return {items: baseItems, renderContainer: containerRenderer};
    }, [itemsCount]);

    const filterState = useListFilter({items});

    const list = useNormalizedList({items: filterState.items});

    return (
        <Flex direction="column" gap={3}>
            <TextInput
                hasClear
                placeholder="Type for search..."
                className={spacing({px: 2, py: 1})}
                style={{boxSizing: 'border-box'}}
                autoComplete="off"
                value={filterState.filter}
                onUpdate={filterState.onFilterUpdate}
                controlRef={filterState.filterRef}
            />
            <UIKitNormalizedList
                {...treeListProps}
                list={list}
                mapItemDataToContentProps={(item) => item}
                renderContainer={renderContainer}
            />
            <Flex gap={2} className={spacing({px: 2, py: 1})}>
                <Button
                    width="max"
                    onClick={() => {
                        list.state.setSelected({});
                        filterState.reset();
                    }}
                >
                    Reset
                </Button>
                <Button
                    disabled={!Object.keys(list.state.selectedById).length}
                    width="max"
                    view="action"
                    onClick={() => {
                        alert(JSON.stringify(list.state.selectedById));
                    }}
                >
                    Accept
                </Button>
            </Flex>
        </Flex>
    );
};
