import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {UIKitNormalizedSelect} from '../UIKitNormalizedSelect';

import {DefaultExample} from './DefaultExample';
import {ErrorStateExample} from './ErrorStateExample';
import {InfinityScrollExample} from './InfinityScrollExample';
import {WithDisabledElementsExample} from './WithDisabledElementsExample';
import {WithDndListExample} from './WithDndListExample';
import {WithFiltrationAndControlsExample} from './WithFiltrationAndControlsExample';
import {WithGroupSelectionControlledStateAndCustomIconExample} from './WithGroupSelectionControlledStateAndCustomIcon';
import {WithItemLinksAndActionsExample} from './WithItemLinksAndActionsExample';

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
    title: 'Lab/UIKit/UIKitNormalizedSelect',
    component: UIKitNormalizedSelect,
} as Meta;

type DefaultStoryObj = StoryObj<typeof DefaultExample>;
type ErrorStateStoryObj = StoryObj<typeof ErrorStateExample>;
type InfinityScrollStoryObj = StoryObj<typeof InfinityScrollExample>;
type WithDisabledElementsStoryObj = StoryObj<typeof WithDisabledElementsExample>;
type WithDndListStoryObj = StoryObj<typeof WithDndListExample>;
type WithFiltrationAndControlsStoryObj = StoryObj<typeof WithFiltrationAndControlsExample>;
type WithItemLinksAndActionsStoryObj = StoryObj<typeof WithItemLinksAndActionsExample>;
type WithGroupSelectionStoryObj = StoryObj<
    typeof WithGroupSelectionControlledStateAndCustomIconExample
>;

export const Default: DefaultStoryObj = {
    render: DefaultExample,
    args: {size: 'l', itemsCount: 5, multiple: true},
    parameters: a11yBasic,
};

export const ErrorState: ErrorStateStoryObj = {
    render: ErrorStateExample,
    args: {size: 'l'},
    parameters: a11yBasic,
};

export const InfinityScroll: InfinityScrollStoryObj = {
    render: InfinityScrollExample,
    args: {size: 'l', itemsCount: 5},
    parameters: a11yBasic,
};

export const WithDisabledElements: WithDisabledElementsStoryObj = {
    render: WithDisabledElementsExample,
    args: {size: 'l'},
    parameters: a11yBasic,
};

export const WithDndList: WithDndListStoryObj = {
    render: WithDndListExample,
    args: {size: 'l'},
    parameters: a11yBasic,
};

export const WithFiltrationAndControls: WithFiltrationAndControlsStoryObj = {
    render: WithFiltrationAndControlsExample,
    args: {size: 'l', itemsCount: 10},
    parameters: a11yBasic,
};

export const WithItemLinksAndActions: WithItemLinksAndActionsStoryObj = {
    render: WithItemLinksAndActionsExample,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {id: 'button-name', enabled: false},
                    {id: 'color-contrast', enabled: false},
                    {id: 'link-name', enabled: false},
                ],
            },
        },
    },
};

export const WithGroupSelectionControlledStateAndCustomIcon: WithGroupSelectionStoryObj = {
    render: WithGroupSelectionControlledStateAndCustomIconExample,
    args: {itemsCount: 5},
    parameters: a11yBasic,
};
