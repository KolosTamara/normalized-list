import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {TreeList} from '../TreeList';

import {DefaultStory} from './stories/DefaultStory';
import {UIKitRecipeStory} from './stories/UIKitRecipeStory';

export default {
    title: 'Lab/TreeList',
    component: TreeList,
} as Meta;

type DefaultStoryObj = StoryObj<typeof DefaultStory>;
type UIKitRecipeStoryObj = StoryObj<typeof UIKitRecipeStory>;

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

export const UIKitRecipe: UIKitRecipeStoryObj = {
    render: UIKitRecipeStory,
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
