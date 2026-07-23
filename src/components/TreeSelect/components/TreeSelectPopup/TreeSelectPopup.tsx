'use client';

import * as React from 'react';
import {createPortal} from 'react-dom';

import {useLayoutEffect} from '../../../../hooks';
import {block} from '../../../utils/cn';
import type {
    TreeSelectPopupPlacement,
    TreeSelectPopupProps,
    TreeSelectPopupWidth,
} from '../../types';

import './TreeSelectPopup.scss';

const b = block('tree-select-popup');

export type {TreeSelectPopupPlacement, TreeSelectPopupProps, TreeSelectPopupWidth};

function resolvePlacement(
    placement?: TreeSelectPopupPlacement,
): Exclude<TreeSelectPopupPlacement, unknown[]> {
    if (Array.isArray(placement)) {
        return placement[0] ?? 'bottom-start';
    }
    return placement ?? 'bottom-start';
}

function getPopupStyle({
    anchorRect,
    width,
    placement,
    disablePortal,
}: {
    anchorRect: DOMRect;
    width?: TreeSelectPopupWidth;
    placement: Exclude<TreeSelectPopupPlacement, unknown[]>;
    disablePortal: boolean;
}): React.CSSProperties {
    const resolvedWidth = typeof width === 'number' ? width : anchorRect.width;
    const isTop = placement.startsWith('top');
    const isEnd = placement.endsWith('end');

    if (disablePortal) {
        return {
            position: 'absolute',
            top: isTop ? undefined : '100%',
            bottom: isTop ? '100%' : undefined,
            left: isEnd ? undefined : 0,
            right: isEnd ? 0 : undefined,
            width: resolvedWidth,
        };
    }

    return {
        position: 'fixed',
        top: isTop ? undefined : anchorRect.bottom,
        bottom: isTop ? window.innerHeight - anchorRect.top : undefined,
        left: isEnd ? undefined : anchorRect.left,
        right: isEnd ? window.innerWidth - anchorRect.right : undefined,
        width: resolvedWidth,
    };
}

export const TreeSelectPopup = ({
    open,
    onClose,
    anchorRef,
    children,
    className,
    id,
    width,
    placement: placementProp,
    disablePortal = false,
}: TreeSelectPopupProps) => {
    const popupRef = React.useRef<HTMLDivElement>(null);
    const [style, setStyle] = React.useState<React.CSSProperties>();
    const placement = resolvePlacement(placementProp);

    useLayoutEffect(() => {
        if (!open || !anchorRef.current) {
            return;
        }

        const update = () => {
            if (!anchorRef.current) {
                return;
            }
            setStyle(
                getPopupStyle({
                    anchorRect: anchorRef.current.getBoundingClientRect(),
                    width,
                    placement,
                    disablePortal,
                }),
            );
        };

        update();

        if (disablePortal) {
            return undefined;
        }

        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update, true);
        };
    }, [open, width, placement, disablePortal, anchorRef]);

    React.useEffect(() => {
        if (!open) {
            return undefined;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const onMouseDown = (event: MouseEvent) => {
            const target = event.target as Node;
            if (popupRef.current?.contains(target) || anchorRef.current?.contains(target)) {
                return;
            }
            onClose();
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('mousedown', onMouseDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', onMouseDown);
        };
    }, [open, onClose, anchorRef]);

    if (!open) {
        return null;
    }

    const node = (
        <div
            ref={popupRef}
            id={id}
            className={b(null, className)}
            style={style}
            role="presentation"
        >
            {children}
        </div>
    );

    if (disablePortal) {
        return node;
    }

    return createPortal(node, document.body);
};
