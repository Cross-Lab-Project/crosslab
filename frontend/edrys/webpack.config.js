// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "http-dist"),
    devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'
  },
  devtool: 'source-map',
  devServer: {
    liveReload: false,
    static: "./http-dist",
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader","source-map-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["css-loader", "postcss-loader"],
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      "url": false,
      "events": require.resolve("events/")
    }
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
