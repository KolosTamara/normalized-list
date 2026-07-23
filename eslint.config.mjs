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
    {
        // Core must stay UIKit-agnostic. UIKit usage belongs in src/uikit (and stories).
        files: ['src/components/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}'],
        ignores: ['src/components/**/__stories__/**'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: '@gravity-ui/uikit',
                            message:
                                'Core code must not depend on @gravity-ui/uikit. Put UIKit-dependent code in src/uikit.',
                        },
                    ],
                    patterns: [
                        {
                            group: ['@gravity-ui/uikit/*'],
                            message:
                                'Core code must not depend on @gravity-ui/uikit. Put UIKit-dependent code in src/uikit.',
                        },
                        {
                            // Relative imports to src/uikit only (does not match @gravity-ui/uikit).
                            regex: '^(\\.\\./)+uikit(/.*)?$',
                            message:
                                'Do not import the UIKit layer from core. Use src/uikit only from the uikit entry or stories.',
                        },
                    ],
                },
            ],
        },
    },
]);
