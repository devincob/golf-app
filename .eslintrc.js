// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: [
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'no-var': 0,//禁用var，用let和const代替
    'generator-star-spacing': 'off',
    'space-before-blocks': [0, 'always'],//不以新行开始的块{前面要不要有空格
    'space-before-function-paren': [0, 'always'],//函数定义时括号前面要不要有空
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    getApp: true,
    getPage: true,
    getCurrentPages: true
  }
}
