module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    quotes: ['error', 'single'],
    semi: [2, 'never'],
    'no-console': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    eqeqeq: 'off',
    'handle-callback-err': 'error',
    'space-infix-ops': 'error',
    'keyword-spacing': ['error', { after: true }],
    'rest-spread-spacing': ['error', 'never'],
    'no-extra-boolean-cast': 'warn',
    'comma-spacing': ['error', { before: false, after: true }],
    'computed-property-spacing': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'key-spacing': [
      'error',
      {
        afterColon: true
      }
    ],
    'object-curly-spacing': [
      'error',
      'always',
      {
        objectsInObjects: true
      }
    ]
  }
}
