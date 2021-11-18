module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    jest: true,
  },
  extends: ["plugin:vue/essential", "standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: "@typescript-eslint/parser",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "comma-dangle": "off",
    "space-before-function-paren": "off",
    "vue/multi-word-component-names": "off",
    indent: "off",
    "no-unused-vars": "off",
  },
};
