import type * as React from 'react';

import {block} from '../../../../utils/cn';
import type {ListItemViewContentType} from '../../../types';
import {FallbackListItemExpandIcon} from '../FallbackListItemExpandIcon/FallbackListItemExpandIcon';

import './FallbackListItemViewContent.scss';

const b = block('fallback-list-item-view-content');

export const isListItemContentPropsGuard = (
    props: ListItemViewContentType | React.ReactNode,
): props is ListItemViewContentType => {
    return typeof props === 'object' && props !== null && 'title' in props;
};

interface SlotProps extends React.HTMLAttributes<HTMLDivElement> {
    indentation?: number;
}

const ListItemViewSlot = ({children, indentation = 1, className, style, ...props}: SlotProps) => {
    return (
        <div
            className={b('slot', className)}
            style={{width: indentation * 16, ...style}}
            {...props}
        >
            {children}
        </div>
    );
};

const renderSafeIndentation = (indentation?: number) => {
    if (indentation && indentation >= 1) {
        return (
            <ListItemViewSlot indentation={Math.floor(indentation) as SlotProps['indentation']} />
        );
    }
    return null;
};

const SelectionIcon = () => (
    <span className={b('selection-icon')} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"
            />
        </svg>
    </span>
);

interface FallbackListItemViewContentProps extends ListItemViewContentType {
    selected?: boolean;
    disabled?: boolean;
    /**
     * Show selected icon if selected and reserve space for this icon
     */
    hasSelectionIcon: boolean;
}

export const FallbackListItemViewContent = ({
    startSlot,
    subtitle,
    endSlot,
    disabled,
    hasSelectionIcon,
    isGroup,
    indentation,
    expanded,
    selected,
    title,
    expandIconPlacement = 'start',
    renderExpandIcon: RenderExpandIcon = FallbackListItemExpandIcon,
}: FallbackListItemViewContentProps) => {
    const expandIconNode = isGroup ? (
        <RenderExpandIcon
            behavior={expandIconPlacement === 'start' ? 'state' : 'action'}
            expanded={expanded}
            disabled={disabled}
        />
    ) : null;

    return (
        <div className={b()}>
            <div className={b('start')}>
                {hasSelectionIcon && (
                    <ListItemViewSlot>{selected ? <SelectionIcon /> : null}</ListItemViewSlot>
                )}

                {renderSafeIndentation(indentation)}

                {expandIconPlacement === 'start' && expandIconNode}

                {startSlot}

                <div className={b('main')}>
                    {typeof title === 'string' ? (
                        <span
                            className={b('title', {
                                group: isGroup,
                                disabled: Boolean(disabled),
                            })}
                        >
                            {title}
                        </span>
                    ) : (
                        title
                    )}
                    {typeof subtitle === 'string' ? (
                        <span className={b('subtitle', {disabled: Boolean(disabled)})}>
                            {subtitle}
                        </span>
                    ) : (
                        subtitle
                    )}
                </div>
            </div>

            <div className={b('end')}>
                {expandIconPlacement === 'end' && expandIconNode}
                {endSlot}
            </div>
        </div>
    );
};
