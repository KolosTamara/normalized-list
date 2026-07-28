import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {ListItemView} from '../ListItemView';

export default {
    title: 'Lab/useNormalizedList/ListItemView',
    component: ListItemView,
} as Meta<typeof ListItemView>;

type Story = StoryObj<typeof ListItemView>;

export const Default: Story = {
    args: {
        id: 'demo',
        size: 'l',
        selectionViewType: 'multiple',
        content: {title: 'List item', subtitle: 'Subtitle'},
    },
};

export const Selected: Story = {
    args: {
        ...Default.args,
        selected: true,
    },
};
