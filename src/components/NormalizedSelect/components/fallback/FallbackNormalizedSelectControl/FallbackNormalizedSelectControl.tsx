'use client';

import * as React from 'react';

import {block} from '../../../../utils/cn';
import type {NormalizedSelectRenderControlProps} from '../../../types';

import './FallbackNormalizedSelectControl.scss';

const b = block('fallback-normalized-select-control');

export type FallbackNormalizedSelectControlProps = Omit<
    NormalizedSelectRenderControlProps<unknown>,
    'ref'
> & {
    selectedOptionsContent: React.ReactNode;
    popupId: string;
    className?: string;
    qa?: string;
};

const ChevronIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.707 6.707a1 1 0 0 0-1.414-1.414L8 8.586 4.707 5.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4z"
        />
    </svg>
);

const ClearIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.22 2.22a.75.75 0 0 1 1.06 0L6 4.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L7.06 6l2.72 2.72a.75.75 0 1 1-1.06 1.06L6 7.06 3.28 9.78a.75.75 0 0 1-1.06-1.06L4.94 6 2.22 3.28a.75.75 0 0 1 0-1.06z"
        />
    </svg>
);

export const FallbackNormalizedSelectControl = React.forwardRef<
    HTMLButtonElement,
    FallbackNormalizedSelectControlProps
>(function FallbackNormalizedSelectControl(
    {
        open,
        toggleOpen,
        clearValue,
        value,
        selectedOptionsContent,
        popupId,
        id,
        placeholder,
        disabled,
        size = 'm',
        title,
        hasClear,
        errorMessage,
        isErrorVisible,
        className,
        qa,
    },
    ref,
) {
    const showOptionsText = Boolean(selectedOptionsContent);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const hasValue = value.filter(Boolean).length > 0;
    const showClear = Boolean(hasClear && hasValue && !disabled);

    const handleControlClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Safari: button may not receive focus on click
        if (e.currentTarget !== document.activeElement) {
            e.currentTarget.focus();
        }
        toggleOpen();
    };

    const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        clearValue();
    };

    return (
        <div
            className={b(
                {
                    open,
                    size,
                    disabled: Boolean(disabled),
                    error: Boolean(isErrorVisible),
                    'has-value': hasValue,
                    'has-clear': showClear,
                },
                className,
            )}
            role="group"
        >
            <button
                ref={ref}
                type="button"
                className={b('button')}
                id={id}
                data-qa={qa}
                title={title}
                disabled={disabled}
                role="combobox"
                aria-controls={open ? popupId : undefined}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-invalid={isErrorVisible || undefined}
                onClick={handleControlClick}
            >
                {showPlaceholder && <span className={b('placeholder')}>{placeholder}</span>}
                {showOptionsText && <span className={b('value')}>{selectedOptionsContent}</span>}
            </button>

            {showClear && (
                <button
                    type="button"
                    className={b('clear')}
                    aria-label="Clear"
                    disabled={disabled}
                    onClick={handleClearClick}
                >
                    <ClearIcon />
                </button>
            )}

            {isErrorVisible && errorMessage ? (
                <span
                    className={b('error')}
                    title={typeof errorMessage === 'string' ? errorMessage : undefined}
                >
                    !
                </span>
            ) : null}

            <span className={b('chevron', {disabled: Boolean(disabled), open})} aria-hidden="true">
                <ChevronIcon />
            </span>
        </div>
    );
});
