const path = require("path");
const LoadableWebpackPlugin = require("@loadable/webpack-plugin");

module.exports = {
  modify: (config, { target, dev }) => {
    const appConfig = Object.assign({}, config);
    if (target === "web") {
      const filename = path.resolve(__dirname, "build");

      appConfig.plugins = [
        ...appConfig.plugins,
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        }),
      ];
      appConfig.output.filename = dev ? "static/js/[name].js" : "static/js/[name].[chunkhash:8].js";

      appConfig.node = { fs: "empty" }; // fix "Cannot find module 'fs'" problem.

      appConfig.optimization = Object.assign({}, appConfig.optimization, {
        runtimeChunk: true,
        splitChunks: {
          chunks: "all",
          name: dev,
        },
      });
    }
    if (target === "node" && !dev) {
      const serverEntry = path.resolve(__dirname, "src", "server");
      appConfig.entry[0] = serverEntry;
    }
    if (target == "web" && !dev) {
      const webEntry = path.resolve(__dirname, "src", "web", "client");
      appConfig.entry.client = webEntry;
    }
    if (target === "node" && dev) {
      const serverEntry = path.resolve(__dirname, "src", "server");
      appConfig.entry[2] = serverEntry;
    }
    if (target == "web" && dev) {
      const webEntry = path.resolve(__dirname, "src", "web", "client");
      appConfig.entry.client[1] = webEntry;
    }
    return appConfig;
  },
};
