module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: '.',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {tsconfig: './tsconfig.test.json'}],
    },
    moduleNameMapper: {
        '\\.(css|scss)$': 'jest-transform-css',
    },
    transformIgnorePatterns: ['node_modules/(?!(@gravity-ui)/)'],
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/__stories__/**/*', '!**/*/*.stories.{ts,tsx}'],
    testMatch: ['**/*.test.[jt]s?(x)'],
};
