module.exports = {
  extends: ['./config/eslint.js', 'airbnb', 'plugin:flowtype/recommended'],
  plugins: ['flowtype', 'mocha'],
  rules: {
    'default-case': 'off',

    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'global-require': 'off',
    camelcase: 'off',
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'max-len': 'off',
    indent: 'off',
    'react/jsx-indent': 'off',
    'no-confusing-arrow': 'off',
    'no-mixed-operators': 'off',

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

    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'warn',

    // Until this is fixed (child props in objects stop erroring)
    // this is turned off.
    'react/no-unused-prop-types': 'off',

    'react/jsx-filename-extension': 'off',
    'react/jsx-sort-props': 'off',
    'react/sort-comp': [
      'error',
      {
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
      },
    ],

    'mocha/no-exclusive-tests': 'error',
  },
  settings: {
    'import/resolver': 'webpack',
  },
  globals: {
    ReduxThunk: true,
    ReduxState: true,
    GW2A_EMBED_OPTIONS: true,
    __DEVELOPMENT__: true,
    __webpack_public_path__: true,
    before: true,
    after: true,
    beforeEach: true,
    afterEach: true,
    describe: true,
    it: true,
    context: true,
    proxyquire: true,
    expect: true,
    sinon: true,
    xit: true,
    GetState: true,
  },
};
