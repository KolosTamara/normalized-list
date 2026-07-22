import {Xmark} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import {block} from '../../../../../utils/cn';

import './SelectClear.scss';
import {ListItemSize} from '../../../../../useList';

const b = block('tree-select-uikit-control-clear');

export type SelectClearProps = {
    size: ListItemSize;
    onClick: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

/**
 * Story recipe: clear button matching UIKit SelectClear layout.
 */
export const SelectClear = ({size, onClick, onMouseEnter, onMouseLeave}: SelectClearProps) => {
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
