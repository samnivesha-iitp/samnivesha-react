const path = require("path");
const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const Visualizer = require("webpack-visualizer-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    }
    if (dev) {
      const sassRules = {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      };
      appConfig.plugins = [
        ...appConfig.plugins,
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css",
        }),
      ];
      appConfig.module.rules = [...config.module.rules, sassRules];
    }
    if (target === "node" && !dev) {
      const serverEntry = path.resolve(__dirname, "src", "server");
      appConfig.entry[0] = serverEntry;
    }
    if (target == "web" && !dev) {
      const webEntry = path.resolve(__dirname, "src", "web", "client");
      appConfig.entry.client = webEntry;
      appConfig.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
              name: "vendor",
              chunks: "initial",
            },
          },
        },
      };
      // appConfig.plugins = [...appConfig.plugins, new BundleAnalyzerPlugin(), new Visualizer()];
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
