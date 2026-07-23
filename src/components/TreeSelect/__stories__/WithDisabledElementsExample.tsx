import * as React from 'react';

import type {ListItemType} from '../../useList';
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

interface Entity {
    text: string;
    id: string;
}

export interface WithDisabledElementsExampleProps extends Omit<
    TreeSelectProps<Entity>,
    'items' | 'mapItemDataToContentProps' | 'renderControl' | 'renderPopup' | 'renderItem'
> {}

const items: ListItemType<Entity>[] = [
    {
        data: {id: '1', text: 'default disabled'},
        disabled: true,
    },
    {
        data: {id: '2', text: 'two'},
        disabled: true,
    },
    {
        data: {id: '3', text: 'default selected'},
    },
    {
        data: {id: '4', text: 'four'},
        disabled: true,
    },
    {
        data: {id: '5', text: 'five'},
    },
];

const mapItemDataToContentProps = ({text}: Entity) => ({title: text});

const renderUIKitItem: TreeSelectRenderItem<Entity> = ({
    props: itemProps,
    renderContainerProps,
}) => {
    const {content, selectionViewType, selected, disabled, ...shellProps} = itemProps;

    return (
        <ListItemView
            {...shellProps}
            {...renderContainerProps}
            selected={selected}
            disabled={disabled}
            selectionViewType={selectionViewType}
            content={
                <ListItemViewContent
                    {...content}
                    hasSelectionIcon={selectionViewType === 'multiple'}
                    selected={selected}
                    disabled={disabled}
                    renderExpandIcon={ListItemExpandIcon}
                />
            }
        />
    );
};

/**
 * TreeSelect with disabled items, wired to public UIKit API
 * (`SelectControl` + `SelectPopup` + UIKit list item recipe) via render props.
 */
export const WithDisabledElementsExample = (props: WithDisabledElementsExampleProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <TreeSelect
            {...props}
            items={items}
            getItemId={({id}) => id}
            containerRef={containerRef}
            mapItemDataToContentProps={mapItemDataToContentProps}
            renderItem={renderUIKitItem}
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
    );
};
