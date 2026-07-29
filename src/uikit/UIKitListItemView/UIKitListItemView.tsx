import * as React from 'react';

import {ListItemView as HeadlessListItemView} from '../../components/useNormalizedList';
import type {ListItemViewProps} from '../../components/useNormalizedList';
import {block} from '../../components/utils/cn';

import './UIKitListItemView.scss';

const b = block('list-item-view');

export const UIKitListItemView = React.forwardRef(function UIKitListItemView(
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
