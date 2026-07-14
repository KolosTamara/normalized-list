import {ThemeProvider} from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
export const decorators = [
    (Story) => (
        <ThemeProvider theme="light">
            <div className="g-root g-root_theme_light">
                <Story />
            </div>
        </ThemeProvider>
    ),
];
