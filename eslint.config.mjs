import baseConfig from '@gravity-ui/eslint-config';
import clientConfig from '@gravity-ui/eslint-config/client';
import prettierConfig from '@gravity-ui/eslint-config/prettier';
import {defineConfig} from 'eslint/config';
import globals from 'globals';

export default defineConfig([
    ...baseConfig,
    ...clientConfig,
    ...prettierConfig,
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        ignores: ['build', 'storybook-static'],
    },
    {
        files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
    {
        files: ['**/*.js', '!src/**/*'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
]);
