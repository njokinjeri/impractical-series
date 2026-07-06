import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 1. Global Ignores (Replaces .eslintignore)
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  }
);
