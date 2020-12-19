const path = require("path");
const slsWebpack = require("serverless-webpack");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const IncludeFolderPlugin = () => ({
  apply: compiler => {
    let name = compiler.options.output.path.split('/').pop();
    let config = Object.assign({ webpack: {} }, slsWebpack.lib.serverless.service.getFunction(name));

    if (config.webpack && config.webpack.include) {
      config.webpack.include.forEach((folder) => {
        new CopyWebpackPlugin([{ from: "./" + folder, to: folder }]).apply(compiler);
      });
    }

  }
});

module.exports = {
  entry: slsWebpack.lib.entries,
  mode: slsWebpack.lib.webpack.isLocal ? "development" : "production",
  // mode: "development",
  target: "node",
  node: {
    __dirname: false,
  },
  stats: {
    warnings: false
  },
  performance: {
    hints: false
  },
  // optimization: {
  //   minimize: false
  // },
  externals: [nodeExternals()],
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/),
    IncludeFolderPlugin()
  ],
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: __dirname,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
};