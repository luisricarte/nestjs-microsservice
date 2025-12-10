// @ts-check
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'], // necessário p/ type-aware
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  // desabilita regras conflitantes de formatação
  prettier,

  // ativa o plugin prettier
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
    },
  },
);
