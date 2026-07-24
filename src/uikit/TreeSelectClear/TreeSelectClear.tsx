import {Xmark} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import type {ListItemSize} from '../../components/useList';
import {block} from '../../components/utils/cn';

import './TreeSelectClear.scss';

const b = block('tree-select-uikit-control-clear');

export type TreeSelectClearProps = {
    size: ListItemSize;
    onClick: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

export const TreeSelectClear = ({
    size,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: TreeSelectClearProps) => {
    return (
        <button
            type="button"
            className={b({size})}
            aria-label="Clear"
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Icon className={b('clear')} data={Xmark} />
        </button>
    );
};
