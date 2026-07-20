import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {TreeList} from '../TreeList';

import {DefaultStory} from './stories/DefaultStory';
import {InfinityScrollStory} from './stories/InfinityScrollStory';
import {UIKitRecipeStory} from './stories/UIKitRecipeStory';
import {WithDisabledElementsStory} from './stories/WithDisabledElementsStory';
import {WithDndListStory} from './stories/WithDndListStory';
import {WithFiltrationAndControlsStory} from './stories/WithFiltrationAndControlsStory';
import {WithGroupSelectionAndCustomIconStory} from './stories/WithGroupSelectionAndCustomIconStory';
import {WithItemLinksAndActionsStory} from './stories/WithItemLinksAndActionsStory';

export default {
    title: 'Lab/TreeList',
    component: TreeList,
} as Meta;

type DefaultStoryObj = StoryObj<typeof DefaultStory>;
type UIKitRecipeStoryObj = StoryObj<typeof UIKitRecipeStory>;
type WithDisabledElementsStoryObj = StoryObj<typeof WithDisabledElementsStory>;
type WithDndListStoryObj = StoryObj<typeof WithDndListStory>;
type WithFiltrationAndControlsStoryObj = StoryObj<typeof WithFiltrationAndControlsStory>;
type WithGroupSelectionAndCustomIconStoryObj = StoryObj<
    typeof WithGroupSelectionAndCustomIconStory
>;
type WithItemLinksAndActionsStoryObj = StoryObj<typeof WithItemLinksAndActionsStory>;
type InfinityScrollStoryObj = StoryObj<typeof InfinityScrollStory>;

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

export const WithDisabledElements: WithDisabledElementsStoryObj = {
    render: WithDisabledElementsStory,
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

export const WithDndList: WithDndListStoryObj = {
    render: WithDndListStory,
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

export const WithFiltrationAndControls: WithFiltrationAndControlsStoryObj = {
    render: WithFiltrationAndControlsStory,
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

export const WithGroupSelectionAndCustomIcon: WithGroupSelectionAndCustomIconStoryObj = {
    render: WithGroupSelectionAndCustomIconStory,
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

export const WithItemLinksAndActions: WithItemLinksAndActionsStoryObj = {
    render: WithItemLinksAndActionsStory,
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

export const InfinityScroll: InfinityScrollStoryObj = {
    render: InfinityScrollStory,
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
