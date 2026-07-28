import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {NormalizedListItemExpandIcon} from '../NormalizedListItemExpandIcon';

export default {
    title: 'Lab/UIKit/NormalizedListItemExpandIcon',
    component: NormalizedListItemExpandIcon,
} as Meta<typeof NormalizedListItemExpandIcon>;

type Story = StoryObj<typeof NormalizedListItemExpandIcon>;

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
