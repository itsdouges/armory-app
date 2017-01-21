module.exports = {
  extends: [
    './config/eslint.js',
    'airbnb',
    'plugin:flowtype/recommended',
  ],
  plugins: [
    'flowtype',
  ],
  'rules': {
    'space-before-function-paren': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'default-case': 'off',
    'global-require': 'off',
    'camelcase': 'off',
    'arrow-parens': ['error', 'always'],
    'max-len': 'warn',

    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'no-duplicate-imports': 'off',
    'no-prototype-builtins': 'off',

    'import/no-dynamic-require': 'off',
    'import/first': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/no-duplicates': 'error',
    'import/extensions': 'off',

    'react/forbid-prop-types': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/jsx-sort-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/sort-comp': ['error', {
      order: [
        'type-annotations',
        'static-methods',
        'lifecycle',
        '/^on.+$/',
        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        'everything-else',
        '/^render.+$/',
        'render',
      ],
    }],

    'react/require-default-props': 'warn',
  },
  settings: {
    'import/resolver': 'webpack',
  },
  globals: {
    __DEVELOPMENT__: true,
    ReduxThunk: true,
  },
};
