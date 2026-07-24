import * as React from 'react';

import {ListItemView as HeadlessListItemView} from '../../components/useList';
import type {ListItemViewProps} from '../../components/useList';
import {block} from '../../components/utils/cn';

import './TreeListItemView.scss';

const b = block('list-item-view');

export const TreeListItemView = React.forwardRef(function TreeListItemView(
    {className, ...props}: ListItemViewProps,
    ref: React.ComponentPropsWithRef<typeof HeadlessListItemView>['ref'],
) {
    return (
        <HeadlessListItemView
            {...props}
            ref={ref}
            className={b({'theme-uikit': true}, className)}
        />
    );
}) as typeof HeadlessListItemView;
