import type * as React from 'react';

import {block} from '../../../../utils/cn';

import './FallbackNormalizedSelectError.scss';

const b = block('fallback-normalized-select-error');

export interface FallbackNormalizedSelectErrorProps {
    id?: string;
    children?: React.ReactNode;
}

/**
 * Plain fallback for outside error message.
 * Consumers can replace it via `renderError` with design-system markup.
 */
export const FallbackNormalizedSelectError = ({
    id,
    children,
}: FallbackNormalizedSelectErrorProps) => {
    if (!children) {
        return null;
    }

    return (
        <div className={b()} id={id} role="alert">
            {children}
        </div>
    );
};
