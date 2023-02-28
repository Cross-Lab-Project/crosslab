"use strict";
// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
const isProduction = process.env.NODE_ENV == "production";
const config = {
  entry: "./src-web/index.ts",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "http-dist"),
    devtoolModuleFilenameTemplate: "file:///[absolute-resource-path]",
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.web.json",
            },
          },
          "source-map-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      url: false,
      events: require.resolve("events/"),
    },
  },
};
module.exports = () => {
  return config;
};
//# sourceMappingURL=webpack.config.js.map
