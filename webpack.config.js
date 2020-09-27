/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// handle js files
const javascript = {
  test: /\.(js)$/,
  use: [
    {
      loader: 'babel-loader',
      options: { presets: ['env'] },
    },
  ],
};

// handle sass/css imports
const styles = {
  test: /\.s[ac]ss$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
};

const config = {
  entry: {
    app: './public/javascript/funding-app.js',
  },
  // devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public', 'dist'),
  },
  module: {
    rules: [javascript, styles],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};
// fix some webpack issues
process.noDeprecation = true;

module.exports = config;
