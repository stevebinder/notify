const CopyPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';
const src = `${__dirname}/src`;

module.exports = {
  devServer: {
    hot: false,
    inline: false,
  },
  devtool: env === 'production'
    ? 'none'
    : 'cheap-module-source-map',
  entry: {
    background: `${src}/background/index.js`,
    popup: `${src}/popup/index.js`,
  },
  mode: env,
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
      `${src}/icon.png`,
      `${src}/popup.html`,
      `${src}/manifest.json`,
    ]),
  ],
  resolve: {
    alias: {
      src: src,
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
      src,
      'node_modules'
    ],
  },
};