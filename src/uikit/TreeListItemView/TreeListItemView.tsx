import * as React from 'react';

import {ListItemView as HeadlessListItemView} from '../../components/useList';
import type {ListItemViewProps} from '../../components/useList';

import './TreeListItemView.scss';

export const TreeListItemView = React.forwardRef(function TreeListItemView(
    {className, ...props}: ListItemViewProps,
    ref: React.ComponentPropsWithRef<typeof HeadlessListItemView>['ref'],
) {
    return (
        <HeadlessListItemView
            {...props}
            ref={ref}
            className={['g-list-item-view_theme-uikit', className].filter(Boolean).join(' ')}
        />
    );
}) as typeof HeadlessListItemView;
