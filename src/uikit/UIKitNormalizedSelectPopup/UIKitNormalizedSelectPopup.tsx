'use client';

import {Popup} from '@gravity-ui/uikit';

import {NormalizedSelectQa} from '../../components/NormalizedSelect/constants';
import type {
    NormalizedSelectPopupPlacement,
    NormalizedSelectRenderPopupProps,
} from '../../components/NormalizedSelect/types';
import {block} from '../../components/utils/cn';

import {getMiddlewares} from './middlewares';

import './UIKitNormalizedSelectPopup.scss';

const b = block('normalized-select-popup');

const DEFAULT_PLACEMENT: NormalizedSelectPopupPlacement = [
    'bottom-start',
    'bottom-end',
    'top-start',
    'top-end',
];

export type UIKitNormalizedSelectPopupProps = NormalizedSelectRenderPopupProps;

export const UIKitNormalizedSelectPopup = ({
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
}: UIKitNormalizedSelectPopupProps) => {
    return (
        <Popup
            className={b(null, className)}
            qa={NormalizedSelectQa.POPUP}
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
