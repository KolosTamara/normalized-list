import {block} from '../../../utils/cn';
import type {ListItemExpandIconRenderProps} from '../../types';

import './ListItemExpandIcon.scss';

const b = block('list-item-expand-icon');

export interface ListItemExpandIconProps extends ListItemExpandIconRenderProps {}

type IconDirection = 'top' | 'bottom' | 'left' | 'right';

export const ListItemExpandIcon = ({
    expanded,
    behavior = 'action',
    disabled,
}: ListItemExpandIconProps) => {
    const direction = getIconDirection({behavior, expanded});

    return (
        <span className={b({direction, disabled: Boolean(disabled)})} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.707 6.707a1 1 0 0 0-1.414-1.414L8 8.586 4.707 5.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4z"
                />
            </svg>
        </span>
    );
};

function getIconDirection({
    behavior,
    expanded,
}: Pick<ListItemExpandIconRenderProps, 'expanded' | 'behavior'>): IconDirection {
    if (expanded && behavior === 'action') {
        return 'top';
    } else if (expanded && behavior === 'state') {
        return 'bottom';
    } else if (expanded && behavior === 'state-inverse') {
        return 'bottom';
    } else if (behavior === 'action') {
        return 'bottom';
    } else if (behavior === 'state') {
        return 'right';
    } else if (behavior === 'state-inverse') {
        return 'left';
    }

    return 'bottom';
}
