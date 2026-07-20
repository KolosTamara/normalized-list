import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Component} from '..';
import type {ComponentProps} from '..';

export default {
    title: 'Component',
    component: Component,
} satisfies Meta<typeof Component>;

type Story = StoryObj<ComponentProps>;

export const Playground: Story = {
    name: 'Component',
};
