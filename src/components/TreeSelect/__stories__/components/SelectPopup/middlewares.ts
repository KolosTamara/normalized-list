import {flip, offset as floatingOffset, limitShift, shift, size} from '@floating-ui/react';
import type {Middleware} from '@floating-ui/react';

import type {TreeSelectRenderPopupProps} from '../../../types';

const BORDER_WIDTH = 1;

type MiddlewaresArgs = Pick<TreeSelectRenderPopupProps, 'width' | 'disablePortal'>;

const adjustBorderWidth = (width: number) => width - BORDER_WIDTH * 2;

const getPopupWidth = (width: TreeSelectRenderPopupProps['width'], controlWidth: number) => {
    let popupWidth = controlWidth;

    if (typeof width === 'number') {
        popupWidth = width;
    } else {
        popupWidth = adjustBorderWidth(controlWidth);
    }

    return `${popupWidth}px`;
};

function sameWidthMiddleware(args: Pick<MiddlewaresArgs, 'width'>): Middleware {
    const {width} = args;

    return size({
        apply(state) {
            const skip =
                typeof width !== 'number' && Boolean(state.elements.floating.style.maxWidth);
            if (skip) {
                return;
            }

            const popupWidth = getPopupWidth(width, state.rects.reference.width);
            const floatingStyle: Record<string, string | undefined> = {};

            if (typeof width !== 'number' && width !== 'fit') {
                floatingStyle.minWidth = popupWidth;
                floatingStyle.width = undefined;
            } else {
                floatingStyle.minWidth = popupWidth;
                floatingStyle.width = popupWidth;
            }

            floatingStyle.maxWidth = `max(90vw, ${adjustBorderWidth(state.rects.reference.width)}px)`;
            Object.assign(state.elements.floating.style, floatingStyle);
        },
    });
}

export function getMiddlewares(args: MiddlewaresArgs): Middleware[] {
    return [
        floatingOffset({mainAxis: BORDER_WIDTH, crossAxis: BORDER_WIDTH}),
        flip({altBoundary: args.disablePortal}),
        shift({
            limiter: limitShift(),
            crossAxis: true,
            padding: 10,
            altBoundary: args.disablePortal,
        }),
        sameWidthMiddleware(args),
    ];
}
