'use client';

import * as React from 'react';

import {useFocusWithin, useForkRef, useLayoutEffect, useUniqId} from '../../hooks';
import {NormalizedList} from '../NormalizedList';
import type {NormalizedListRenderItem} from '../NormalizedList/types';
import {ListItemView, getListItemClickHandler, useNormalizedList} from '../useNormalizedList';
import type {ListOnItemClick} from '../useNormalizedList';
import {block} from '../utils/cn';
import type {CnMods} from '../utils/cn';

import {FallbackNormalizedSelectControl} from './components/fallback/FallbackNormalizedSelectControl';
import {FallbackNormalizedSelectError} from './components/fallback/FallbackNormalizedSelectError';
import {FallbackNormalizedSelectPopup} from './components/fallback/FallbackNormalizedSelectPopup';
import {useControlledValue} from './hooks/useControlledValue';
import {useOpenState} from './hooks/useOpenState';
import type {
    NormalizedSelectProps,
    NormalizedSelectRenderControlProps,
    NormalizedSelectRenderErrorProps,
    NormalizedSelectRenderPopupProps,
} from './types';

import './NormalizedSelect.scss';

const b = block('normalized-select');

const defaultItemRenderer: NormalizedListRenderItem<unknown> = (renderState) => {
    return <ListItemView {...renderState.props} {...renderState.renderContainerProps} />;
};

