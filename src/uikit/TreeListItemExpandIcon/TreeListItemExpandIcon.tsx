import {ArrowToggle, colorText} from '@gravity-ui/uikit';
import type {ArrowToggleProps} from '@gravity-ui/uikit';

import type {ListItemExpandIconRenderProps} from '../../components/useList';

export interface TreeListItemExpandIconProps extends ListItemExpandIconRenderProps {}

export const TreeListItemExpandIcon = ({
    expanded,
    behavior = 'action',
    disabled,
}: TreeListItemExpandIconProps) => {
    return (
        <ArrowToggle
            direction={getIconDirection({behavior, expanded})}
            className={colorText({color: disabled ? 'hint' : undefined})}
            size={16}
        />
    );
};

function getIconDirection({
    behavior,
    expanded,
}: Pick<ListItemExpandIconRenderProps, 'expanded' | 'behavior'>): ArrowToggleProps['direction'] {
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
