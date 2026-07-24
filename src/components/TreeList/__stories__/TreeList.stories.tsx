import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {TreeList} from '../TreeList';

import {DefaultStory} from './DefaultStory';

export default {
    title: 'Lab/TreeList',
    component: TreeList,
} as Meta;

type DefaultStoryObj = StoryObj<typeof DefaultStory>;

export const Default: DefaultStoryObj = {
    render: DefaultStory,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                    {
                        id: 'aria-input-field-name',
                        enabled: false,
                    },
                    {
                        id: 'duplicate-id',
                        enabled: false,
                        selector: 'defs',
                    },
                ],
            },
        },
    },
};
