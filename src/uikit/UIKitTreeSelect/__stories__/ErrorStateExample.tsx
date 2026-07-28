import * as React from 'react';

import {Flex} from '@gravity-ui/uikit';

import type {ListItemType} from '../../../components/useList';
import type {UIKitTreeSelectProps} from '../UIKitTreeSelect';
import {UIKitTreeSelect} from '../UIKitTreeSelect';

type Entity = string;

export interface ErrorStateExampleProps extends Omit<
    UIKitTreeSelectProps<Entity>,
    'items' | 'mapItemDataToContentProps' | 'renderControl' | 'renderPopup' | 'renderItem'
> {}

const items: ListItemType<Entity>[] = ['one', 'two', 'free'];
const errorMessage = 'A validation error has occurred';

/**
 * UIKitTreeSelect error states (outside + inside).
 */
export const ErrorStateExample = (props: ErrorStateExampleProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const sharedProps = {
        ...props,
        items,
        getItemId: (id: Entity) => id,
        placeholder: '-',
        containerRef,
        mapItemDataToContentProps: (title: Entity) => ({title}),
        errorMessage,
        validationState: 'invalid' as const,
        hasClear: true,
    };

    return (
        <Flex gap={5}>
            <Flex direction="column" gap={3} width={300}>
                <UIKitTreeSelect {...sharedProps} errorPlacement="outside" />
            </Flex>
            <Flex direction="column" gap={3} width={300}>
                <UIKitTreeSelect {...sharedProps} errorPlacement="inside" />
            </Flex>
        </Flex>
    );
};
