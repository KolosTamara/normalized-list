import {Flex, Label, Loader, spacing} from '@gravity-ui/uikit';

import {useNormalizedList} from '../../../../components/useNormalizedList';
import {IntersectionContainer} from '../../../../components/useNormalizedList/__stories__/components/IntersectionContainer/IntersectionContainer';
import {useInfinityFetch} from '../../../../components/useNormalizedList/__stories__/utils/useInfinityFetch';
import {UIKitNormalizedList} from '../../../UIKitNormalizedList';
import type {UIKitNormalizedListProps as NormalizedListProps} from '../../../UIKitNormalizedList';
import {RenderVirtualizedContainer} from '../components/RenderVirtualizedContainer';
import {
    NormalizedListItemExpandIcon,
    NormalizedListItemView,
    NormalizedListItemViewContent,
} from '../../../../uikit';

interface Entity {
    title: string;
}

const mapEntityToContentProps: NormalizedListProps<Entity>['mapItemDataToContentProps'] = (item) =>
    item;

export interface InfinityScrollStoryProps extends Omit<
    NormalizedListProps<Entity>,
    'items' | 'multiple' | 'size' | 'mapItemDataToContentProps' | 'renderItem' | 'renderContainer'
> {
    itemsCount?: number;
}

const multiple = true;

export const InfinityScrollStory = ({itemsCount = 3, ...storyProps}: InfinityScrollStoryProps) => {
    const {
        data: items = [],
        onFetchMore,
        canFetchMore,
        isLoading,
    } = useInfinityFetch<Entity>(itemsCount, true);

    const list = useNormalizedList({items});

    return (
        <Flex direction="column">
            <UIKitNormalizedList<Entity>
                {...storyProps}
                size="l"
                list={list}
                mapItemDataToContentProps={mapEntityToContentProps}
                multiple={multiple}
                renderItem={({props, context: {isLastItem, childrenIds}}) => {
                    const {content, selectionViewType, selected, disabled, ...shellProps} = props;

                    const node = (
                        <NormalizedListItemView
                            {...shellProps}
                            selected={selected}
                            disabled={disabled}
                            selectionViewType={selectionViewType}
                            content={
                                <NormalizedListItemViewContent
                                    {...content}
                                    hasSelectionIcon={selectionViewType === 'multiple'}
                                    selected={selected}
                                    disabled={disabled}
                                    renderExpandIcon={NormalizedListItemExpandIcon}
                                    endSlot={
                                        childrenIds ? (
                                            <Label>{childrenIds.length}</Label>
                                        ) : undefined
                                    }
                                />
                            }
                        />
                    );

                    if (isLastItem) {
                        return (
                            <IntersectionContainer
                                onIntersect={canFetchMore ? onFetchMore : undefined}
                            >
                                {node}
                            </IntersectionContainer>
                        );
                    }

                    return node;
                }}
                renderContainer={RenderVirtualizedContainer}
            />
            {isLoading && (
                <Flex justifyContent="center" className={spacing({py: 2})}>
                    <Loader size="m" />
                </Flex>
            )}
        </Flex>
    );
};
