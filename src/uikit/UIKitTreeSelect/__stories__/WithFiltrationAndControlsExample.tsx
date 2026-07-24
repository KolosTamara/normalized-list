import * as React from 'react';

import {Button, Flex, Text, TextInput, spacing} from '@gravity-ui/uikit';

import {ListContainer, useListFilter} from '../../../components/useList';
import {createRandomizedData} from '../../../components/useList/__stories__/utils/makeData';
import type {TreeSelectRenderContainer} from '../../../components/TreeSelect/types';
import type {UIKitTreeSelectProps} from '../UIKitTreeSelect';
import {UIKitTreeSelect} from '../UIKitTreeSelect';

interface Entity {
    title: string;
}

export interface WithFiltrationAndControlsExampleProps extends Omit<
    UIKitTreeSelectProps<Entity>,
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

/**
 * UIKitTreeSelect with filter + footer controls.
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
            <UIKitTreeSelect
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
                renderContainer={renderContainer}
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
