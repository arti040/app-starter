'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');

exports.babelLoader = {
  test: /\.js$/,
  loaders: ['babel'],
  exclude: /node_modules/
};

exports.sassLoader = {
  test: /\.sass$/,
  loader: 'style!css!sass'
};

exports.jqueryLoader = {
  test: /jquery\.js$/,
  exclude: /node_modules/,
  loaders: ['expose?jQuery', 'expose?$'],
};

exports.cssLoader = function (ENV) {
  let cssLoader = {
    test: /\.css$/,
    loader: ENV === 'test' ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
  };
  return cssLoader;
};
