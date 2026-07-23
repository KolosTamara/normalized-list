import * as React from 'react';

import {Database, PlugConnection} from '@gravity-ui/icons';
import {Button, Flex, Icon} from '@gravity-ui/uikit';

import {UIKitListItemExpandIcon} from '../../TreeList/__stories__/recipes/UIKitListItemExpandIcon';
import {UIKitListItemView} from '../../TreeList/__stories__/recipes/UIKitListItemView';
import {UIKitListItemViewContent} from '../../TreeList/__stories__/recipes/UIKitListItemViewContent';
import type {ListItemId, ListItemViewContentType, UseListResult} from '../../useList';
import {createRandomizedData} from '../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../TreeSelect';
import type {
    TreeSelectProps,
    TreeSelectRenderControlProps,
    TreeSelectRenderItem,
    TreeSelectRenderPopupProps,
} from '../types';

import {SelectControl, SelectPopup} from './components';
import {getSelectedOptionsContent} from './utils';

const expandButtonLabel = 'Expand';
const closeButtonLabel = 'Close';

/**
 * Just for example how to work with data
 */
interface CustomDataStructure {
    a: string;
}

export interface WithGroupSelectionControlledStateAndCustomIconExampleProps extends Omit<
    TreeSelectProps<CustomDataStructure>,
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
 * TreeSelect with selectable groups and custom icons, wired to public UIKit API
 * (`SelectControl` + `SelectPopup` + UIKit list item recipe) via render props.
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
            <TreeSelect
                {...storyProps}
                size="l"
                open={open}
                onOpenChange={setOpen}
                items={items}
                mapItemDataToContentProps={mapCustomDataStructureToKnownProps}
                onItemClick={onItemClick}
                renderItem={renderItem}
                renderControl={(
                    controlProps: TreeSelectRenderControlProps<CustomDataStructure>,
                ) => (
                    <SelectControl
                        {...controlProps}
                        selectedOptionsContent={getSelectedOptionsContent(
                            controlProps,
                            mapCustomDataStructureToKnownProps,
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
