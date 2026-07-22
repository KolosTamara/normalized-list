import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {TreeSelect} from '../TreeSelect';

import {DefaultErrorStateExample} from './DefaultErrorStateExample';
import {InfinityScrollExample} from './InfinityScrollExample';
import {UIKitErrorStateExample} from './UIKitErrorStateExample';
import {WithDisabledElementsExample} from './WithDisabledElementsExample';
import {WithDndListExample} from './WithDndListExample';
import {WithFiltrationAndControlsExample} from './WithFiltrationAndControlsExample';
import {WithGroupSelectionControlledStateAndCustomIconExample} from './WithGroupSelectionControlledStateAndCustomIcon';
import {WithItemLinksAndActionsExample} from './WithItemLinksAndActionsExample';

export default {
    title: 'Lab/TreeSelect',
    component: TreeSelect,
} as Meta;

type ErrorStateStoryObj = StoryObj<typeof DefaultErrorStateExample>;
type InfinityScrollStoryObj = StoryObj<typeof InfinityScrollExample>;
type UIKitErrorStateStoryObj = StoryObj<typeof UIKitErrorStateExample>;
type WithDisabledElementsStoryObj = StoryObj<typeof WithDisabledElementsExample>;
type WithDndListStoryObj = StoryObj<typeof WithDndListExample>;
type WithFiltrationAndControlsStoryObj = StoryObj<typeof WithFiltrationAndControlsExample>;
type WithItemLinksAndActionsStoryObj = StoryObj<typeof WithItemLinksAndActionsExample>;
type WithGroupSelectionStoryObj = StoryObj<
    typeof WithGroupSelectionControlledStateAndCustomIconExample
>;

export const ErrorState: ErrorStateStoryObj = {
    render: DefaultErrorStateExample,
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

export const InfinityScroll: InfinityScrollStoryObj = {
    render: InfinityScrollExample,
    args: {
        size: 'l',
        itemsCount: 5,
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

export const WithDisabledElements: WithDisabledElementsStoryObj = {
    render: WithDisabledElementsExample,
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

export const WithDndList: WithDndListStoryObj = {
    render: WithDndListExample,
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

export const WithFiltrationAndControls: WithFiltrationAndControlsStoryObj = {
    render: WithFiltrationAndControlsExample,
    args: {
        size: 'l',
        itemsCount: 10,
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

export const WithItemLinksAndActions: WithItemLinksAndActionsStoryObj = {
    render: WithItemLinksAndActionsExample,
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
                    {
                        id: 'link-name',
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export const WithGroupSelectionControlledStateAndCustomIcon: WithGroupSelectionStoryObj = {
    render: WithGroupSelectionControlledStateAndCustomIconExample,
    args: {
        itemsCount: 5,
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
