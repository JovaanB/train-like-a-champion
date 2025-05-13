module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        'react-native/react-native': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react',
        'react-hooks',
        'react-native',
        '@typescript-eslint',
        'unused-imports',
        'import',
        'prettier',
    ],
    rules: {
        'prettier/prettier': 'warn',
        'react/react-in-jsx-scope': 'off', // pas nécessaire avec React 17+
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'warn',
        'unused-imports/no-unused-vars': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    { pattern: 'react', group: 'external', position: 'before' },
                    { pattern: '@/components/**', group: 'internal' },
                    { pattern: '@/stores/**', group: 'internal' },
                    { pattern: '@/types/**', group: 'internal' },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
