import type {NormalizedListRenderItem} from '../components/NormalizedList/types';
import type {ListItemViewContentType} from '../components/useNormalizedList';

import {UIKitListItemExpandIcon} from './UIKitListItemExpandIcon';
import {UIKitListItemView} from './UIKitListItemView';
import {UIKitListItemViewContent} from './UIKitListItemViewContent';

/**
 * Default UIKit list item renderer for NormalizedList / NormalizedSelect wrappers.
 * Passes structured `content` through themed UIKitListItemView + UIKitListItemViewContent.
 */
export const renderUIKitListItem: NormalizedListRenderItem<unknown> = ({
    props: itemProps,
    renderContainerProps,
}) => {
    const {content, selectionViewType, selected, disabled, ...shellProps} = itemProps;

    return (
        <UIKitListItemView
            {...shellProps}
            {...renderContainerProps}
            selected={selected}
            disabled={disabled}
            selectionViewType={selectionViewType}
            content={
                <UIKitListItemViewContent
                    {...(content as ListItemViewContentType)}
                    hasSelectionIcon={selectionViewType === 'multiple'}
                    selected={selected}
                    disabled={disabled}
                    renderExpandIcon={UIKitListItemExpandIcon}
                />
            }
        />
    );
};
