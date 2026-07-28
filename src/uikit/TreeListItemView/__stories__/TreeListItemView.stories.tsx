import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {TreeListItemView} from '../TreeListItemView';
import {TreeListItemViewContent} from '../../TreeListItemViewContent';

export default {
    title: 'Lab/UIKit/TreeListItemView',
    component: TreeListItemView,
} as Meta<typeof TreeListItemView>;

type Story = StoryObj<typeof TreeListItemView>;

export const Default: Story = {
    args: {
        id: 'demo',
        size: 'l',
        selectionViewType: 'multiple',
        content: (
            <TreeListItemViewContent
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
        content: <TreeListItemViewContent title="Selected" hasSelectionIcon selected />,
    },
};
