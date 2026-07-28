import * as React from 'react';

import {Database, PlugConnection} from '@gravity-ui/icons';
import {Button, Flex, Icon} from '@gravity-ui/uikit';

import type {ListItemId, ListItemViewContentType, UseListResult} from '../../../components/useList';
import {createRandomizedData} from '../../../components/useList/__stories__/utils/makeData';
import type {TreeSelectRenderItem} from '../../../components/TreeSelect/types';
import {TreeListItemExpandIcon} from '../../TreeListItemExpandIcon';
import {TreeListItemView} from '../../TreeListItemView';
import {TreeListItemViewContent} from '../../TreeListItemViewContent';
import type {UIKitTreeSelectProps} from '../UIKitTreeSelect';
import {UIKitTreeSelect} from '../UIKitTreeSelect';

const expandButtonLabel = 'Expand';
const closeButtonLabel = 'Close';

interface CustomDataStructure {
    a: string;
}

export interface WithGroupSelectionControlledStateAndCustomIconExampleProps extends Omit<
    UIKitTreeSelectProps<CustomDataStructure>,
    | 'value'
    | 'onUpdate'
    | 'items'
    | 'mapItemDataToContentProps'
    | 'size'
    | 'renderControl'
    | 'renderPopup'
    | 'renderItem'
    | 'onItemClick'
> {
    itemsCount?: number;
}

const mapCustomDataStructureToKnownProps = (
    props: CustomDataStructure,
): ListItemViewContentType => ({
    title: props.a,
});

/**
 * UIKitTreeSelect with selectable groups and custom icons.
 */
export const WithGroupSelectionControlledStateAndCustomIconExample = ({
    itemsCount = 5,
    ...storyProps
}: WithGroupSelectionControlledStateAndCustomIconExampleProps) => {
    const [open, setOpen] = React.useState(true);

    const items = React.useMemo(
        () =>
            createRandomizedData<CustomDataStructure>({
                num: itemsCount,
                getData: (a) => ({a}),
            }),
        [itemsCount],
    );

    const onItemClick = ({
        id,
        list,
    }: {
        id: ListItemId;
        list: UseListResult<CustomDataStructure>;
    }) => {
        if (list.state.disabledById[id]) return;

        list.state.setSelected({[id]: true});
        list.state.setActiveItemId(id);
        setOpen(false);
    };

    const renderItem: TreeSelectRenderItem<CustomDataStructure> = ({
        id,
        props: itemProps,
        context: {childrenIds},
        list,
    }) => {
        // groups items are selectable too
        const selectionViewType = storyProps.multiple ? 'multiple' : 'single';

        return (
            <TreeListItemView
                {...itemProps}
                selectionViewType={selectionViewType}
                content={
                    <TreeListItemViewContent
                        {...itemProps.content}
                        isGroup={false}
                        hasSelectionIcon={selectionViewType === 'multiple'}
                        selected={itemProps.selected}
                        disabled={itemProps.disabled}
                        startSlot={
                            <Icon size={16} data={childrenIds ? Database : PlugConnection} />
                        }
                        endSlot={
                            childrenIds ? (
                                <Button
                                    size="m"
                                    onClick={(e) => {
                                        e.stopPropagation();
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
                                        <TreeListItemExpandIcon
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
    };

    return (
        <Flex>
            <UIKitTreeSelect
                {...storyProps}
                size="l"
                open={open}
                onOpenChange={setOpen}
                items={items}
                mapItemDataToContentProps={mapCustomDataStructureToKnownProps}
                onItemClick={onItemClick}
                renderItem={renderItem}
            />
        </Flex>
    );
};
