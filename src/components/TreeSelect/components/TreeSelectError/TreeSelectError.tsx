import type * as React from 'react';

import {block} from '../../../utils/cn';

import './TreeSelectError.scss';

const b = block('tree-select-error');

export interface TreeSelectErrorProps {
    id?: string;
    children?: React.ReactNode;
}

/**
 * Plain fallback for outside error message.
 * Consumers can replace it via `renderError` with design-system markup.
 */
export const TreeSelectError = ({id, children}: TreeSelectErrorProps) => {
    if (!children) {
        return null;
    }

    return (
        <div className={b()} id={id} role="alert">
            {children}
        </div>
    );
};
