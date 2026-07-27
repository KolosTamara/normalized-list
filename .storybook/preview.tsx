import type {Decorator} from '@storybook/react-webpack5';
import {ThemeProvider} from '@gravity-ui/uikit';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import './docs.scss';

export const decorators: Decorator[] = [
    (Story) => (
        <ThemeProvider theme="light">
            <div className="g-root g-root_theme_light">
                <Story />
            </div>
        </ThemeProvider>
    ),
];
