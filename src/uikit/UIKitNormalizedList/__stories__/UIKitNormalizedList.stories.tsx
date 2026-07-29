import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {UIKitNormalizedList} from '../UIKitNormalizedList';

import {DefaultStory} from './stories/DefaultStory';
import {InfinityScrollStory} from './stories/InfinityScrollStory';
import {WithDisabledElementsStory} from './stories/WithDisabledElementsStory';
import {WithDndListStory} from './stories/WithDndListStory';
import {WithFiltrationAndControlsStory} from './stories/WithFiltrationAndControlsStory';
import {WithGroupSelectionAndCustomIconStory} from './stories/WithGroupSelectionAndCustomIconStory';
import {WithItemLinksAndActionsStory} from './stories/WithItemLinksAndActionsStory';

const a11yBasic = {
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
};

export default {
    title: 'normalized-list/UIKit/UIKitNormalizedList',
    component: UIKitNormalizedList,
} as Meta;

type DefaultStoryObj = StoryObj<typeof DefaultStory>;
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
    parameters: a11yBasic,
};

export const WithDisabledElements: WithDisabledElementsStoryObj = {
    render: WithDisabledElementsStory,
    parameters: a11yBasic,
};

export const WithDndList: WithDndListStoryObj = {
    render: WithDndListStory,
    parameters: a11yBasic,
};

export const WithFiltrationAndControls: WithFiltrationAndControlsStoryObj = {
    render: WithFiltrationAndControlsStory,
    parameters: a11yBasic,
};

export const WithGroupSelectionAndCustomIcon: WithGroupSelectionAndCustomIconStoryObj = {
    render: WithGroupSelectionAndCustomIconStory,
    parameters: a11yBasic,
};

export const WithItemLinksAndActions: WithItemLinksAndActionsStoryObj = {
    render: WithItemLinksAndActionsStory,
    parameters: a11yBasic,
};

export const InfinityScroll: InfinityScrollStoryObj = {
    render: InfinityScrollStory,
    parameters: a11yBasic,
};
