import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['*.config.{js,ts,mjs}', 'webpack.*.js'],
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-commonjs': 'off'
    }
  }
];