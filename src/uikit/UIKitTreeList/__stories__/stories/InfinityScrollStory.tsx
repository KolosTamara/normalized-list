import {Flex, Label, Loader, spacing} from '@gravity-ui/uikit';

import {useList} from '../../../../components/useList';
import {IntersectionContainer} from '../../../../components/useList/__stories__/components/IntersectionContainer/IntersectionContainer';
import {useInfinityFetch} from '../../../../components/useList/__stories__/utils/useInfinityFetch';
import {UIKitTreeList} from '../../../UIKitTreeList';
import type {UIKitTreeListProps as TreeListProps} from '../../../UIKitTreeList';
import {RenderVirtualizedContainer} from '../components/RenderVirtualizedContainer';
import {TreeListItemExpandIcon, TreeListItemView, TreeListItemViewContent} from '../../../../uikit';

interface Entity {
    title: string;
}

const mapEntityToContentProps: TreeListProps<Entity>['mapItemDataToContentProps'] = (item) => item;

export interface InfinityScrollStoryProps extends Omit<
    TreeListProps<Entity>,
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

    const list = useList({items});

    return (
        <Flex direction="column">
            <UIKitTreeList<Entity>
                {...storyProps}
                size="l"
                list={list}
                mapItemDataToContentProps={mapEntityToContentProps}
                multiple={multiple}
                renderItem={({props, context: {isLastItem, childrenIds}}) => {
                    const {content, selectionViewType, selected, disabled, ...shellProps} = props;

                    const node = (
                        <TreeListItemView
                            {...shellProps}
                            selected={selected}
                            disabled={disabled}
                            selectionViewType={selectionViewType}
                            content={
                                <TreeListItemViewContent
                                    {...content}
                                    hasSelectionIcon={selectionViewType === 'multiple'}
                                    selected={selected}
                                    disabled={disabled}
                                    renderExpandIcon={TreeListItemExpandIcon}
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
