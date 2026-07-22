import * as React from 'react';

import type {ListItemType} from '../../../useList';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

import './DefaultErrorStateExample.scss';

type Entity = string;

export interface ErrorStateExampleProps extends Omit<
    TreeSelectProps<Entity>,
    'items' | 'mapItemDataToContentProps'
> {}

const items: ListItemType<Entity>[] = ['one', 'two', 'free'];
const errorMessage = 'A validation error has occurred';

/**
 * Plain TreeSelect error states (outside + inside) without UIKit.
 */
export const DefaultErrorStateExample = (props: ErrorStateExampleProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="tree-select-error-state-example">
            <div className="tree-select-error-state-example__column">
                <TreeSelect
                    {...props}
                    items={items}
                    getItemId={(id) => id}
                    placeholder="-"
                    containerRef={containerRef}
                    mapItemDataToContentProps={(title) => ({title})}
                    errorMessage={errorMessage}
                    errorPlacement="outside"
                    validationState="invalid"
                    hasClear
                />
            </div>
            <div className="tree-select-error-state-example__column">
                <TreeSelect
                    {...props}
                    items={items}
                    getItemId={(id) => id}
                    placeholder="-"
                    containerRef={containerRef}
                    mapItemDataToContentProps={(title) => ({title})}
                    errorMessage={errorMessage}
                    errorPlacement="inside"
                    validationState="invalid"
                    hasClear
                />
            </div>
        </div>
    );
};
