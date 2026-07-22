import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {TreeSelect} from '../TreeSelect';

import {ErrorStateExample} from './ErrorStateExample';
import {UIKitErrorStateExample} from './UIKitErrorStateExample';

export default {
    title: 'Lab/TreeSelect',
    component: TreeSelect,
} as Meta;

type ErrorStateStoryObj = StoryObj<typeof ErrorStateExample>;
type UIKitErrorStateStoryObj = StoryObj<typeof UIKitErrorStateExample>;

export const ErrorState: ErrorStateStoryObj = {
    render: ErrorStateExample,
    args: {
        size: 'l',
    },
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'button-name',
                        enabled: false,
                    },
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export const UIKitErrorState: UIKitErrorStateStoryObj = {
    render: UIKitErrorStateExample,
    args: {
        size: 'l',
    },
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'button-name',
                        enabled: false,
                    },
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
};
