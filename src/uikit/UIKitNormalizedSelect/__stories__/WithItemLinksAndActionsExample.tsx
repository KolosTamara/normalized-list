import * as React from 'react';

import {FolderOpen} from '@gravity-ui/icons';
import {Button, DropdownMenu, Flex, Icon} from '@gravity-ui/uikit';

import type {ListItemId, UseNormalizedListResult} from '../../../components/useNormalizedList';
import {createRandomizedData} from '../../../components/useNormalizedList/__stories__/utils/makeData';
import type {NormalizedSelectRenderItem} from '../../../components/NormalizedSelect/types';
import {UIKitListItemExpandIcon} from '../../UIKitListItemExpandIcon';
import {UIKitListItemView} from '../../UIKitListItemView';
import {UIKitListItemViewContent} from '../../UIKitListItemViewContent';
import type {UIKitNormalizedSelectProps} from '../UIKitNormalizedSelect';
import {UIKitNormalizedSelect} from '../UIKitNormalizedSelect';

const expandButtonLabel = 'Expand';
const closeButtonLabel = 'Close';
const moreOptionsButton = 'More options';

interface Entity {
    title: string;
}

export interface WithItemLinksAndActionsExampleProps extends Omit<
    UIKitNormalizedSelectProps<Entity>,
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
 * UIKitNormalizedSelect with custom item links and row actions.
 */
export const WithItemLinksAndActionsExample = (storyProps: WithItemLinksAndActionsExampleProps) => {
    const [value, setValue] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(true);
    const items = React.useMemo(() => createRandomizedData<Entity>({num: 10, depth: 1}), []);

    const onItemClick = (id: ListItemId, list: UseNormalizedListResult<Entity>) => {
        if (list.state.disabledById[id]) return;

        setValue([id]);
        list.state.setActiveItemId(id);
        setOpen(false);
    };

    const renderItem: NormalizedSelectRenderItem<Entity> = ({
        id,
        props: itemProps,
        context: {childrenIds},
        list,
    }) => {
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
                    onClick={() => onItemClick(id, list)}
                />
            </a>
        );
    };

    return (
        <Flex>
            <UIKitNormalizedSelect
                {...storyProps}
                value={value}
                items={items}
                mapItemDataToContentProps={mapItemDataToContentProps}
                open={open}
                onOpenChange={setOpen}
                onItemClick={null}
                size="l"
                renderItem={renderItem}
            />
        </Flex>
    );
};
