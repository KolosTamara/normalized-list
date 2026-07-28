import type {Decorator, Preview} from '@storybook/react-webpack5';
import {ThemeProvider} from '@gravity-ui/uikit';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import {DocsDecorator} from './DocsDecorator/DocsDecorator';

const withTheme: Decorator = (Story) => (
    <ThemeProvider theme="light">
        <div className="g-root g-root_theme_light">
            <Story />
        </div>
    </ThemeProvider>
);

const preview: Preview = {
    decorators: [withTheme],
    parameters: {
        docs: {
            container: DocsDecorator,
        },
    },
};

export default preview;
