'use client';

import * as React from 'react';

import {ChevronDown, TriangleExclamation} from '@gravity-ui/icons';
import {Alert, Icon, Popover, useDirection} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import type {TreeSelectRenderControlProps} from '../../../types';
import {SelectClear} from '../SelectClear';

import './SelectControl.scss';

const b = block('tree-select-uikit-control');

export type SelectControlProps<T> = Omit<TreeSelectRenderControlProps<T>, 'ref'> & {
    selectedOptionsContent: React.ReactNode;
};

/**
 * Story recipe: TreeSelect control matching UIKit SelectControl layout
 * with a dedicated BEM block and public UIKit SCSS mixins.
 */
export const SelectControl = React.forwardRef(function SelectControl<T>(
    {
        open,
        toggleOpen,
        clearValue,
        value,
        selectedOptionsContent,
        size = 'm',
        id,
        placeholder,
        disabled,
        title,
        hasClear,
        errorMessage,
        isErrorVisible,
    }: SelectControlProps<T>,
    ref: React.Ref<HTMLButtonElement>,
) {
    const direction = useDirection();
    const [isDisabledButtonAnimation, setIsDisabledButtonAnimation] = React.useState(false);

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

    const handleClearClick = () => {
        setIsDisabledButtonAnimation(false);
        clearValue();
    };

    return (
        <div
            className={b({
                open,
                size,
                disabled: Boolean(disabled),
                error: Boolean(isErrorVisible),
                'has-clear': Boolean(hasClear),
                'has-value': hasValue,
                'no-active': isDisabledButtonAnimation,
            })}
            role="group"
        >
            <button
                ref={ref}
                type="button"
                className={b('button', {
                    open,
                    size,
                    view: 'normal',
                    pin: 'round-round',
                    disabled: Boolean(disabled),
                    error: Boolean(isErrorVisible),
                })}
                id={id}
                title={title}
                disabled={disabled}
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-invalid={isErrorVisible || undefined}
                onClick={handleControlClick}
            >
                {showPlaceholder && <span className={b('placeholder')}>{placeholder}</span>}
                {showOptionsText && (
                    <span className={b('option-text')}>{selectedOptionsContent}</span>
                )}
            </button>

            {showClear && (
                <SelectClear
                    size={size}
                    onClick={handleClearClick}
                    onMouseEnter={() => setIsDisabledButtonAnimation(true)}
                    onMouseLeave={() => setIsDisabledButtonAnimation(false)}
                />
            )}

            {errorMessage ? (
                <Popover
                    placement={direction === 'rtl' ? ['left', 'bottom'] : ['right', 'bottom']}
                    hasArrow
                    className={b('error-popover')}
                    content={
                        <Alert
                            className={b('error-popover-content')}
                            theme="clear"
                            message={<div role="presentation">{errorMessage}</div>}
                        />
                    }
                >
                    <button type="button" className={b('error-icon')} aria-label="Show error info">
                        <Icon data={TriangleExclamation} size={size === 's' ? 12 : 16} />
                    </button>
                </Popover>
            ) : null}

            <Icon
                className={b('chevron-icon', {disabled: Boolean(disabled)})}
                data={ChevronDown}
                aria-hidden
            />
        </div>
    );
}) as <T>(
    props: SelectControlProps<T> & {ref?: React.Ref<HTMLButtonElement>},
) => React.ReactElement;
