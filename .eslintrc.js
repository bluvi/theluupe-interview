module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  plugins: ['react-hooks', 'module-resolver', ],
  env: {
    commonjs: true,
    es2020: true,
    browser: true,
  },
  globals: {
    fetch: false,
    window: false,
  },
  parserOptions: {
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-underscore-dangle': 'off',
    'consistent-return': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'warn',
    'jsx-a11y/img-redundant-alt': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/forbid-prop-types': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'warn',
    'module-resolver/use-alias': 'warn',
    'import/extensions': 'warn',
  },
  // TODO: remove this when prop-types are removed
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
      ],
      rules: {
        'react/prop-types': 0,
        'no-use-before-define': 0,
        'import/extensions': 0,
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error'
      },
    }
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      'babel-module': {},
      'typescript': {},
    },
  },
};
