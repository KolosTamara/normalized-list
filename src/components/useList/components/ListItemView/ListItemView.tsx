import * as React from 'react';

import {LIST_ITEM_DATA_ATR, modToHeight} from '../../constants';
import type {ListItemViewProps} from '../../types';

import {ListItemViewContent, isListItemContentPropsGuard} from '../fallback/ListItemViewContent';
import {b} from './styles';

type ListItemViewRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type ListItemViewPropsWithTypedAttrs<T extends React.ElementType> = ListItemViewProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof ListItemViewProps<T>>;

export const ListItemView = React.forwardRef(function ListItemView<
    T extends React.ElementType = 'li',
>(
    {
        id,
        as: asProps,
        size = 'm',
        active,
        selected,
        disabled,
        selectionViewType = 'multiple',
        activeOnHover: propsActiveOnHover,
        className,
        height,
        dragging,
        style: propsStyle,
        content,
        role = 'option',
        onClick: _onClick,
        ...rest
    }: ListItemViewProps<T>,
    ref?: ListItemViewRef<T>,
) {
    const Tag: React.ElementType = asProps || 'li';
    const onClick = disabled ? undefined : _onClick;
    const activeOnHover =
        typeof propsActiveOnHover === 'boolean' ? propsActiveOnHover : Boolean(onClick);
    const style = {
        minHeight: `${
            height ??
            modToHeight[size][
                Number(Boolean(isListItemContentPropsGuard(content) ? content?.subtitle : false))
            ]
        }px`,
        ...propsStyle,
    };

    return (
        <Tag
            {...{[LIST_ITEM_DATA_ATR]: id}}
            role={role}
            aria-selected={selected}
            onClick={onClick}
            className={b(
                {
                    active: dragging || active,
                    selected: selected && selectionViewType === 'single',
                    activeOnHover,
                    radius: size,
                    size,
                    dragging,
                    clickable: Boolean(onClick),
                },
                className,
            )}
            style={style}
            ref={ref}
            {...rest}
        >
            {isListItemContentPropsGuard(content) ? (
                <ListItemViewContent
                    {...content}
                    hasSelectionIcon={selectionViewType === 'multiple'}
                    selected={selected}
                    disabled={disabled}
                />
            ) : (
                content
            )}
        </Tag>
    );
}) as <C extends React.ElementType = 'li'>({
    ref,
    ...props
}: ListItemViewPropsWithTypedAttrs<C> & {ref?: ListItemViewRef<C>}) => React.ReactElement;
