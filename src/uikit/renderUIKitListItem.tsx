import type {TreeListRenderItem} from '../components/TreeList/types';
import type {ListItemViewContentType} from '../components/useList';

import {TreeListItemExpandIcon} from './TreeListItemExpandIcon';
import {TreeListItemView} from './TreeListItemView';
import {TreeListItemViewContent} from './TreeListItemViewContent';

/**
 * Default UIKit list item renderer for TreeList / TreeSelect wrappers.
 * Passes structured `content` through themed TreeListItemView + TreeListItemViewContent.
 */
export const renderUIKitListItem: TreeListRenderItem<unknown> = ({
    props: itemProps,
    renderContainerProps,
}) => {
    const {content, selectionViewType, selected, disabled, ...shellProps} = itemProps;

    return (
        <TreeListItemView
            {...shellProps}
            {...renderContainerProps}
            selected={selected}
            disabled={disabled}
            selectionViewType={selectionViewType}
            content={
                <TreeListItemViewContent
                    {...(content as ListItemViewContentType)}
                    hasSelectionIcon={selectionViewType === 'multiple'}
                    selected={selected}
                    disabled={disabled}
                    renderExpandIcon={TreeListItemExpandIcon}
                />
            }
        />
    );
};
