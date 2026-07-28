'use client';

import {TreeList} from '../../components/TreeList';
import type {TreeListProps, TreeListRenderItem} from '../../components/TreeList/types';

import {renderUIKitListItem} from '../renderUIKitListItem';

export type UIKitTreeListProps<T, P extends {} = {}> = TreeListProps<T, P>;

/**
 * TreeList preset with UIKit list item view wired as the default `renderItem`.
 * Pass `renderItem` to override.
 */
export const UIKitTreeList = <T, P extends {} = {}>({
    renderItem = renderUIKitListItem as TreeListRenderItem<T, P>,
    ...props
}: UIKitTreeListProps<T, P>) => {
    return <TreeList {...props} renderItem={renderItem} />;
};
