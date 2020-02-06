module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard',
    'standard-react',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 'first'
      }
    ]
  }
}
