import {Xmark} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import {NormalizedSelectQa} from '../../components/NormalizedSelect/constants';
import type {ListItemSize} from '../../components/useNormalizedList';
import {block} from '../../components/utils/cn';

import './UIKitNormalizedSelectClear.scss';

const b = block('normalized-select-control-clear');

export type UIKitNormalizedSelectClearProps = {
    size: ListItemSize;
    onClick: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

export const UIKitNormalizedSelectClear = ({
    size,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: UIKitNormalizedSelectClearProps) => {
    return (
        <button
            type="button"
            className={b({size})}
            aria-label="Clear"
            data-qa={NormalizedSelectQa.CLEAR}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Icon className={b('clear')} data={Xmark} />
        </button>
    );
};
