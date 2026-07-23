import * as React from 'react';

import {FolderOpen} from '@gravity-ui/icons';
import {Button, DropdownMenu, Flex, Icon} from '@gravity-ui/uikit';

import type {ListItemId, UseListResult} from '../../useList';
import {createRandomizedData} from '../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../TreeSelect';
import type {
    TreeSelectProps,
    TreeSelectRenderControlProps,
    TreeSelectRenderItem,
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

const expandButtonLabel = 'Expand';
const closeButtonLabel = 'Close';
const moreOptionsButton = 'More options';

interface Entity {
    title: string;
}

export interface WithItemLinksAndActionsExampleProps extends Omit<
    TreeSelectProps<Entity>,
    | 'value'
    | 'onUpdate'
    | 'items'
    | 'mapItemDataToContentProps'
    | 'size'
    | 'open'
    | 'onOpenChange'
    | 'renderControl'
    | 'renderPopup'
    | 'renderItem'
    | 'onItemClick'
> {}

const mapItemDataToContentProps = (item: Entity) => item;

/**
 * TreeSelect with item links and row actions, wired to public UIKit API
 * (`SelectControl` + `SelectPopup` + UIKit list item recipe) via render props.
 */
export const WithItemLinksAndActionsExample = (storyProps: WithItemLinksAndActionsExampleProps) => {
    const [value, setValue] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(true);
    const items = React.useMemo(() => createRandomizedData<Entity>({num: 10, depth: 1}), []);

    const onItemClick = (id: ListItemId, list: UseListResult<Entity>) => {
        if (list.state.disabledById[id]) return;

        setValue([id]);
        list.state.setActiveItemId(id);
        setOpen(false);
    };

    const renderItem: TreeSelectRenderItem<Entity> = ({
        id,
        props: itemProps,
        context: {childrenIds},
        list,
    }) => {
        return (
            <a href="#" style={{textDecoration: 'none', color: 'inherit', width: '100%'}}>
                <ListItemView
                    {...itemProps}
                    content={
                        <ListItemViewContent
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
                                                console.info(`Clicked by action with id: ${id}`);
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

                                            list.state.setExpanded?.((prevExpandedState) => ({
                                                ...prevExpandedState,
                                                [id]: !prevExpandedState[id],
                                            }));
                                        }}
                                        aria-label={
                                            itemProps.content.expanded
                                                ? closeButtonLabel
                                                : expandButtonLabel
                                        }
                                    >
                                        <Button.Icon>
                                            <ListItemExpandIcon
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
                    onClick={() => onItemClick(id, list)}
                />
            </a>
        );
    };

    return (
        <Flex>
            <TreeSelect
                {...storyProps}
                value={value}
                items={items}
                mapItemDataToContentProps={mapItemDataToContentProps}
                open={open}
                onOpenChange={setOpen}
                onItemClick={null}
                size="l"
                renderItem={renderItem}
                renderControl={(controlProps: TreeSelectRenderControlProps<Entity>) => (
                    <SelectControl
                        {...controlProps}
                        selectedOptionsContent={getSelectedOptionsContent(
                            controlProps,
                            mapItemDataToContentProps,
                        )}
                    />
                )}
                renderPopup={(popupProps: TreeSelectRenderPopupProps) => (
                    <SelectPopup {...popupProps} />
                )}
            />
        </Flex>
    );
};
