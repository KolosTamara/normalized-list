import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {TreeListItemExpandIcon} from '../TreeListItemExpandIcon';

export default {
    title: 'Lab/UIKit/TreeListItemExpandIcon',
    component: TreeListItemExpandIcon,
} as Meta<typeof TreeListItemExpandIcon>;

type Story = StoryObj<typeof TreeListItemExpandIcon>;

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
