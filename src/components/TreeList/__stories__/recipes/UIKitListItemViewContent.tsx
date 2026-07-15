import {Check} from '@gravity-ui/icons';
import {Flex, Icon, Text, colorText} from '@gravity-ui/uikit';
import type {FlexProps} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import type {ListItemViewContentType} from '../../../useList/types';

import {UIKitListItemExpandIcon} from './UIKitListItemExpandIcon';

const b = block('list-item-view-content');

interface SlotProps extends FlexProps {
    indentation?: number;
}

const ListItemViewSlot = ({children, indentation = 1, className, ...props}: SlotProps) => {
    return (
        <Flex width={indentation * 16} className={b('slot', className)} {...props}>
            {children}
        </Flex>
    );
};

const renderSafeIndentation = (indentation?: number) => {
    if (indentation && indentation >= 1) {
        return (
            <ListItemViewSlot indentation={Math.floor(indentation) as SlotProps['indentation']} />
        );
    }
    return null;
};

interface UIKitListItemViewContentProps extends ListItemViewContentType {
    selected?: boolean;
    disabled?: boolean;
    hasSelectionIcon: boolean;
}

export const UIKitListItemViewContent = ({
    startSlot,
    subtitle,
    endSlot,
    disabled,
    hasSelectionIcon,
    isGroup,
    indentation,
    expanded,
    selected,
    title,
    expandIconPlacement = 'start',
    renderExpandIcon: RenderExpandIcon = UIKitListItemExpandIcon,
}: UIKitListItemViewContentProps) => {
    const expandIconNode = isGroup ? (
        <RenderExpandIcon
            behavior={expandIconPlacement === 'start' ? 'state' : 'action'}
            expanded={expanded}
            disabled={disabled}
        />
    ) : null;

    return (
        <Flex alignItems="center" justifyContent="space-between" gap={4} className={b()}>
            <Flex gap={2} alignItems="center" grow>
                {hasSelectionIcon && (
                    <ListItemViewSlot>
                        {selected ? (
                            <Icon data={Check} size={16} className={colorText({color: 'info'})} />
                        ) : null}
                    </ListItemViewSlot>
                )}

                {renderSafeIndentation(indentation)}

                {expandIconPlacement === 'start' && expandIconNode}

                {startSlot}

                <div className={b('main')}>
                    {typeof title === 'string' ? (
                        <Text
                            ellipsis
                            color={disabled ? 'hint' : undefined}
                            variant={isGroup ? 'subheader-1' : undefined}
                        >
                            {title}
                        </Text>
                    ) : (
                        title
                    )}
                    {typeof subtitle === 'string' ? (
                        <Text ellipsis color={disabled ? 'hint' : 'secondary'}>
                            {subtitle}
                        </Text>
                    ) : (
                        subtitle
                    )}
                </div>
            </Flex>

            <Flex gap={2}>
                {expandIconPlacement === 'end' && expandIconNode}
                {endSlot}
            </Flex>
        </Flex>
    );
};
