import * as React from 'react';

import {Button, Flex, Text, TextInput, spacing} from '@gravity-ui/uikit';

import {UIKitListItemExpandIcon} from '../../TreeList/__stories__/recipes/UIKitListItemExpandIcon';
import {UIKitListItemView} from '../../TreeList/__stories__/recipes/UIKitListItemView';
import {UIKitListItemViewContent} from '../../TreeList/__stories__/recipes/UIKitListItemViewContent';
import {ListContainer, useListFilter} from '../../useList';
import {createRandomizedData} from '../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../TreeSelect';
import type {
    TreeSelectProps,
    TreeSelectRenderContainer,
    TreeSelectRenderControlProps,
    TreeSelectRenderItem,
    TreeSelectRenderPopupProps,
} from '../types';

import {SelectControl, SelectPopup} from './components';
import {getSelectedOptionsContent} from './utils';

interface Entity {
    title: string;
}

export interface WithFiltrationAndControlsExampleProps extends Omit<
    TreeSelectProps<Entity>,
    | 'value'
    | 'onUpdate'
    | 'items'
    | 'mapItemDataToContentProps'
    | 'defaultValue'
    | 'multiple'
    | 'renderControl'
    | 'renderPopup'
    | 'renderItem'
> {
    itemsCount?: number;
}

const mapItemDataToContentProps = (item: Entity) => item;

const renderUIKitItem: TreeSelectRenderItem<Entity> = ({
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

/**
 * TreeSelect with filter + footer controls, wired to public UIKit API
 * (`SelectControl` + `SelectPopup` + UIKit list item recipe) via render props.
 */
export const WithFiltrationAndControlsExample = ({
    itemsCount = 5,
    ...treeSelectProps
}: WithFiltrationAndControlsExampleProps) => {
    const {items, renderContainer} = React.useMemo(() => {
        const baseItems = createRandomizedData<Entity>({num: itemsCount});
        const containerRenderer: TreeSelectRenderContainer<Entity> = (props) => {
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

    const [open, onOpenChange] = React.useState(true);
    const [value, setValue] = React.useState<string[]>([]);
    const filterState = useListFilter({items});

    return (
        <Flex>
            <TreeSelect
                {...treeSelectProps}
                mapItemDataToContentProps={mapItemDataToContentProps}
                multiple
                open={open}
                popupWidth={350}
                onOpenChange={onOpenChange}
                slotBeforeListBody={
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
                }
                renderItem={renderUIKitItem}
                renderContainer={renderContainer}
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
                slotAfterListBody={
                    <Flex gap="2" className={spacing({px: 2, py: 1})}>
                        <Button
                            width="max"
                            onClick={() => {
                                setValue([]);
                                filterState.reset();
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            disabled={!value.length}
                            width="max"
                            view="action"
                            onClick={() => {
                                onOpenChange(false);
                                alert(JSON.stringify(value));
                            }}
                        >
                            Accept
                        </Button>
                    </Flex>
                }
                value={value}
                items={filterState.items}
                onUpdate={setValue}
            />
        </Flex>
    );
};
