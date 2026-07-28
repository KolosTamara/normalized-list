import type {NormalizedListRenderItem} from '../components/NormalizedList/types';
import type {ListItemViewContentType} from '../components/useNormalizedList';

import {NormalizedListItemExpandIcon} from './NormalizedListItemExpandIcon';
import {NormalizedListItemView} from './NormalizedListItemView';
import {NormalizedListItemViewContent} from './NormalizedListItemViewContent';

/**
 * Default UIKit list item renderer for NormalizedList / NormalizedSelect wrappers.
 * Passes structured `content` through themed NormalizedListItemView + NormalizedListItemViewContent.
 */
export const renderUIKitListItem: NormalizedListRenderItem<unknown> = ({
    props: itemProps,
    renderContainerProps,
}) => {
    const {content, selectionViewType, selected, disabled, ...shellProps} = itemProps;

    return (
        <NormalizedListItemView
            {...shellProps}
            {...renderContainerProps}
            selected={selected}
            disabled={disabled}
            selectionViewType={selectionViewType}
            content={
                <NormalizedListItemViewContent
                    {...(content as ListItemViewContentType)}
                    hasSelectionIcon={selectionViewType === 'multiple'}
                    selected={selected}
                    disabled={disabled}
                    renderExpandIcon={NormalizedListItemExpandIcon}
                />
            }
        />
    );
};
