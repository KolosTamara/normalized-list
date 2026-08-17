import * as React from 'react';

import {ListItemView, isListItemContentPropsGuard} from '../../components/useNormalizedList';
import type {ListItemViewProps} from '../../components/useNormalizedList';
import {block} from '../../components/utils/cn';
import {UIKitListItemViewContent} from '../UIKitListItemViewContent';

import './UIKitListItemView.scss';

const b = block('list-item-view');

export const UIKitListItemView = React.forwardRef(function UIKitListItemView(
    {className, content, selectionViewType, selected, disabled, ...props}: ListItemViewProps,
    ref: React.ComponentPropsWithRef<typeof ListItemView>['ref'],
) {
    const resolvedContent = isListItemContentPropsGuard(content) ? (
        <UIKitListItemViewContent
            {...content}
            hasSelectionIcon={selectionViewType === 'multiple'}
            selected={selected}
            disabled={disabled}
        />
    ) : (
        content
    );

    return (
        <ListItemView
            {...props}
            ref={ref}
            selected={selected}
            disabled={disabled}
            selectionViewType={selectionViewType}
            className={b({'theme-uikit': true}, className)}
            content={resolvedContent}
        />
    );
}) as typeof ListItemView;
