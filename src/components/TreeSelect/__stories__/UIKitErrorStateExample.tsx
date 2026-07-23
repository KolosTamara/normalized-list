import * as React from 'react';

import {Flex, Text} from '@gravity-ui/uikit';

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

type Entity = string;

export interface UIKitErrorStateExampleProps extends Omit<
    TreeSelectProps<Entity>,
    | 'items'
    | 'mapItemDataToContentProps'
    | 'renderControl'
    | 'renderPopup'
    | 'renderError'
    | 'renderItem'
> {}

const items: ListItemType<Entity>[] = ['one', 'two', 'free'];
const errorMessage = 'A validation error has occurred';

const mapItemDataToContentProps = (title: Entity) => ({title});

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
 * TreeSelect error states wired to public UIKit API
 * (`Button` + `Popup` + `Text` + UIKit list item recipe) via render props.
 */
export const UIKitErrorStateExample = (props: UIKitErrorStateExampleProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const sharedProps = {
        ...props,
        items,
        getItemId: (id: Entity) => id,
        placeholder: '-',
        containerRef,
        mapItemDataToContentProps,
        errorMessage,
        validationState: 'invalid' as const,
        hasClear: true,
        renderItem: renderUIKitItem,
        renderControl: (controlProps: TreeSelectRenderControlProps<Entity>) => (
            <SelectControl
                {...controlProps}
                selectedOptionsContent={getSelectedOptionsContent(
                    controlProps,
                    mapItemDataToContentProps,
                )}
            />
        ),
        renderPopup: (popupProps: TreeSelectRenderPopupProps) => <SelectPopup {...popupProps} />,
    };

    return (
        <Flex gap={5}>
            <Flex direction="column" gap={3} width={300}>
                <TreeSelect
                    {...sharedProps}
                    errorPlacement="outside"
                    renderError={({errorMessage: message, errorMessageId}) => (
                        <Flex spacing={{mt: 0.5}}>
                            <Text id={errorMessageId} color="danger" variant="body-1">
                                {message}
                            </Text>
                        </Flex>
                    )}
                />
            </Flex>
            <Flex direction="column" gap={3} width={300}>
                <TreeSelect {...sharedProps} errorPlacement="inside" />
            </Flex>
        </Flex>
    );
};
