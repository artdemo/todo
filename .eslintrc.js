module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
  plugins: ['import', 'jsx-a11y', 'react', 'react-hooks'],
  extends: ['eslint:recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
  rules: {
    'react/prop-types': 'error',
    'no-shadow': 'off',
    'no-underscore-dangle': [
      2,
      { allow: ['_sort', '_start', '_limit', '_order'] },
    ],
    'react-hooks/exhaustive-deps': 'off',
  },
};
