import * as React from 'react';

import {Button, Flex, Text, TextInput, spacing} from '@gravity-ui/uikit';

import {ListContainer, useList, useListFilter} from '../../../../useList';
import {createRandomizedData} from '../../../../useList/__stories__/utils/makeData';
import {TreeList} from '../../../TreeList';
import type {TreeListContainerProps, TreeListProps} from '../../../types';
import {UIKitListItemExpandIcon} from '../../recipes/UIKitListItemExpandIcon';
import {UIKitListItemView} from '../../recipes/UIKitListItemView';
import {UIKitListItemViewContent} from '../../recipes/UIKitListItemViewContent';

interface Entity {
    title: string;
}

export interface WithFiltrationAndControlsStoryProps extends Omit<
    TreeListProps<Entity>,
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
        const containerRenderer = (props: TreeListContainerProps<Entity>) => {
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

    const list = useList({items: filterState.items});

    const renderUIKitItem: TreeListProps<Entity>['renderItem'] = ({
        props: itemProps,
        renderContainerProps,
    }) => {
        const {content, selectionViewType, selected, disabled, ...shellProps} = itemProps;

        return (
            <UIKitListItemView
                {...shellProps}
                {...renderContainerProps}
                selected={selected}
                disabled={disabled}
                selectionViewType={selectionViewType}
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
            <TreeList
                {...treeListProps}
                list={list}
                mapItemDataToContentProps={(item) => item}
                renderContainer={renderContainer}
                renderItem={renderUIKitItem}
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
