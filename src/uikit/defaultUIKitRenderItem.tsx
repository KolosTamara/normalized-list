import type {NormalizedListRenderItem} from '../components/NormalizedList/types';

import {UIKitListItemView} from './UIKitListItemView';

export const defaultUIKitRenderItem: NormalizedListRenderItem<unknown> = ({
    props: itemProps,
    renderContainerProps,
}) => {
    return <UIKitListItemView {...itemProps} {...renderContainerProps} />;
};
