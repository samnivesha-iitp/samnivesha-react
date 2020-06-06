const LoadableBabelPlugin = require("@loadable/babel-plugin");
const babelPresetRazzle = require("razzle/babel");

// custom modification
const { modify } = require("./webpack-config-modified");

module.exports = {
  modify,
  modifyBabelOptions: () => ({
    babelrc: false,
    presets: [babelPresetRazzle],
    plugins: [LoadableBabelPlugin],
  }),
};
