import * as React from 'react';

import {Flex, Label, Loader, spacing} from '@gravity-ui/uikit';

import type {NormalizedListOnItemClick} from '../../../components/NormalizedList/types';
import {getListItemClickHandler} from '../../../components/useNormalizedList';
import type {ListItemId} from '../../../components/useNormalizedList';
import {IntersectionContainer} from '../../../components/useNormalizedList/__stories__/components/IntersectionContainer/IntersectionContainer';
import {useInfinityFetch} from '../../../components/useNormalizedList/__stories__/utils/useInfinityFetch';
import {NormalizedListItemExpandIcon} from '../../NormalizedListItemExpandIcon';
import {NormalizedListItemView} from '../../NormalizedListItemView';
import {NormalizedListItemViewContent} from '../../NormalizedListItemViewContent';
import {RenderVirtualizedContainer} from '../../UIKitNormalizedList/__stories__/components/RenderVirtualizedContainer';
import type {UIKitNormalizedSelectProps} from '../UIKitNormalizedSelect';
import {UIKitNormalizedSelect} from '../UIKitNormalizedSelect';

interface Entity {
    title: string;
}

function identity<T>(value: T): T {
    return value;
}

export interface InfinityScrollExampleProps extends Omit<
    UIKitNormalizedSelectProps<Entity>,
    | 'value'
    | 'onUpdate'
    | 'items'
    | 'mapItemDataToContentProps'
    | 'multiple'
    | 'defaultValue'
    | 'renderControl'
    | 'renderPopup'
    | 'renderItem'
> {
    itemsCount?: number;
}

/**
 * UIKitNormalizedSelect with infinity scroll (custom renderItem/renderContainer).
 */
export const InfinityScrollExample = ({
    itemsCount = 5,
    ...storyProps
}: InfinityScrollExampleProps) => {
    const [value, setValue] = React.useState<string[]>([]);
    const {
        data: items = [],
        onFetchMore,
        canFetchMore,
        isLoading,
    } = useInfinityFetch<Entity>(itemsCount, true);

    const handleGroupItemClick: NormalizedListOnItemClick<Entity> = ({id, list}) => {
        getListItemClickHandler({list})({id});

        if (list.state.expandedById && list.state.setExpanded && id in list.state.expandedById) {
            const treeGroupNextValue = !list.state.expandedById[id];
            const groupItemToToggleIds: ListItemId[] = [id];
            const stack = [...list.structure.groupsState[id].childrenIds];

            while (stack.length > 0) {
                const candidateId = stack.pop();

                if (candidateId && candidateId in list.structure.groupsState) {
                    groupItemToToggleIds.push(candidateId);

                    stack.push(...list.structure.groupsState[candidateId].childrenIds);
                }
            }

            list.state.setExpanded((prevValues) => ({
                ...prevValues,
                ...groupItemToToggleIds.reduce<Record<ListItemId, boolean>>((acc, itemId) => {
                    acc[itemId] = treeGroupNextValue;

                    return acc;
                }, {}),
            }));
        }
    };

    return (
        <Flex>
            <UIKitNormalizedSelect
                {...storyProps}
                value={value}
                mapItemDataToContentProps={identity}
                items={items}
                onItemClick={handleGroupItemClick}
                renderItem={({props, context: {isLastItem, childrenIds}}) => {
                    const {content, selectionViewType, selected, disabled, ...shellProps} = props;

                    const node = (
                        <NormalizedListItemView
                            {...shellProps}
                            selected={selected}
                            disabled={disabled}
                            selectionViewType={selectionViewType}
                            content={
                                <NormalizedListItemViewContent
                                    {...content}
                                    hasSelectionIcon={selectionViewType === 'multiple'}
                                    selected={selected}
                                    disabled={disabled}
                                    renderExpandIcon={NormalizedListItemExpandIcon}
                                    endSlot={
                                        childrenIds ? (
                                            <Label>{childrenIds.length}</Label>
                                        ) : undefined
                                    }
                                />
                            }
                        />
                    );

                    if (isLastItem) {
                        return (
                            <IntersectionContainer
                                onIntersect={canFetchMore ? onFetchMore : undefined}
                            >
                                {node}
                            </IntersectionContainer>
                        );
                    }

                    return node;
                }}
                renderContainer={RenderVirtualizedContainer}
                popupWidth={300}
                onUpdate={setValue}
                slotAfterListBody={
                    isLoading && (
                        <Flex justifyContent="center" className={spacing({py: 2})}>
                            <Loader size="m" />
                        </Flex>
                    )
                }
            />
        </Flex>
    );
};
