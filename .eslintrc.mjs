import oxlint from 'eslint-plugin-oxlint';

export default {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        ...oxlint.configs['flat/recommended'], // oxlint should be the last one
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'prettier/prettier': 'off',
        'react/jsx-closing-tag-location': 'off',
        'no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        '@reolink/general/disable-json-parse-method': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn', // or "error"
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'forbid',
            },
            {
                selector: 'import',
                format: ['PascalCase', 'camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                modifiers: ['unused'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            },
            {
                selector: 'memberLike',
                modifiers: ['protected'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            },
            {
                selector: 'memberLike',
                modifiers: ['private', 'static'],
                format: [],
                custom: {
                    regex: '^_\\$[^_]',
                    match: true,
                },
            },
            {
                selector: 'memberLike',
                modifiers: ['protected', 'static'],
                format: [],
                custom: {
                    regex: '^_\\$[^_]',
                    match: true,
                },
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE'],
            },
            {
                selector: 'objectLiteralProperty',
                format: [],
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'variable',
                modifiers: ['const'],
                format: ['UPPER_CASE', 'PascalCase', 'camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'typeParameter',
                format: ['PascalCase'],
                prefix: ['T'],
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
            {
                selector: 'class',
                format: ['PascalCase'],
            },
            {
                selector: 'enum',
                format: ['PascalCase'],
                custom: {
                    regex: '^E[A-Z]',
                    match: true,
                },
            },
            {
                selector: 'typeAlias',
                format: ['PascalCase'],
            },
        ],
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/consistent-type-exports': 'warn',

        // 通用规则
        'max-len': ['error', { code: 100 }],
        'semi': ['error', 'always'],
        '@typescript-eslint/no-explicit-any': ['warn'],

        // React 规则
        'react/jsx-uses-react': 'off', // React 17+ 不需要引入 React
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off', // 使用 TypeScript 检查 props 类型
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],

        // React 风格规则
        'react/jsx-boolean-value': ['error', 'always'],
        'react/jsx-closing-bracket-location': ['error'],
        'react/jsx-curly-newline': [
            'error',
            { multiline: 'consistent', singleline: 'consistent' },
        ],
        'react/jsx-curly-spacing': [
            'error',
            {
                when: 'always',
                spacing: {
                    objectLiterals: 'never',
                    attributes: true,
                    children: true,
                    allowMultiline: true,
                },
            },
        ],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-indent': [
            'error',
            4,
            {
                checkAttributes: true,
                indentLogicalExpressions: true,
            },
        ],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-key': ['error', { checkFragmentShorthand: true }],
        'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'always' }],
        'react/jsx-no-comment-textnodes': ['error'],
        'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
        'react/jsx-no-target-blank': [
            'error',
            {
                allowReferrer: false,
                enforceDynamicLinks: 'always',
                links: true,
                forms: true,
            },
        ],
        'react/jsx-no-undef': ['error'],
        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
        'react/jsx-pascal-case': ['error'],
        'react/jsx-props-no-multi-spaces': ['error'],
        'react/jsx-tag-spacing': [
            'error',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
                beforeClosing: 'never',
            },
        ],
        'react/jsx-uses-vars': ['error'],
        'react/jsx-wrap-multilines': [
            'error',
            {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
            },
        ]
    },
};
