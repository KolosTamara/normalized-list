import * as React from 'react';

import {Database, PlugConnection} from '@gravity-ui/icons';
import {Button, Flex, Icon} from '@gravity-ui/uikit';

import type {
    ListItemId,
    ListItemViewContentType,
    UseNormalizedListResult,
} from '../../../components/useNormalizedList';
import {createRandomizedData} from '../../../components/useNormalizedList/__stories__/utils/makeData';
import type {NormalizedSelectRenderItem} from '../../../components/NormalizedSelect/types';
import {UIKitListItemExpandIcon} from '../../UIKitListItemExpandIcon';
import {UIKitListItemView} from '../../UIKitListItemView';
import {UIKitListItemViewContent} from '../../UIKitListItemViewContent';
import type {UIKitNormalizedSelectProps} from '../UIKitNormalizedSelect';
import {UIKitNormalizedSelect} from '../UIKitNormalizedSelect';

const expandButtonLabel = 'Expand';
const closeButtonLabel = 'Close';

interface CustomDataStructure {
    a: string;
}

export interface WithGroupSelectionControlledStateAndCustomIconExampleProps extends Omit<
    UIKitNormalizedSelectProps<CustomDataStructure>,
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
 * UIKitNormalizedSelect with selectable groups and custom icons.
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
        list: UseNormalizedListResult<CustomDataStructure>;
    }) => {
        if (list.state.disabledById[id]) return;

        list.state.setSelected({[id]: true});
        list.state.setActiveItemId(id);
        setOpen(false);
    };

    const renderItem: NormalizedSelectRenderItem<CustomDataStructure> = ({
        id,
        props: itemProps,
        context: {childrenIds},
        list,
    }) => {
        // groups items are selectable too
        const selectionViewType = storyProps.multiple ? 'multiple' : 'single';

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
    };

    return (
        <Flex>
            <UIKitNormalizedSelect
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
