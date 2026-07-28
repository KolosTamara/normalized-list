import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {NormalizedList} from '../NormalizedList';

import {DefaultStory} from './DefaultStory';

export default {
    title: 'Lab/NormalizedList',
    component: NormalizedList,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {id: 'color-contrast', enabled: false},
                    {id: 'aria-input-field-name', enabled: false},
                    {id: 'duplicate-id', enabled: false, selector: 'defs'},
                ],
            },
        },
    },
} as Meta;

type DefaultStoryObj = StoryObj<typeof DefaultStory>;

export const Default: DefaultStoryObj = {
    render: DefaultStory,
};
