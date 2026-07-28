import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {UIKitListItemView} from '../UIKitListItemView';
import {UIKitListItemViewContent} from '../../UIKitListItemViewContent';

export default {
    title: 'normalized-list/UIKit/UIKitListItemView',
    component: UIKitListItemView,
} as Meta<typeof UIKitListItemView>;

type Story = StoryObj<typeof UIKitListItemView>;

export const Default: Story = {
    args: {
        id: 'demo',
        size: 'l',
        selectionViewType: 'multiple',
        content: (
            <UIKitListItemViewContent
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
        content: <UIKitListItemViewContent title="Selected" hasSelectionIcon selected />,
    },
};
