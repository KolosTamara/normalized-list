import type * as React from 'react';

import {block} from '../../../../utils/cn';

import './FallbackTreeSelectError.scss';

const b = block('fallback-tree-select-error');

export interface FallbackTreeSelectErrorProps {
    id?: string;
    children?: React.ReactNode;
}

/**
 * Plain fallback for outside error message.
 * Consumers can replace it via `renderError` with design-system markup.
 */
export const FallbackTreeSelectError = ({id, children}: FallbackTreeSelectErrorProps) => {
    if (!children) {
        return null;
    }

    return (
        <div className={b()} id={id} role="alert">
            {children}
        </div>
    );
};
