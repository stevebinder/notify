const CopyPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
  devtool: process.env.NODE_ENV === 'development'
    ? 'cheap-module-source-map'
    : 'none',
  entry: {
    background: `${__dirname}/src/pages/background/index.js`,
    popup: `${__dirname}/src/pages/popup/index.js`,
  },
  mode: process.env.NODE_ENV === 'development'
    ? 'development'
    : 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.(gif|jpeg|jpg|png|svg|ttf|webp|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash].[ext]',
          },
        },
      }
    ],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
  },
  plugins: [
    new CopyPlugin([
      `${__dirname}/src/icon.png`,
      `${__dirname}/src/popup.html`,
      `${__dirname}/src/manifest.json`,
    ]),
  ],
  resolve: {
    alias: {
      src: `${__dirname}/src`,
    },
    extensions: [
      '.css',
      '.gif',
      '.js',
      '.jpeg',
      '.jpg',
      '.json',
      '.png',
      '.svg',
    ],
    modules: [
      `${__dirname}/src`,
      'node_modules',
    ],
  },
};