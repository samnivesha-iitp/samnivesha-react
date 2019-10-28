const path = require("path");
// const nodeExternals = require("webpack-node-externals");
module.exports = {
  entry: {
    app: ["./src/browser/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
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
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader" }]
      }
    ]
  }
};
