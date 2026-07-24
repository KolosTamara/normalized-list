import * as React from 'react';

import {ListContainerView, computeItemSize} from '../../../../components/useList';
import {VirtualizedListContainer} from '../../../../components/useList/__stories__/components/VirtualizedListContainer';
import type {TreeListContainerProps} from '../../../../components/TreeList/types';

// custom container renderer example
export const RenderVirtualizedContainer = <T,>({
    id,
    qa,
    containerRef,
    list,
    renderItem,
    size,
    className,
}: TreeListContainerProps<T>) => {
    return (
        <ListContainerView
            qa={qa}
            fixedHeight
            id={id}
            /*
             *  TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
             */
            ref={containerRef as React.Ref<HTMLDivElement>}
            className={className}
            extraProps={{style: {padding: 0}}}
        >
            <VirtualizedListContainer
                items={list.structure.visibleFlattenIds}
                itemSize={(_index: number) => computeItemSize(size)}
            >
                {renderItem}
            </VirtualizedListContainer>
        </ListContainerView>
    );
};
