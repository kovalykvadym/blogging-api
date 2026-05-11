import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  // Ignored files
  {
    ignores: ['dist', 'node_modules', 'coverage'],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (strict layer)
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  // Main TypeScript project rules
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Code correctness
      'no-console': 'off', // можна змінити на warn у prod
      'no-unused-vars': 'off', // використовуємо TS варіант нижче

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/explicit-function-return-type': 'off',

      '@typescript-eslint/consistent-type-imports': 'error',

      '@typescript-eslint/no-explicit-any': 'warn',

      // Code safety
      'no-implicit-coercion': 'error',
      'no-empty': 'error',
      'no-case-declarations': 'error',

      // Best practices
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      // Imports hygiene (basic)
      'no-duplicate-imports': 'error',
    },
  },

  // Prettier integration (must be last)
  prettier,
];
