import type * as React from 'react';

import type {
    TreeListContainerProps,
    TreeListProps,
    TreeListRenderContainer,
    TreeListRenderItem,
} from '../TreeList/types';
import type {ListItemId, ListItemSize, UseListResult} from '../useList';
import type {UseListParsedStateProps} from '../useList/hooks/useListParsedState';

import type {UseOpenProps} from './hooks/useOpenState/types';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Alignment = 'start' | 'end';
type FloatingPlacement = Side | `${Side}-${Alignment}`;
type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';

/**
 * Popup placement options (same shape as uikit `PopupPlacement`).
 * Full set is intended for custom `renderPopup` (e.g. Floating UI);
 * the default `TreeSelectPopup` supports a simplified subset.
 */
export type TreeSelectPopupPlacement = AutoPlacement | FloatingPlacement | FloatingPlacement[];

export type TreeSelectPopupWidth = 'fit' | number;

export interface TreeSelectPopupProps {
    open?: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLElement | null>;
    children?: React.ReactNode;
    className?: string;
    id?: string;
    width?: TreeSelectPopupWidth;
    placement?: TreeSelectPopupPlacement;
    disablePortal?: boolean;
}

export type TreeSelectRenderControlProps<T> = {
    list: UseListResult<T>;
    open: boolean;
    disabled?: boolean;
    placeholder?: string;
    toggleOpen(): void;
    clearValue(): void;
    ref: React.Ref<HTMLButtonElement>;
    size: ListItemSize;
    value: ListItemId[];
    id: string;
    activeItemId?: ListItemId;
    title?: string;
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
export type TreeSelectRenderPopupProps = TreeSelectPopupProps & {
    controlRef: React.RefObject<HTMLElement | null>;
};

/**
 * Props passed to `renderError` for outside error message customization.
 */
export type TreeSelectRenderErrorProps = {
    errorMessage: React.ReactNode;
    errorMessageId: string;
};

export type TreeSelectRenderItem<T, P extends {} = {}> = TreeListRenderItem<T, P>;
export type TreeSelectRenderContainerProps<T> = TreeListContainerProps<T>;
export type TreeSelectRenderContainer<T> = TreeListRenderContainer<T>;

interface TreeSelectBehavioralProps<T> extends UseListParsedStateProps<T> {
    withExpandedState?: boolean;
    multiple?: boolean;
}

export interface TreeSelectProps<T, P extends {} = {}>
    extends
        Omit<TreeListProps<T, P>, 'list' | 'renderContainer' | 'multiple'>,
        Pick<
            TreeSelectRenderControlProps<T>,
            | 'title'
            | 'placeholder'
            | 'disabled'
            | 'hasClear'
            | 'errorPlacement'
            | 'validationState'
            | 'errorMessage'
        >,
        UseOpenProps,
        TreeSelectBehavioralProps<T> {
    value?: ListItemId[];
    defaultValue?: ListItemId[] | undefined;
    popupClassName?: string;
    popupWidth?: TreeSelectPopupWidth;
    placement?: TreeSelectPopupPlacement;
    width?: 'auto' | 'max' | number;
    containerClassName?: string;
    popupDisablePortal?: boolean;
    /**
     * Use slots if you don't need access to internal TreeListState.
     * In other situations use `renderContainer` method
     */
    slotBeforeListBody?: React.ReactNode;
    /**
     * Use slots if you don't need access to internal TreeListState.
     * In other situations use `renderContainer` method
     */
    slotAfterListBody?: React.ReactNode;
    onUpdate?(value: ListItemId[]): void;
    /**
     * Ability to override custom toggler button
     */
    renderControl?(props: TreeSelectRenderControlProps<T>): React.JSX.Element;
    /**
     * Ability to override custom popup
     */
    renderPopup?(props: TreeSelectRenderPopupProps): React.JSX.Element;
    /**
     * Ability to override outside error message rendering.
     * Default: plain `TreeSelectError` fallback.
     */
    renderError?(props: TreeSelectRenderErrorProps): React.ReactNode;
    renderContainer?: TreeSelectRenderContainer<T>;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
}
