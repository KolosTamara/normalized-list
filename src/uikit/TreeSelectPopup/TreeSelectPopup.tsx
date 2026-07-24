'use client';

import {Popup} from '@gravity-ui/uikit';

import type {
    TreeSelectPopupPlacement,
    TreeSelectRenderPopupProps,
} from '../../components/TreeSelect/types';
import {block} from '../../components/utils/cn';

import {getMiddlewares} from './middlewares';

import './TreeSelectPopup.scss';

const b = block('tree-select-popup');

const DEFAULT_PLACEMENT: TreeSelectPopupPlacement = [
    'bottom-start',
    'bottom-end',
    'top-start',
    'top-end',
];

export type TreeSelectPopupProps = TreeSelectRenderPopupProps;

export const TreeSelectPopup = ({
    open,
    onClose,
    anchorRef,
    controlRef,
    children,
    className,
    id,
    width,
    placement = DEFAULT_PLACEMENT,
    disablePortal,
}: TreeSelectPopupProps) => {
    return (
        <Popup
            className={b(null, className)}
            anchorRef={anchorRef}
            placement={placement}
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                    onClose();
                }
            }}
            disablePortal={disablePortal}
            returnFocus={controlRef}
            floatingMiddlewares={getMiddlewares({width, disablePortal})}
            id={id}
        >
            {children}
        </Popup>
    );
};
