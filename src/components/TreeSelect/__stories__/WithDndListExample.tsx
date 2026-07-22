import * as React from 'react';

import {Grip} from '@gravity-ui/icons';
import {Flex, Icon} from '@gravity-ui/uikit';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import type {
    DraggableProvided,
    DraggableRubric,
    DraggableStateSnapshot,
    DroppableProvided,
    OnDragEndResponder,
} from '@hello-pangea/dnd';

import {UIKitListItemExpandIcon} from '../../TreeList/__stories__/recipes/UIKitListItemExpandIcon';
import {UIKitListItemView} from '../../TreeList/__stories__/recipes/UIKitListItemView';
import {UIKitListItemViewContent} from '../../TreeList/__stories__/recipes/UIKitListItemViewContent';
import type {ListItemViewProps} from '../../useList';
import {ListContainerView} from '../../useList';
import {createRandomizedData} from '../../useList/__stories__/utils/makeData';
import {reorderArray} from '../../useList/__stories__/utils/reorderArray';
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

const DraggableListItem = ({
    provided,
    ...props
}: {provided?: DraggableProvided} & ListItemViewProps) => {
    return (
        <UIKitListItemView
            {...provided?.dragHandleProps}
            {...provided?.draggableProps}
            ref={provided?.innerRef}
            {...props}
        />
    );
};

type CustomDataType = {someRandomKey: string; id: string};

export interface WithDndListExampleProps extends Omit<
    TreeSelectProps<CustomDataType>,
    | 'value'
    | 'onUpdate'
    | 'items'
    | 'mapItemDataToContentProps'
    | 'renderControl'
    | 'renderPopup'
    | 'renderItem'
> {}

const randomItems: CustomDataType[] = createRandomizedData({
    num: 10,
    depth: 0,
    getData: (title) => title,
}).map(({data}, idx) => ({someRandomKey: data, id: String(idx)}));

const mapItemDataToContentProps = ({someRandomKey}: CustomDataType) => ({
    title: someRandomKey,
});

/**
 * TreeSelect with drag-and-drop reordering, wired to public UIKit API
 * (`SelectControl` + `SelectPopup` + UIKit list item recipe) via render props.
 */
export const WithDndListExample = (storyProps: WithDndListExampleProps) => {
    const [items, setItems] = React.useState(randomItems);

    const renderContainer: TreeSelectRenderContainer<CustomDataType> = ({
        renderItem,
        list,
        containerRef,
        id,
        className,
    }) => {
        const handleDrugEnd: OnDragEndResponder = ({destination, source}) => {
            if (typeof destination?.index === 'number' && destination.index !== source.index) {
                setItems((currentItems) =>
                    reorderArray(currentItems, source.index, destination.index),
                );
            }
        };

        return (
            <DragDropContext onDragEnd={handleDrugEnd}>
                <Droppable
                    droppableId="droppable"
                    renderClone={(
                        provided: DraggableProvided,
                        snapshot: DraggableStateSnapshot,
                        rubric: DraggableRubric,
                    ) => {
                        return renderItem(
                            list.structure.visibleFlattenIds[rubric.source.index],
                            rubric.source.index,
                            {
                                provided,
                                dragging: snapshot.isDragging,
                            },
                        );
                    }}
                >
                    {(droppableProvided: DroppableProvided) => (
                        <ListContainerView
                            /*
                             *  TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
                             */
                            ref={containerRef as React.Ref<HTMLDivElement>}
                            id={id}
                            className={className}
                        >
                            <div
                                {...droppableProvided.droppableProps}
                                ref={droppableProvided.innerRef}
                            >
                                {list.structure.visibleFlattenIds.map((listItemId, index) =>
                                    renderItem(listItemId, index),
                                )}
                                {droppableProvided.placeholder}
                            </div>
                        </ListContainerView>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };

    const renderItem: TreeSelectRenderItem<CustomDataType> = ({
        data,
        props,
        index,
        renderContainerProps,
    }) => {
        const {content, selectionViewType, selected, disabled, ...shellProps} = props;

        const commonProps: ListItemViewProps = {
            ...shellProps,
            selected,
            disabled,
            selectionViewType,
            content: (
                <UIKitListItemViewContent
                    {...content}
                    title={data.someRandomKey}
                    hasSelectionIcon={selectionViewType === 'multiple'}
                    selected={selected}
                    disabled={disabled}
                    endSlot={<Icon data={Grip} size={16} />}
                    renderExpandIcon={UIKitListItemExpandIcon}
                />
            ),
        };

        // here passed props from `renderContainer` method.
        if (renderContainerProps) {
            return (
                <DraggableListItem
                    key={`item-key-${index}`}
                    {...commonProps}
                    {...renderContainerProps}
                />
            );
        }
        return (
            <Draggable draggableId={String(index)} index={index} key={`item-key-${index}`}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <DraggableListItem
                        provided={provided}
                        {...commonProps}
                        dragging={snapshot.isDragging}
                    />
                )}
            </Draggable>
        );
    };

    return (
        <Flex>
            <TreeSelect
                {...storyProps}
                items={items}
                // you can omit this prop here. If prop `id` passed, TreeSelect would take it by default
                getItemId={({id}) => id}
                mapItemDataToContentProps={mapItemDataToContentProps}
                renderContainer={renderContainer}
                renderItem={renderItem}
                renderControl={(controlProps: TreeSelectRenderControlProps<CustomDataType>) => (
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
