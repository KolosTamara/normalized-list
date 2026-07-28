import * as React from 'react';

import {FolderOpen} from '@gravity-ui/icons';
import {Button, DropdownMenu, Flex, Icon} from '@gravity-ui/uikit';

import {useNormalizedList} from '../../../../components/useNormalizedList';
import type {ListItemId} from '../../../../components/useNormalizedList';
import {createRandomizedData} from '../../../../components/useNormalizedList/__stories__/utils/makeData';
import {UIKitNormalizedList} from '../../../UIKitNormalizedList';
import type {UIKitNormalizedListProps as NormalizedListProps} from '../../../UIKitNormalizedList';
import {
    UIKitListItemExpandIcon,
    UIKitListItemView,
    UIKitListItemViewContent,
} from '../../../../uikit';

const expandButtonLabel = 'Expand';
const closeButtonLabel = 'Close';
const moreOptionsButton = 'More options';

type TreeItemData = {
    title: string;
};

export interface WithItemLinksAndActionsStoryProps extends Omit<
    NormalizedListProps<TreeItemData>,
    'items' | 'size' | 'mapItemDataToContentProps' | 'renderItem'
> {}

export const WithItemLinksAndActionsStory = (props: WithItemLinksAndActionsStoryProps) => {
    const items = React.useMemo(() => createRandomizedData<TreeItemData>({num: 10, depth: 1}), []);

    const list = useNormalizedList({items});

    const onItemClick = ({id}: {id: ListItemId}) => {
        if (list.state.disabledById[id]) return;

        list.state.setSelected((prevState) => ({
            ...(props.multiple ? prevState : {}),
            [id]: !prevState[id],
        }));

        list.state.setActiveItemId(id);
    };

    return (
        <UIKitNormalizedList
            {...props}
            list={list}
            mapItemDataToContentProps={(item) => item}
            onItemClick={onItemClick}
            size="l"
            renderItem={({id, props: itemProps, context: {childrenIds}}) => {
                return (
                    <a href="#" style={{textDecoration: 'none', color: 'inherit', width: '100%'}}>
                        <UIKitListItemView
                            {...itemProps}
                            content={
                                <UIKitListItemViewContent
                                    {...itemProps.content}
                                    isGroup={false}
                                    hasSelectionIcon={itemProps.selectionViewType === 'multiple'}
                                    selected={itemProps.selected}
                                    disabled={itemProps.disabled}
                                    endSlot={
                                        <DropdownMenu
                                            onSwitcherClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                            items={[
                                                {
                                                    action: (e) => {
                                                        e.stopPropagation();
                                                        console.info(
                                                            `Clicked by action with id: ${id}`,
                                                        );
                                                    },
                                                    text: 'action 1',
                                                },
                                            ]}
                                            defaultSwitcherProps={{
                                                'aria-label': moreOptionsButton,
                                            }}
                                        />
                                    }
                                    startSlot={
                                        childrenIds ? (
                                            <Button
                                                size="m"
                                                view="flat"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();

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
                                        ) : (
                                            <Flex
                                                width={28}
                                                justifyContent="center"
                                                spacing={
                                                    (itemProps.content.indentation || 0) > 0
                                                        ? {ml: 1}
                                                        : undefined
                                                }
                                            >
                                                <Icon data={FolderOpen} size={16} />
                                            </Flex>
                                        )
                                    }
                                />
                            }
                        />
                    </a>
                );
            }}
        />
    );
};
