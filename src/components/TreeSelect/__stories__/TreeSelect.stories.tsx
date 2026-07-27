import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {TreeSelect} from '../TreeSelect';

import {DefaultErrorStateExample} from './DefaultErrorStateExample';
import {DefaultExample} from './DefaultExample';

const a11yBasic = {
    a11y: {
        context: '#storybook-root',
        config: {
            rules: [
                {id: 'button-name', enabled: false},
                {id: 'color-contrast', enabled: false},
            ],
        },
    },
};

export default {
    title: 'Lab/TreeSelect',
    component: TreeSelect,
} as Meta;

type DefaultStoryObj = StoryObj<typeof DefaultExample>;
type ErrorStateStoryObj = StoryObj<typeof DefaultErrorStateExample>;

export const Default: DefaultStoryObj = {
    render: DefaultExample,
    args: {
        size: 'l',
        itemsCount: 5,
        multiple: true,
    },
    parameters: a11yBasic,
};

export const ErrorState: ErrorStateStoryObj = {
    render: DefaultErrorStateExample,
    args: {
        size: 'l',
    },
    parameters: a11yBasic,
};
