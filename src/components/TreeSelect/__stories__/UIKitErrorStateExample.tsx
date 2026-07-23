import * as React from 'react';

import {Flex, Text} from '@gravity-ui/uikit';

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
