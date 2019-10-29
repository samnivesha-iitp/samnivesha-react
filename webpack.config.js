const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const WebpackChunkHash = require("webpack-chunk-hash");
const isDev = process.env.NODE_ENV !== "production";
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const nodeExternals = require("webpack-node-externals");
module.exports = {
  resolve: {
    modules: [path.resolve("./src"), path.resolve("./node_modules")]
  },
  entry: {
    app: ["./src/browser/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "public", "bundles"),
    filename: isDev ? "[name].js" : "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDev ? "[id].css" : "[id].[hash].css"
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    function() {
      this.plugin("done", stats => {
        let gVars = {};
        try {
          gVars = require("./.reactful.json");
        } catch (err) {
          // do nothing
        }
        fs.writeFileSync(
          path.resolve(".chunk.json"),
          JSON.stringify(
            Object.assign({}, gVars, stats.toJson()["assetsByChunkName"]),
            null,
            2
          )
        );
      });
    }
    // new HtmlWebpackPlugin({
    //   template: path.join("./views/index.ejs")
    // })
  ]
};
