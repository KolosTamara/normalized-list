'use client';

import {Popup} from '@gravity-ui/uikit';

import type {
    NormalizedSelectPopupPlacement,
    NormalizedSelectRenderPopupProps,
} from '../../components/NormalizedSelect/types';
import {block} from '../../components/utils/cn';

import {getMiddlewares} from './middlewares';

import './NormalizedSelectPopup.scss';

const b = block('normalized-select-popup');

const DEFAULT_PLACEMENT: NormalizedSelectPopupPlacement = [
    'bottom-start',
    'bottom-end',
    'top-start',
    'top-end',
];

export type NormalizedSelectPopupProps = NormalizedSelectRenderPopupProps;

export const NormalizedSelectPopup = ({
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
}: NormalizedSelectPopupProps) => {
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
