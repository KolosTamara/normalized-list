import * as React from 'react';

import {Grip} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import type {
    DraggableProvided,
    DraggableRubric,
    DraggableStateSnapshot,
    DroppableProvided,
    OnDragEndResponder,
} from '@hello-pangea/dnd';

import {useLayoutEffect} from '../../../../hooks';
import {ListContainerView, useList} from '../../../../components/useList';
import type {ListItemViewProps} from '../../../../components/useList';
import {createRandomizedData} from '../../../../components/useList/__stories__/utils/makeData';
import {reorderArray} from '../../../../components/useList/__stories__/utils/reorderArray';
import {UIKitTreeList} from '../../../UIKitTreeList';
import type {
    TreeListRenderContainer,
    TreeListRenderItem,
} from '../../../../components/TreeList/types';
import type {UIKitTreeListProps as TreeListProps} from '../../../UIKitTreeList';
import {TreeListItemExpandIcon, TreeListItemView, TreeListItemViewContent} from '../../../../uikit';

type CustomDataType = {someRandomKey: string; id: string};

type DndRenderContainerProps = {
    provided?: DraggableProvided;
    dragging?: boolean;
};

const DraggableListItem = ({
    provided,
    content,
    selectionViewType = 'multiple',
    selected,
    disabled,
    ...props
}: {provided?: DraggableProvided} & ListItemViewProps) => {
    const contentProps =
        typeof content === 'object' && content !== null && 'title' in content
            ? content
            : {title: content};

    return (
        <TreeListItemView
            {...provided?.dragHandleProps}
            {...provided?.draggableProps}
            ref={provided?.innerRef}
            {...props}
            selected={selected}
            disabled={disabled}
            selectionViewType={selectionViewType}
            role="option"
            content={
                <TreeListItemViewContent
                    {...contentProps}
                    hasSelectionIcon={selectionViewType === 'multiple'}
                    selected={selected}
                    disabled={disabled}
                    renderExpandIcon={TreeListItemExpandIcon}
                />
            }
        />
    );
};

const randomItems: CustomDataType[] = createRandomizedData({
    num: 10,
    depth: 0,
    getData: (title) => title,
}).map(({data}, idx) => ({someRandomKey: data, id: String(idx)}));

export interface WithDndListStoryProps extends Omit<
    TreeListProps<CustomDataType, DndRenderContainerProps>,
    'items' | 'mapItemDataToContentProps' | 'renderItem' | 'renderContainer'
> {}

export const WithDndListStory = (storyProps: WithDndListStoryProps) => {
    const [items, setItems] = React.useState(randomItems);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const list = useList({
        items,
        withExpandedState: false,
        // you can omit this prop here. If prop id passed, TreeSelect would take it by default
        getItemId: ({id}) => id,
    });

    useLayoutEffect(() => {
        containerRef.current?.focus();
    }, []);

    const renderContainer: TreeListRenderContainer<CustomDataType> = ({
        renderItem,
        list: containerList,
        containerRef: listContainerRef,
        id,
    }) => {
        const handleDragEnd: OnDragEndResponder = ({destination, source}) => {
            if (typeof destination?.index === 'number' && destination.index !== source.index) {
                setItems((currentItems) => {
                    const nextItems = reorderArray(currentItems, source.index, destination.index);
                    // Activate by stable item id, not by destination index
                    containerList.state.setActiveItemId(nextItems[destination.index].id);
                    return nextItems;
                });
            }
        };

        return (
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable
                    droppableId="droppable"
                    renderClone={(
                        provided: DraggableProvided,
                        snapshot: DraggableStateSnapshot,
                        rubric: DraggableRubric,
                    ) => {
                        return renderItem(
                            containerList.structure.visibleFlattenIds[rubric.source.index],
                            rubric.source.index,
                            {
                                provided,
                                dragging: snapshot.isDragging,
                            },
                        );
                    }}
                >
                    {(droppableProvided: DroppableProvided) => (
                        /*
                         * TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
                         */
                        <ListContainerView
                            ref={listContainerRef as React.Ref<HTMLDivElement>}
                            id={id}
                        >
                            <div
                                {...droppableProvided.droppableProps}
                                ref={droppableProvided.innerRef}
                            >
                                {containerList.structure.visibleFlattenIds.map(
                                    (listItemId, index) => renderItem(listItemId, index),
                                )}
                                {droppableProvided.placeholder}
                            </div>
                        </ListContainerView>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };

    const renderItem: TreeListRenderItem<CustomDataType, DndRenderContainerProps> = ({
        data,
        props,
        index,
        renderContainerProps,
    }) => {
        const commonProps: ListItemViewProps = {
            ...props,
            content: {
                ...props.content,
                title: data.someRandomKey,
                endSlot: <Icon data={Grip} size={16} />,
            },
        };

        // Props from `renderContainer` `renderClone`
        if (renderContainerProps) {
            return <DraggableListItem key={data.id} {...commonProps} {...renderContainerProps} />;
        }

        return (
            <Draggable draggableId={data.id} index={index} key={data.id}>
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
        <UIKitTreeList
            {...storyProps}
            list={list}
            containerRef={containerRef}
            mapItemDataToContentProps={({someRandomKey}) => ({title: someRandomKey})}
            renderContainer={renderContainer}
            renderItem={renderItem}
        />
    );
};
