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
  extends: ['eslint:recommended', 'prettier', 'airbnb', 'airbnb/hooks'],
};