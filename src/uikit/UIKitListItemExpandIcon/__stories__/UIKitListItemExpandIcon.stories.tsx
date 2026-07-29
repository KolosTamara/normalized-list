import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {UIKitListItemExpandIcon} from '../UIKitListItemExpandIcon';

export default {
    title: 'normalized-list/UIKit/UIKitListItemExpandIcon',
    component: UIKitListItemExpandIcon,
} as Meta<typeof UIKitListItemExpandIcon>;

type Story = StoryObj<typeof UIKitListItemExpandIcon>;

export const Expanded: Story = {
    args: {
        expanded: true,
        behavior: 'state',
    },
};

export const Collapsed: Story = {
    args: {
        expanded: false,
        behavior: 'state',
    },
};
