import * as React from 'react';

import {ListItemView} from '../../../useList';
import type {ListItemViewProps} from '../../../useList';

import './UIKitListItemView.scss';

/**
 * Storybook recipe: headless `ListItemView` with UIKit design tokens.
 */
export const UIKitListItemView = React.forwardRef(function UIKitListItemView(
    {className, ...props}: ListItemViewProps,
    ref: React.ComponentPropsWithRef<typeof ListItemView>['ref'],
) {
    return (
        <ListItemView
            {...props}
            ref={ref}
            className={['g-list-item-view_theme-uikit', className].filter(Boolean).join(' ')}
        />
    );
}) as typeof ListItemView;
