import {Check} from '@gravity-ui/icons';
import {Flex, Icon, Text, colorText} from '@gravity-ui/uikit';
import type {FlexProps} from '@gravity-ui/uikit';

import type {ListItemViewContentType} from '../../../useList';

import {UIKitListItemExpandIcon} from './UIKitListItemExpandIcon';

interface SlotProps extends FlexProps {
    indentation?: number;
}

const ListItemViewSlot = ({children, indentation = 1, ...props}: SlotProps) => {
    return (
        <Flex width={indentation * 16} shrink={0} {...props}>
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
        <Flex alignItems="center" justifyContent="space-between" gap={4} width="100%" height="100%">
            <Flex gap={2} alignItems="center" grow style={{minWidth: 0}}>
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

                <Flex direction="column" grow style={{minWidth: 0, gap: 2}}>
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
                </Flex>
            </Flex>

            <Flex gap={2} shrink={0}>
                {expandIconPlacement === 'end' && expandIconNode}
                {endSlot}
            </Flex>
        </Flex>
    );
};
