import * as React from 'react';

import {Database, PlugConnection} from '@gravity-ui/icons';
import {Button, Flex, Icon} from '@gravity-ui/uikit';

import {useList} from '../../../../useList';
import type {ListItemId, ListItemViewContentType} from '../../../../useList';
import {createRandomizedData} from '../../../../useList/__stories__/utils/makeData';
import {TreeList} from '../../../TreeList';
import type {TreeListProps} from '../../../types';
import {UIKitListItemExpandIcon} from '../../recipes/UIKitListItemExpandIcon';
import {UIKitListItemView} from '../../recipes/UIKitListItemView';
import {UIKitListItemViewContent} from '../../recipes/UIKitListItemViewContent';

const expandButtonLabel = 'Expand';
const closeButtonLabel = 'Close';

/**
 * Just for example how to work with data
 */
interface CustomDataStructure {
    a: string;
}

const mapCustomDataStructureToKnownProps = (
    props: CustomDataStructure,
): ListItemViewContentType => ({
    title: props.a,
});

export interface WithGroupSelectionAndCustomIconStoryProps extends Omit<
    TreeListProps<CustomDataStructure>,
    'items' | 'size' | 'mapItemDataToContentProps' | 'renderItem'
> {
    itemsCount?: number;
}

export const WithGroupSelectionAndCustomIconStory = ({
    itemsCount = 5,
    ...props
}: WithGroupSelectionAndCustomIconStoryProps) => {
    const items = React.useMemo(
        () =>
            createRandomizedData<CustomDataStructure>({
                num: itemsCount,
                getData: (a) => ({a}),
            }),
        [itemsCount],
    );

    const list = useList({items});

    const onItemClick = ({id}: {id: ListItemId}) => {
        if (list.state.disabledById[id]) return;

        list.state.setSelected((prevState) => ({
            ...(props.multiple ? prevState : {}),
            [id]: !prevState[id],
        }));

        list.state.setActiveItemId(id);
    };

    return (
        <Flex direction="column" gap={3}>
            <TreeList
                {...props}
                list={list}
                size="l"
                mapItemDataToContentProps={mapCustomDataStructureToKnownProps}
                onItemClick={onItemClick}
                renderItem={({id, props: itemProps, context: {childrenIds}}) => {
                    // Allow selection icon on groups too (default: groups use `single`)
                    const selectionViewType = props.multiple ? 'multiple' : 'single';

                    return (
                        <UIKitListItemView
                            {...itemProps}
                            selectionViewType={selectionViewType}
                            content={
                                <UIKitListItemViewContent
                                    {...itemProps.content}
                                    isGroup={false}
                                    hasSelectionIcon={selectionViewType === 'multiple'}
                                    selected={itemProps.selected}
                                    disabled={itemProps.disabled}
                                    startSlot={
                                        <Icon
                                            size={16}
                                            data={childrenIds ? Database : PlugConnection}
                                        />
                                    }
                                    endSlot={
                                        childrenIds ? (
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    list.state.setExpanded?.(
                                                        (prevExpandedState) => ({
                                                            ...prevExpandedState,
                                                            [id]: !prevExpandedState[id],
                                                        }),
                                                    );
                                                }}
                                                aria-label={
                                                    itemProps.content.expanded
                                                        ? closeButtonLabel
                                                        : expandButtonLabel
                                                }
                                            >
                                                <Button.Icon>
                                                    <UIKitListItemExpandIcon
                                                        expanded={itemProps.content.expanded}
                                                        behavior="action"
                                                    />
                                                </Button.Icon>
                                            </Button>
                                        ) : undefined
                                    }
                                />
                            }
                        />
                    );
                }}
            />
        </Flex>
    );
};
