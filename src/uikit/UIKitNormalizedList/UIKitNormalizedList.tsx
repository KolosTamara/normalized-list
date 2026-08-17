'use client';

import {NormalizedList} from '../../components/NormalizedList';
import type {
    NormalizedListProps,
    NormalizedListRenderItem,
} from '../../components/NormalizedList/types';

import {defaultUIKitRenderItem} from '../UIKitListItemView/defaultUIKitRenderItem';

export type UIKitNormalizedListProps<T, P extends {} = {}> = NormalizedListProps<T, P>;

/**
 * NormalizedList preset with UIKit list item view wired as the default `renderItem`.
 * Pass `renderItem` to override.
 */
export const UIKitNormalizedList = <T, P extends {} = {}>({
    renderItem = defaultUIKitRenderItem as NormalizedListRenderItem<T, P>,
    ...props
}: UIKitNormalizedListProps<T, P>) => {
    return <NormalizedList {...props} renderItem={renderItem} />;
};
