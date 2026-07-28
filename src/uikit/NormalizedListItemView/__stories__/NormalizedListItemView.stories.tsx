import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {NormalizedListItemView} from '../NormalizedListItemView';
import {NormalizedListItemViewContent} from '../../NormalizedListItemViewContent';

export default {
    title: 'Lab/UIKit/NormalizedListItemView',
    component: NormalizedListItemView,
} as Meta<typeof NormalizedListItemView>;

type Story = StoryObj<typeof NormalizedListItemView>;

export const Default: Story = {
    args: {
        id: 'demo',
        size: 'l',
        selectionViewType: 'multiple',
        content: (
            <NormalizedListItemViewContent
                title="Themed list item"
                subtitle="UIKit theme"
                hasSelectionIcon
            />
        ),
    },
};

export const Selected: Story = {
    args: {
        ...Default.args,
        selected: true,
        content: <NormalizedListItemViewContent title="Selected" hasSelectionIcon selected />,
    },
};
