import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2017,
        ...globals.node,
      },
    },
    ignores: ['node_modules/**', 'assests/**', '.prettierrc', 'eslint.config.js'],
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
];
