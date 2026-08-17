import type * as React from 'react';

import type {
    NormalizedListContainerProps,
    NormalizedListProps,
    NormalizedListRenderContainer,
    NormalizedListRenderItem,
} from '../NormalizedList/types';
import type {ListItemId, ListItemSize, UseNormalizedListResult} from '../useNormalizedList';
import type {UseListParsedStateProps} from '../useNormalizedList/hooks/useListParsedState';

import type {UseOpenProps} from './hooks/useOpenState/types';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Alignment = 'start' | 'end';
type FloatingPlacement = Side | `${Side}-${Alignment}`;
type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';

/**
 * Popup placement options (same shape as uikit `PopupPlacement`).
 * Full set is intended for custom `renderPopup` (e.g. Floating UI);
 * the default `FallbackNormalizedSelectPopup` supports a simplified subset.
 */
export type NormalizedSelectPopupPlacement =
    AutoPlacement | FloatingPlacement | FloatingPlacement[];

export type NormalizedSelectPopupWidth = 'fit' | number;

export interface NormalizedSelectPopupProps {
    open?: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    className?: string;
    id?: string;
    width?: NormalizedSelectPopupWidth;
    placement?: NormalizedSelectPopupPlacement;
    disablePortal?: boolean;
}

export type NormalizedSelectRenderControlProps<T> = {
    list: UseNormalizedListResult<T>;
    open: boolean;
    disabled?: boolean;
    placeholder?: string;
    toggleOpen(): void;
    clearValue(): void;
    ref: React.Ref<HTMLButtonElement>;
    size: ListItemSize;
    value: ListItemId[];
    id: string;
    popupId: string;
    activeItemId?: ListItemId;
    title?: string;
    qa?: string;
    hasClear?: boolean;
    /**
     * Determines content of the error message
     */
    errorMessage?: React.ReactNode;
    /**
     * Determines whether the error message will be placed under the input field as text or in the tooltip
     */
    errorPlacement?: 'outside' | 'inside';
    /**
     * Describes the validation state
     */
    validationState?: 'invalid';
    isErrorVisible?: boolean;
};

/**
 * Props passed to `renderPopup`. Extends default popup props with `controlRef`
 * for custom popup implementations (e.g. returnFocus).
 */
export type NormalizedSelectRenderPopupProps = NormalizedSelectPopupProps & {
    controlRef: React.RefObject<HTMLElement>;
};

/**
 * Props passed to `renderError` for outside error message customization.
 */
export type NormalizedSelectRenderErrorProps = {
    errorMessage: React.ReactNode;
    errorMessageId: string;
};

export type NormalizedSelectRenderItem<T, P extends {} = {}> = NormalizedListRenderItem<T, P>;
export type NormalizedSelectRenderContainerProps<T> = NormalizedListContainerProps<T>;
export type NormalizedSelectRenderContainer<T> = NormalizedListRenderContainer<T>;

interface NormalizedSelectBehavioralProps<T> extends UseListParsedStateProps<T> {
    withExpandedState?: boolean;
    multiple?: boolean;
}

export interface NormalizedSelectProps<T, P extends {} = {}>
    extends
        Omit<NormalizedListProps<T, P>, 'list' | 'renderContainer' | 'multiple'>,
        Pick<
            NormalizedSelectRenderControlProps<T>,
            | 'title'
            | 'placeholder'
            | 'disabled'
            | 'hasClear'
            | 'errorPlacement'
            | 'validationState'
            | 'errorMessage'
        >,
        UseOpenProps,
        NormalizedSelectBehavioralProps<T> {
    value?: ListItemId[];
    defaultValue?: ListItemId[] | undefined;
    popupClassName?: string;
    popupWidth?: NormalizedSelectPopupWidth;
    placement?: NormalizedSelectPopupPlacement;
    width?: 'auto' | 'max' | number;
    containerClassName?: string;
    popupDisablePortal?: boolean;
    /**
     * Use slots if you don't need access to internal NormalizedListState.
     * In other situations use `renderContainer` method
     */
    slotBeforeListBody?: React.ReactNode;
    /**
     * Use slots if you don't need access to internal NormalizedListState.
     * In other situations use `renderContainer` method
     */
    slotAfterListBody?: React.ReactNode;
    onUpdate?(value: ListItemId[]): void;
    /**
     * Ability to override custom toggler button
     */
    renderControl?(props: NormalizedSelectRenderControlProps<T>): React.JSX.Element;
    /**
     * Ability to override custom popup
     */
    renderPopup?(props: NormalizedSelectRenderPopupProps): React.JSX.Element;
    /**
     * Ability to override outside error message rendering.
     */
    renderError?(props: NormalizedSelectRenderErrorProps): React.ReactNode;
    renderContainer?: NormalizedSelectRenderContainer<T>;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
}
