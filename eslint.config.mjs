import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const nodeGlobals = {
  __dirname: 'readonly',
  __filename: 'readonly',
  module: 'readonly',
  process: 'readonly',
  require: 'readonly',
};

export default [
  // 1. Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
    ],
  },

  // 2. ESLint recommended
  js.configs.recommended,

  // 2.5. Node.js config files
  {
    files: ['**/*.cjs', '**/*.js'],
    languageOptions: {
      globals: nodeGlobals,
    },
  },

  // 3. TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-undef': 'off',
    },
  },

  // 4. React (recommended + jsx-runtime)
  {
    files: ['**/*.tsx', '**/*.jsx'],
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // 5. React Hooks
  {
    files: ['**/*.tsx', '**/*.jsx'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // 6. JSX A11y
  {
    files: ['**/*.tsx', '**/*.jsx'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },

  // 7. Next.js (apps/client scope only)
  {
    files: ['apps/client/**/*.ts', 'apps/client/**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
    settings: {
      next: {
        rootDir: 'apps/client',
      },
    },
  },

  // 8. Perfectionist
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-enums': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'side-effect',
            'style',
          ],
          newlinesBetween: 1,
          type: 'natural',
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'natural',
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-objects': [
        'warn',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
    },
  },

  // 9. Prettier (must be last - disables conflicting rules)
  prettier,
];
