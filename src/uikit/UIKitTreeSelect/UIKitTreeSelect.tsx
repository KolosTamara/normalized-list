'use client';

import * as React from 'react';

import {Flex, Text} from '@gravity-ui/uikit';

import {TreeSelect} from '../../components/TreeSelect';
import type {
    TreeSelectProps,
    TreeSelectRenderControlProps,
    TreeSelectRenderErrorProps,
    TreeSelectRenderItem,
    TreeSelectRenderPopupProps,
} from '../../components/TreeSelect/types';

import {getSelectedOptionsContent} from '../getSelectedOptionsContent';
import {renderUIKitListItem} from '../renderUIKitListItem';
import {TreeSelectControl} from '../TreeSelectControl';
import {TreeSelectPopup} from '../TreeSelectPopup';

export type UIKitTreeSelectProps<T, P extends {} = {}> = TreeSelectProps<T, P>;

/**
 * TreeSelect preset with UIKit control, popup, list item, and outside error view.
 * Pass `renderControl` / `renderPopup` / `renderItem` / `renderError` to override.
 */
export const UIKitTreeSelect = React.forwardRef(function UIKitTreeSelect<T, P extends {} = {}>(
    {
        mapItemDataToContentProps,
        renderItem = renderUIKitListItem as TreeSelectRenderItem<T, P>,
        renderControl: propsRenderControl,
        renderPopup: propsRenderPopup,
        renderError: propsRenderError,
        ...props
    }: UIKitTreeSelectProps<T, P>,
    ref: React.Ref<HTMLButtonElement>,
) {
    const renderControl =
        propsRenderControl ??
        ((controlProps: TreeSelectRenderControlProps<T>) => (
            <TreeSelectControl
                {...controlProps}
                selectedOptionsContent={getSelectedOptionsContent(
                    controlProps,
                    mapItemDataToContentProps,
                )}
            />
        ));

    const renderPopup =
        propsRenderPopup ??
        ((popupProps: TreeSelectRenderPopupProps) => <TreeSelectPopup {...popupProps} />);

    const renderError =
        propsRenderError ??
        (({errorMessage, errorMessageId}: TreeSelectRenderErrorProps) => (
            <Flex spacing={{mt: 0.5}}>
                <Text id={errorMessageId} color="danger" variant="body-1">
                    {errorMessage}
                </Text>
            </Flex>
        ));

    return (
        <TreeSelect
            {...props}
            ref={ref}
            mapItemDataToContentProps={mapItemDataToContentProps}
            renderItem={renderItem}
            renderControl={renderControl}
            renderPopup={renderPopup}
            renderError={renderError}
        />
    );
}) as <T, P extends {} = {}>(
    props: UIKitTreeSelectProps<T, P> & {ref?: React.Ref<HTMLButtonElement>},
) => React.ReactElement;
