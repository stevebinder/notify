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
  entry: [
    `${src}/index.js`,
  ],
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
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  plugins: [
    new CopyPlugin([
      `${src}/icon.png`,
      `${src}/index.html`,
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