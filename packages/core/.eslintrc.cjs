module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [

    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "react-refresh"],
  rules: {
    // 通用规则
    'max-len': ['error', { code: 100 }],
    'semi': ['error', 'always'],
    '@typescript-eslint/no-explicit-any': ['warn'],
    "no-console": ["warn"],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-trailing-spaces': 'error',

    // React 规则
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
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

