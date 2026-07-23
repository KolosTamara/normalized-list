import * as React from 'react';

import {Flex, Label, Loader, spacing} from '@gravity-ui/uikit';

import {RenderVirtualizedContainer} from '../../TreeList/__stories__/components/RenderVirtualizedContainer';
import type {TreeListOnItemClick} from '../../TreeList/types';
import {getListItemClickHandler} from '../../useList';
import type {ListItemId} from '../../useList';
import {IntersectionContainer} from '../../useList/__stories__/components/IntersectionContainer/IntersectionContainer';
import {useInfinityFetch} from '../../useList/__stories__/utils/useInfinityFetch';
import {TreeSelect} from '../TreeSelect';
import type {
    TreeSelectProps,
    TreeSelectRenderControlProps,
    TreeSelectRenderPopupProps,
} from '../types';

import {
    ListItemExpandIcon,
    ListItemView,
    ListItemViewContent,
    SelectControl,
    SelectPopup,
    getSelectedOptionsContent,
} from '../../../uikit';

interface Entity {
    title: string;
}

function identity<T>(value: T): T {
    return value;
}

export interface InfinityScrollExampleProps extends Omit<
    TreeSelectProps<Entity>,
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
 * TreeSelect with infinity scroll, wired to public UIKit API
 * (`SelectControl` + `SelectPopup` + UIKit list item recipe) via render props.
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

    const handleGroupItemClick: TreeListOnItemClick<Entity> = ({id, list}) => {
        getListItemClickHandler({list})({id});

        // click on group item
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
                ...groupItemToToggleIds.reduce<Record<ListItemId, boolean>>((acc, id) => {
                    acc[id] = treeGroupNextValue;

                    return acc;
                }, {}),
            }));
        }
    };

    return (
        <Flex>
            <TreeSelect
                {...storyProps}
                value={value}
                mapItemDataToContentProps={identity}
                items={items}
                onItemClick={handleGroupItemClick}
                renderItem={({props, context: {isLastItem, childrenIds}}) => {
                    const {content, selectionViewType, selected, disabled, ...shellProps} = props;

                    const node = (
                        <ListItemView
                            {...shellProps}
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
                renderControl={(controlProps: TreeSelectRenderControlProps<Entity>) => (
                    <SelectControl
                        {...controlProps}
                        selectedOptionsContent={getSelectedOptionsContent(controlProps, identity)}
                    />
                )}
                renderPopup={(popupProps: TreeSelectRenderPopupProps) => (
                    <SelectPopup {...popupProps} />
                )}
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
