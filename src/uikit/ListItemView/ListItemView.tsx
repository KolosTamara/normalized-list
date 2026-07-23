import * as React from 'react';

import {ListItemView as HeadlessListItemView} from '../../components/useList';
import type {ListItemViewProps} from '../../components/useList';

import './ListItemView.scss';

export const ListItemView = React.forwardRef(function ListItemView(
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
