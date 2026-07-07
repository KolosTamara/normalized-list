import baseConfig from '@gravity-ui/eslint-config';
import prettierConfig from '@gravity-ui/eslint-config/prettier';
import {defineConfig} from 'eslint/config';
import globals from 'globals';

export default defineConfig([
    ...baseConfig,
    ...prettierConfig,
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
