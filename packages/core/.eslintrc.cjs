module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "react-refresh"],
  rules: {
    // 通用规则
    "max-len": ["error", { code: 100 }],
    semi: ["error", "always"],
    "@typescript-eslint/no-explicit-any": ["warn"],
    "no-console": ["warn"],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "no-trailing-spaces": "error",
    "react/jsx-max-props-per-line": ["error", { maximum: 1, when: "always" }],
    "react/prop-types": "off",
  },
  overrides: [
    {
      files: ["**/*.stories.tsx", "**/*.stories.ts"],
      rules: {
        "no-console": "off",
      },
    },
  ],
};
