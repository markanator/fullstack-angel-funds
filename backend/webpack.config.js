/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

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
  mode: 'development',
  entry: {
    app: './public/javascript/funding-app.js',
  },
  // devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public', 'dist'),
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [
      javascript,
      styles,
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader?pretty&exports=false'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};
// fix some webpack issues
process.noDeprecation = true;

module.exports = config;
