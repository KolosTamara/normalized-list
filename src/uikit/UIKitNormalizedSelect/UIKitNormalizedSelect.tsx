'use client';

import * as React from 'react';

import {Flex, Text} from '@gravity-ui/uikit';

import {NormalizedSelect} from '../../components/NormalizedSelect';
import type {
    NormalizedSelectProps,
    NormalizedSelectRenderControlProps,
    NormalizedSelectRenderErrorProps,
    NormalizedSelectRenderItem,
    NormalizedSelectRenderPopupProps,
} from '../../components/NormalizedSelect/types';

import {getSelectedOptionsContent} from '../getSelectedOptionsContent';
import {renderUIKitListItem} from '../renderUIKitListItem';
import {NormalizedSelectControl} from '../NormalizedSelectControl';
import {NormalizedSelectPopup} from '../NormalizedSelectPopup';

export type UIKitNormalizedSelectProps<T, P extends {} = {}> = NormalizedSelectProps<T, P>;

/**
 * NormalizedSelect preset with UIKit control, popup, list item, and outside error view.
 * Pass `renderControl` / `renderPopup` / `renderItem` / `renderError` to override.
 */
export const UIKitNormalizedSelect = React.forwardRef(function UIKitNormalizedSelect<
    T,
    P extends {} = {},
>(
    {
        mapItemDataToContentProps,
        renderItem = renderUIKitListItem as NormalizedSelectRenderItem<T, P>,
        renderControl: propsRenderControl,
        renderPopup: propsRenderPopup,
        renderError: propsRenderError,
        ...props
    }: UIKitNormalizedSelectProps<T, P>,
    ref: React.Ref<HTMLButtonElement>,
) {
    const renderControl =
        propsRenderControl ??
        ((controlProps: NormalizedSelectRenderControlProps<T>) => (
            <NormalizedSelectControl
                {...controlProps}
                selectedOptionsContent={getSelectedOptionsContent(
                    controlProps,
                    mapItemDataToContentProps,
                )}
            />
        ));

    const renderPopup =
        propsRenderPopup ??
        ((popupProps: NormalizedSelectRenderPopupProps) => (
            <NormalizedSelectPopup {...popupProps} />
        ));

    const renderError =
        propsRenderError ??
        (({errorMessage, errorMessageId}: NormalizedSelectRenderErrorProps) => (
            <Flex spacing={{mt: 0.5}}>
                <Text id={errorMessageId} color="danger" variant="body-1">
                    {errorMessage}
                </Text>
            </Flex>
        ));

    return (
        <NormalizedSelect
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
    props: UIKitNormalizedSelectProps<T, P> & {ref?: React.Ref<HTMLButtonElement>},
) => React.ReactElement;
