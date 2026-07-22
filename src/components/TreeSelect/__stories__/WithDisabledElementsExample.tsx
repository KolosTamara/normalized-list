import * as React from 'react';

import {UIKitListItemExpandIcon} from '../../TreeList/__stories__/recipes/UIKitListItemExpandIcon';
import {UIKitListItemView} from '../../TreeList/__stories__/recipes/UIKitListItemView';
import {UIKitListItemViewContent} from '../../TreeList/__stories__/recipes/UIKitListItemViewContent';
import type {ListItemType} from '../../useList';
import {TreeSelect} from '../TreeSelect';
import type {
    TreeSelectProps,
    TreeSelectRenderControlProps,
    TreeSelectRenderItem,
    TreeSelectRenderPopupProps,
} from '../types';

import {SelectControl, SelectPopup} from './components';
import {getSelectedOptionsContent} from './utils';

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
