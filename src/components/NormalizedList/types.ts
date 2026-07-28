import type * as React from 'react';

import type {
    ListContainerProps,
    ListItemId,
    ListItemListContextProps,
    ListItemSize,
    ListItemViewCommonProps,
    ListItemViewContentType,
    UseNormalizedListResult,
} from '../useNormalizedList';
import {QAProps} from '../types';

export type NormalizedListRenderItem<T, P extends {} = {}> = (props: {
    id: ListItemId;
    data: T;
    // required item props to render
    props: ListItemViewCommonProps;
    // internal list context props
    context: ListItemListContextProps;
    list: UseNormalizedListResult<T>;
    index: number;
    renderContainerProps?: P;
}) => React.JSX.Element;

export type NormalizedListContainerProps<T, P extends {} = {}> = ListContainerProps<T, P> & {
    size: ListItemSize;
};

export type NormalizedListRenderContainer<T> = (
    props: NormalizedListContainerProps<T>,
) => React.JSX.Element;

export type NormalizedListMapItemDataToContentProps<T> = (item: T) => ListItemViewContentType;

export type NormalizedListOnItemClickPayload<T> = {
    id: ListItemId;
    list: UseNormalizedListResult<T>;
};

export type NormalizedListOnItemClick<T> = (
    payload: NormalizedListOnItemClickPayload<T>,
    e?: React.SyntheticEvent,
) => void;

export interface NormalizedListProps<T, P extends {} = {}> extends QAProps {
    /**
     * Control outside list container dom element. For example for keyboard
     */
    containerRef?: React.RefObject<HTMLDivElement | null>;
    list: UseNormalizedListResult<T>;
    id?: string | undefined;
    className?: string;
    multiple?: boolean;
    size?: ListItemSize;
    /**
     * Override list item content by you custom node.
     */
    renderItem?: NormalizedListRenderItem<T, P>;
    renderContainer?: NormalizedListRenderContainer<T>;
    /**
     * `null` - disable default click handler
     */
    onItemClick?: null | NormalizedListOnItemClick<T>;
    /**
     * List item `data` to ListItemView `content` props
     */
    mapItemDataToContentProps: NormalizedListMapItemDataToContentProps<T>;
}
