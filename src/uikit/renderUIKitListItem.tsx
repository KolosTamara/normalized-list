import type {NormalizedListRenderItem} from '../components/NormalizedList/types';

import {UIKitListItemView} from './UIKitListItemView';

/**
 * Default UIKit list item renderer for NormalizedList / NormalizedSelect wrappers.
 * Passes structured `content` through themed UIKitListItemView (UIKit content by default).
 */
export const renderUIKitListItem: NormalizedListRenderItem<unknown> = ({
    props: itemProps,
    renderContainerProps,
}) => {
    return <UIKitListItemView {...itemProps} {...renderContainerProps} />;
};
