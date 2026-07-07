import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
    framework: '@storybook/react-webpack5',
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: [
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    {
                        test: /\.(css|scss)$/i,
                        use: ['style-loader', 'css-loader', 'sass-loader'],
                    },
                ],
            },
        },
        '@storybook/addon-webpack5-compiler-babel',
        '@storybook/addon-docs',
    ],
    core: {
        disableTelemetry: true,
    },
};

export default config;