export const NormalizedSelect = React.forwardRef(function NormalizedSelect<T, P extends {} = {}>(
    {
        id,
        qa,
        title,
        placement,
        slotBeforeListBody,
        slotAfterListBody,
        size = 'm',
        defaultOpen,
        width,
        containerRef: propsContainerRef,
        className,
        containerClassName,
        popupClassName,
        open: propsOpen,
        multiple,
        popupWidth,
        popupDisablePortal,
        items,
        value: propsValue,
        defaultValue,
        placeholder,
        disabled = false,
        withExpandedState = true,
        defaultExpandedState = 'expanded',
        hasClear,
        errorMessage,
        errorPlacement = 'outside',
        validationState,
        onClose,
        onOpenChange,
        onUpdate,
        renderControl,
        renderPopup,
        renderError,
        renderItem = defaultItemRenderer as NormalizedListRenderItem<T, P>,
        renderContainer,
        mapItemDataToContentProps,
        onFocus,
        onBlur,
        getItemId,
        onItemClick,
    }: NormalizedSelectProps<T, P>,
    ref: React.Ref<HTMLButtonElement>,
) {
    const uniqId = useUniqId();
    const normalizedSelectId = id ?? uniqId;
    const popupId = `normalized-select-popup-${normalizedSelectId}`;

    const controlWrapRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLElement>(null);
    const containerRefLocal = React.useRef<HTMLDivElement>(null);
    const containerRef = propsContainerRef ?? containerRefLocal;

    const errorMessageId = useUniqId();

    const isErrorStateVisible = validationState === 'invalid';
    const isErrorMsgVisible =
        isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'outside';
    const isErrorIconVisible =
        isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'inside';

    const handleControlRef = useForkRef(ref, controlRef);

    const {toggleOpen, open} = useOpenState({
        defaultOpen,
        onClose,
        onOpenChange,
        open: propsOpen,
    });

    const {value, selectedById, setSelected} = useControlledValue({
        value: propsValue,
        defaultValue,
        onUpdate,
    });

    const list = useNormalizedList({
        controlledState: {
            selectedById,
            setSelected,
        },
        items,
        getItemId,
        defaultExpandedState,
        withExpandedState,
    });

    const handleItemClick = React.useMemo(() => {
        if (onItemClick === null) {
            return undefined;
        }

        const handler: ListOnItemClick = (arg, e) => {
            const payload = {id: arg.id, list};

            if (onItemClick) {
                onItemClick?.(payload, e);
            } else {
                const baseOnClick = getListItemClickHandler({list, multiple});

                baseOnClick(payload, e);

                const isGroup = list.state.expandedById && arg.id in list.state.expandedById;

                if (!multiple && !isGroup) {
                    toggleOpen(false);
                }
            }
        };

        return handler;
    }, [onItemClick, list, multiple, toggleOpen]);

    // restoring focus when popup opens
    useLayoutEffect(() => {
        if (open) {
            // for some reason popup position on page may be wrong calculated. `preventScroll` prevent page gap in that cases
            containerRef.current?.focus({preventScroll: true});
        }

        return () => list.state.setActiveItemId(undefined); // reset active item on popup close
        // subscribe only in open event
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);

    const {focusWithinProps} = useFocusWithin({
        onFocusWithin: onFocus,
        onBlurWithin: React.useCallback(
            (e: React.FocusEvent) => {
                onBlur?.(e);
                handleClose();
            },
            [handleClose, onBlur],
        ),
    });

    const controlProps: NormalizedSelectRenderControlProps<T> = {
        list,
        open,
        placeholder,
        toggleOpen,
        clearValue: () => list.state.setSelected({}),
        ref: handleControlRef,
        size,
        value,
        disabled,
        id: normalizedSelectId,
        activeItemId: list.state.activeItemId,
        title,
        errorMessage: isErrorIconVisible ? errorMessage : undefined,
        errorPlacement,
        validationState,
        hasClear,
        isErrorVisible: isErrorStateVisible,
    };

    const togglerNode = renderControl ? (
        renderControl(controlProps)
    ) : (
        <FallbackNormalizedSelectControl
            {...controlProps}
            selectedOptionsContent={value
                .map((itemId) =>
                    itemId in list.structure.itemsById
                        ? mapItemDataToContentProps(list.structure.itemsById[itemId]).title
                        : '',
                )
                .filter(Boolean)
                .join(', ')}
            popupId={popupId}
        />
    );

    const popupContent = (
        <React.Fragment>
            {slotBeforeListBody}

            <NormalizedList<T, P>
                list={list}
                size={size}
                className={b('list', containerClassName)}
                qa={qa}
                multiple={multiple}
                id={`list-${normalizedSelectId}`}
                containerRef={containerRef}
                onItemClick={handleItemClick}
                renderContainer={renderContainer}
                mapItemDataToContentProps={mapItemDataToContentProps}
                renderItem={renderItem}
            />

            {slotAfterListBody}
        </React.Fragment>
    );

    const popupProps: NormalizedSelectRenderPopupProps = {
        className: b('popup', {size}, popupClassName),
        anchorRef: controlWrapRef,
        controlRef,
        open,
        onClose: handleClose,
        width: popupWidth,
        placement,
        disablePortal: popupDisablePortal,
        id: popupId,
        children: popupContent,
    };

    const {controlRef: _controlRef, ...defaultPopupProps} = popupProps;

    const popupNode = renderPopup ? (
        renderPopup(popupProps)
    ) : (
        <FallbackNormalizedSelectPopup {...defaultPopupProps} />
    );

    const errorProps: NormalizedSelectRenderErrorProps | null = isErrorMsgVisible
        ? {
              errorMessage,
              errorMessageId,
          }
        : null;

    const errorNode = errorProps
        ? (renderError?.(errorProps) ?? (
              <FallbackNormalizedSelectError id={errorProps.errorMessageId}>
                  {errorProps.errorMessage}
              </FallbackNormalizedSelectError>
          ))
        : null;

    const mods: CnMods = {
        ...(width === 'max' && {width}),
    };

    const inlineStyles: React.CSSProperties = {};

    if (typeof width === 'number') {
        inlineStyles.width = width;
    }

    return (
        <div
            ref={controlWrapRef}
            {...focusWithinProps}
            className={b(mods, className)}
            style={inlineStyles}
        >
            {togglerNode}
            {popupNode}
            {errorNode}
        </div>
    );
}) as <T, P extends {} = {}>(
    props: NormalizedSelectProps<T, P> & {ref?: React.Ref<HTMLButtonElement>},
) => React.ReactElement;
