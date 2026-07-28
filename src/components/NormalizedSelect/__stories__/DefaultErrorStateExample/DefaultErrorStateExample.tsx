import * as React from 'react';

import type {ListItemType} from '../../../useNormalizedList';
import {NormalizedSelect} from '../../NormalizedSelect';
import type {NormalizedSelectProps} from '../../types';

import './DefaultErrorStateExample.scss';

type Entity = string;

export interface ErrorStateExampleProps extends Omit<
    NormalizedSelectProps<Entity>,
    'items' | 'mapItemDataToContentProps'
> {}

const items: ListItemType<Entity>[] = ['one', 'two', 'free'];
const errorMessage = 'A validation error has occurred';

/**
 * Plain NormalizedSelect error states (outside + inside) without UIKit.
 */
export const DefaultErrorStateExample = (props: ErrorStateExampleProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="normalized-select-error-state-example">
            <div className="normalized-select-error-state-example__column">
                <NormalizedSelect
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
            <div className="normalized-select-error-state-example__column">
                <NormalizedSelect
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
